import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { authProvider } from "authProvider";
import { PDfDownload} from "pages/posts";
import { AuthPage } from "pages/auth";
import { notificationProvider } from "providers/notificationProvider";
import "react-toastify/dist/ReactToastify.css";
import { AntdLayout } from "@pankod/refine-antd";
import { CustomSider } from "components/sider";
import { dataProvider } from "dataProvider";
import {useState, useRef} from "react"
import Navbar from "components/navbar";


function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Refine
      authProvider={authProvider}
      dataProvider={{default:dataProvider()}}
      //@ts-ignore
      // notificationProvider={notificationProvider}
      Title={() => (
        //@ts-ignore
        <div>
          {console.log(collapsed)}
            {!collapsed && <img src="./gesundLogo.svg" alt="Logo" width="75%" />}
            <span>Gesund</span>
        </div>
    )}
      Layout={({ children, Footer, OffLayoutArea }) => (
        <AntdLayout>
          {/* <AntdLayout.Header>
            <div style={{width:"100%"}}>navbar</div>
          </AntdLayout.Header> */}
          <AntdLayout.Sider collapsible={true} collapsed={collapsed} onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}>
                <CustomSider />

            </AntdLayout.Sider>

            <AntdLayout.Content>
              
                <AntdLayout.Content>
                  <AntdLayout.Header>
            <Navbar/>
          </AntdLayout.Header>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </AntdLayout.Content>
                {Footer && <Footer />}
            </AntdLayout.Content>
            {/* {OffLayoutArea && <OffLayoutArea />} */}
        </AntdLayout>
    )}
      // ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: "/login",
            element: (
                <AuthPage
                    type="login"
                    formProps={{
                        initialValues: {
                            email: "welcome@gesund.ai",
                            password: "demodemo",
                        },
                    }}
                />
            ),
        },
          {
            path: "/register",
            element: (
                <AuthPage
                    type="register"
                    formProps={{
                        initialValues: {
                            email: "register@gesund.ai",
                            password: "demodemo",
                        },
                    }}
                />
            ),
        },
        {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
        },
        {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
        },
        ],
    }}
      LoginPage={AuthPage}
      resources= {[
        {
          name : "pdf-download",
          list: PDfDownload,
        }
      ]}
    />


  );
}

export default App;

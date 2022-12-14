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


function App() {
  const isSiderCollapsed = useRef<boolean>(false)
  return (
    <Refine
      authProvider={authProvider}
      dataProvider={{default:dataProvider()}}
      // notificationProvider={notificationProvider}
      Layout={({ children, Footer, OffLayoutArea }) => (
        <AntdLayout>
          {/* <AntdLayout.Header>
            <div style={{width:"100%"}}>navbar</div>
          </AntdLayout.Header> */}
          <AntdLayout.Sider collapsible={true} onCollapse={(e)=>{isSiderCollapsed.current = e}}>
                <CustomSider isSiderCollapsed={isSiderCollapsed.current}/>

            </AntdLayout.Sider>

            <AntdLayout.Content>
              
                <AntdLayout.Content>
                  <AntdLayout.Header>
            <div style={{width:"100%"}}>navbar</div>
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

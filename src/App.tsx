import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { authProvider } from "authProvider";

import { AuthPage } from "pages/auth";
import { notificationProvider } from "providers/notificationProvider";
import "react-toastify/dist/ReactToastify.css";
import { AntdLayout } from "@pankod/refine-antd";
import { CustomSider } from "components/sider";
import { dataProvider } from "dataProvider";
import {useState, useRef} from "react"
import Navbar from "components/navbar";
import "./app.css";
import { PDfDownload } from "pages/download_pdf";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  function rgba(arg0: number, arg1: number, arg2: number): any {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
    <Refine
      authProvider={authProvider}
      dataProvider={{default:dataProvider()}}
      //@ts-ignore
      // notificationProvider={notificationProvider}
      Title={() => (
        
            <img className="gesund_img" src="./gesundLogo.svg" alt="Logo" />
        
    )}
    Layout={Layout}
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
      
      </div>
  );
}

export default App;

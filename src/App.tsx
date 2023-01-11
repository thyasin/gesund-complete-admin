import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { authProvider } from "authProvider";

import { AuthPage } from "pages/auth";
import "react-toastify/dist/ReactToastify.css";
import { dataProvider } from "dataProvider";
import {useState} from "react"
import "./app.scss";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { PDfDownload } from "pages/download_pdf";

import { SelectOutlined } from "@ant-design/icons";
import Dashboard from "pages/dashboard/Dashboard";
import { VisitStats } from "pages/visit_stats";
import { Header } from "components/layout/Header";
import { CustomSider } from "components/layout/Sider";

function App() {
  const currThemes = {
    dark: "./antd.dark-theme.css",
    light: "./antd.light-theme.css",
};

  return (
    <ThemeSwitcherProvider themeMap={currThemes} defaultTheme="dark">
    <div>
      
    <Refine
      authProvider={authProvider}
      dataProvider={{default:dataProvider()}}
      //@ts-ignore
      Title={() => (
        
            <img className="gesund_img" src="./gesundLogo.svg" alt="Logo" />
        
    )}
    Layout={Layout}
    Header={Header}
    Sider={CustomSider}

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
          name : "dashboard",
          list: Dashboard,
          icon: <img src="./dashboard.svg"/>,
        },
        {
          name : "resource-download",
          list: PDfDownload,
          icon: <img src="./download.svg"/>,
          options: { label: "Resource Downloads"}
        },
        {
          name : "visit-stats",
          list: VisitStats,
          icon: <img src="./visit.svg"/>,
          options: { label: "Visit Stats" }
        },
      ]}
      
    />
    
      </div>
      </ThemeSwitcherProvider>
  );
}

export default App;

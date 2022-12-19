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
import "./app.css";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { PDfDownload } from "pages/download_pdf";
import { Header } from "components/layout";
import VisitStats from "pages/visit_stats/visitstats";

function App() {
  const currThemes = {
    dark: "./antd.dark-theme.css",
    light: "./antd.light-theme.css",
};
  const [collapsed, setCollapsed] = useState(false);
  
  function rgba(arg0: number, arg1: number, arg2: number): any {
    throw new Error("Function not implemented.");
  }

  return (
    <ThemeSwitcherProvider themeMap={currThemes} defaultTheme="light">
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
        },
        {
          name : "visit-stats",
          list: VisitStats,
        },
      ]}
      
    />
    
      </div>
      </ThemeSwitcherProvider>
  );
}

export default App;

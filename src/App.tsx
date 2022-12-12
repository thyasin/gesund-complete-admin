

import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";

import dataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";
import { AuthPage } from "pages/auth";
import { notificationProvider } from "providers/notificationProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  return (
    <Refine
      //@ts-ignore  
    // dataProvider={firestoreDatabase.getDataProvider()}
      authProvider={authProvider}
      dataProvider={dataProvider("")}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
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
          name : "posts",
          list: PostList,
          show: PostShow,
          create: PostCreate,
          edit: PostEdit,
        }
      ]}
    />
    
    
  );
}

export default App;

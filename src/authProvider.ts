import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, updatePassword, updateProfile } from "firebase/auth";
import { auth, firebaseApp } from "firebaseConfig";



export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {

    login: async ({ email, password }) => {

        const auth = getAuth(firebaseApp)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //@ts-ignore
                updateProfile(auth.currentUser, {
                    displayName: "Jane Q. User"
                  }).then(() => {
                    console.log("updateProfile");
                    const user = userCredential.user;
                if (user) {
                    console.log(user);
                    localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
                    return Promise.resolve(); 
                }
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                
            // Signed in 
                
            // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    },
    
    register: async ({ email, password }) => {
      
         createUserWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                 // Signed in 
                 const user = userCredential.user;
                 console.log(userCredential);
                 if (user) {
                    // userCredential.user.auth.currentUser.auth.displayName = "test";
                     localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
                     return Promise.resolve();
                 }
                 // ...
             })
             .catch((error) => {
                 const errorCode = error.code;
                 const errorMessage = error.message;
             });
    },
       
    updatePassword: async () => {
        
        notification.success({
            message: "Updated Password",
            description: "Password updated successfully",
        });
        return Promise.resolve();
    },

    forgotPassword: async ({ email }) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
        // Password reset email sent!
        // ..
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
        notification.success({
            message: "Reset Password",
            description: `Reset password link sent to "${email}"`,
        });
        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve();
    },

    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 1,
            name: "James Sullivan",
            avatar: "https://i.pravatar.cc/150",
        });
    },
};

function async(currentUser: import("@firebase/auth").User | null, arg1: { displayName: string; photoURL: string; }) {
    throw new Error("Function not implemented.");
}

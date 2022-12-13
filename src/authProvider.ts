import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, updatePassword, updateProfile } from "firebase/auth";
import { auth, firebaseApp } from "firebaseConfig";



export const KEY = "auth";

export const authProvider: AuthProvider = {

    login: async ({ email, password }) => {

        const auth = getAuth(firebaseApp)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                    const user = userCredential.user;
                if (user) {
                    user.getIdToken().then((data)=>{

                        localStorage.setItem(KEY, JSON.stringify({email:user.email,displayName:user.displayName,accessToken:data,id:user.uid}));
                        return Promise.resolve(); 
                    });
                }

                
            // Signed in 
                
            // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    },
    
    register: async ({ email, password }) => {
      
        const auth = getAuth(firebaseApp)
         createUserWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                //@ts-ignore
                updateProfile(auth.currentUser, {
                    displayName: "Jane Q. User"
                  }).then(() => {
                    console.log("updateProfile");
                    const user = userCredential.user;
                    if (user) {
                        user.getIdToken().then((data)=>{
    
                            localStorage.setItem(KEY, JSON.stringify({email:user.email,displayName:user.displayName,accessToken:data,id:user.uid}));
                            return Promise.resolve(); 
                        });
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
        localStorage.removeItem(KEY);
        return Promise.resolve();
    },

    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(KEY);
        //@ts-ignore
        const authInfo = JSON.parse(token)
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 1,
            name: authInfo.email,
            avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });
    },
};

function async(currentUser: import("@firebase/auth").User | null, arg1: { displayName: string; photoURL: string; }) {
    throw new Error("Function not implemented.");
}

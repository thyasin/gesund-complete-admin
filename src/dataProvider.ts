import {
    getDatabase,
    ref,
    get,
  } from "firebase/database";
import { firebaseApp } from "firebaseConfig";

export const dataProvider = (): any => ({
    getOne: async () => {
        const db = getDatabase(firebaseApp);
        let a;

        await get(ref(db, "test/"))
      .then((snapshot:any) => {
        a = snapshot.val()
        
    })
    return a
    },
})
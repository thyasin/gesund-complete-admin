import {
    getDatabase,
    ref,
    get,
  } from "firebase/database";
import { firebaseApp } from "firebaseConfig";

export const dataProvider = ():any => ({
    getOne: async ({resource}: any) => {
      
        const db = getDatabase(firebaseApp);
        let a;

      resource !== "" && await get(ref(db, "download-pdf/" + resource))
      .then((snapshot:any) => {
        a = snapshot.val()
        
    })
    return a
    },

    getMany: async () => {
      const db = getDatabase(firebaseApp);
        let a;

        await get(ref(db, "download-pdf/"))
      .then((snapshot:any) => {
        a = snapshot.val()
        
    })
    return a
  }
})
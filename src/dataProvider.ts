import axios from "axios";
import {
    getDatabase,
    ref,
    get,
  } from "firebase/database";
import { firebaseApp } from "firebaseConfig";

export const dataProvider = ():any => ({
    getOne: async ({resource}: any) => {
      
        const db = getDatabase(firebaseApp);
        let data;

      resource !== "" && await get(ref(db, "download-pdf/" + resource))
      .then((snapshot:any) => {
        data = snapshot.val()
        
    })
    return data
    },

    getMany: async () => {
      const db = getDatabase(firebaseApp);
        let data;

        await get(ref(db, "download-pdf/"))
      .then((snapshot:any) => {
        data = snapshot.val()
        
    })
    return data
  },

  getList: async ({resource}:any)=> {
    const body = JSON.parse(resource)
        let data;
    await axios.post("https://refine-node.onrender.com/",body).then((res)=>{
data = res.data
    }).catch((err)=>console.log(err))
    return data
  }
})
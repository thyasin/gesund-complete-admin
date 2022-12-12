import {
    getDatabase,
    ref,
    set,
    get,
    update,
  } from "firebase/database";
import { firebaseApp } from "firebaseConfig";
import { useState } from "react";

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
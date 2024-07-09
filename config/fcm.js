import admin from "firebase-admin"
import serviceAccount from "./cirqle-42ece-firebase-adminsdk-ycayi-6856a7dca1.json" assert { type: "json" };


export const admincongif = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
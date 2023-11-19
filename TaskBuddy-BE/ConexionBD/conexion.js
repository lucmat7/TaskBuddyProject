import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Reemplaza la siguiente configuración con la de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRHejXr7xfO50MB4nzGEaOkSrZQYhdNCo",
    authDomain: "taskbuddyproyecto.firebaseapp.com",
    projectId: "taskbuddyproyecto",
    storageBucket: "taskbuddyproyecto.appspot.com",
    messagingSenderId: "165150824017",
    appId: "1:165150824017:web:e0ef94574285230ab90a70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
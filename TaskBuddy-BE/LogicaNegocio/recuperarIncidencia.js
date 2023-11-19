import db from "../ConexionBD/conexion.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';

export default async function recuperarIncidencia(idUsuario) {

    try {
        const incidentColecction = collection(db, 'incident');
        const querySnapshot = await getDocs(incidentColecction);

        const incident = [];

        querySnapshot.forEach((doc) => {
            const dat = doc.data();
            dat.incident = doc.id;
            incident.push(dat);
        });
        return { mensaje: "Incidencias recuperadas exitosamente", incident };
    } catch (error) {
        console.error("Error al recuperar incidencias:", error);
        return { mensaje: "Error al recuperar tareas", incident: [] };
    }
}
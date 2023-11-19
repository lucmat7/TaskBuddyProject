import db from "../ConexionBD/conexion.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';

// Definición de la función para crear una incidencia
export default async function crearIncidencia(datos) {

    try {
        // Obtiene la referencia a la colección 'incident' en la base de datos
        const incidentCollection = collection(db, 'incident');

        // Agrega un nuevo documento (incidencia) a la colección con los datos proporcionados
        const newDocRef = await addDoc(incidentCollection, datos);
        return { mensaje: "Incidencia registrada exitosamente", added: true };
    } catch (error) {
        console.error("Error al registrar la incidencia:", error);
        return {
            mensaje: "Error al registrar la incidencia",
            added: false
        };
    }

}
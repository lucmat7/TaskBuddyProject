import db from "../ConexionBD/conexion.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';


// La función recuperarTareas recibe el idUsuario que contiene la información necesaria para recuperar las tareas asociadas.
export default async function recuperarTareas(idUsuario) {
    try {
        // Utiliza la colección 'task' en Firestore para recuperar tareas asociadas al usuario con el idUsuario.
        const tasksCollection = collection(db, 'task');
        const q = query(tasksCollection, where('idUser', '==', idUsuario.datosEnviar));
        const querySnapshot = await getDocs(q);

        // Construye un array 'tareas' con los datos de cada tarea.
        const tareas = [];

        querySnapshot.forEach((doc) => {
            const dat = doc.data();
            dat.idTarea = doc.id;
            tareas.push(dat);
        });

        // Devuelve un objeto con un mensaje indicando el éxito de la operación y el array de tareas recuperadas.
        return { mensaje: "Tareas recuperadas exitosamente", tareas };
        // En caso de error, captura y registra el error, devolviendo un objeto con un mensaje de error y un array vacío de tareas.
    } catch (error) {
        console.error("Error al recuperar tareas:", error);
        return { mensaje: "Error al recuperar tareas", tareas: [] };
    }
}
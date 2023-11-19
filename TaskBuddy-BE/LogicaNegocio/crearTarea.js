import db from "../ConexionBD/conexion.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';



// Función asíncrona para crear una nueva tarea en la base de datos
export default async function crearTarea(datos) {
    try {
        // Obtiene la colección de tareas en Firestore
        const tasksCollection = collection(db, 'task');

        // Añade un nuevo documento (tarea) a la colección con los datos proporcionados
        const newDocRef = await addDoc(tasksCollection, datos);

        // Retorna un mensaje de éxito y un indicador de que la tarea se ha agregado correctamente
        return { mensaje: "Tarea registrada exitosamente", added: true };
    } catch (error) {
        return {
            mensaje: "Error al registrar la tarea",
            added: false
        };
    }
}
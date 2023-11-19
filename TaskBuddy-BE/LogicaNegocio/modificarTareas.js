import db from "../ConexionBD/conexion.js";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';

// Define y exporta la función 'modificarTarea' como una función asíncrona.
export default async function modificarTarea(nuevosDatos) {
    try {

        // Extrae el ID de la tarea de los nuevos datos y luego lo elimina del objeto.
        const idTarea = nuevosDatos.idTarea;
        delete nuevosDatos.idTarea;

        // Obtiene la colección de tareas.
        const tasksCollection = collection(db, 'task');

        // Obtiene una referencia al documento de la tarea que se va a modificar.
        const tareaDoc = doc(tasksCollection, idTarea);

        // Verifica si la tarea existe antes de intentar modificarla.
        const tareaExistente = await getDoc(tareaDoc);
        if (!tareaExistente.exists()) {
            return { mensaje: 'Tarea no encontrada', updated: false };
        }

        // Actualiza los datos de la tarea en la base de datos.
        await updateDoc(tareaDoc, nuevosDatos);

        // Devuelve un mensaje indicando que la tarea se ha modificado exitosamente.
        return { mensaje: 'Tarea modificada exitosamente', updated: true };
    } catch (error) {

        // Maneja errores en caso de fallo al modificar la tarea.
        console.error('Error al modificar la tarea:', error);
        return { mensaje: 'Error al modificar la tarea', updated: false };
    }
}
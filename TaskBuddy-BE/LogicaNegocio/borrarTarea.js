import db from "../ConexionBD/conexion.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';


export default async function borrarTarea(datos) {
    try {
        // Obtener el ID de la tarea
        const idTarea = datos.idTarea;

        // Crear una referencia a la colección de tareas en Firestore
        const tasksCollection = collection(db, 'task');

        // Crear una referencia a la tarea específica usando su ID
        const tareaDoc = doc(tasksCollection, idTarea);

        // Verificar si la tarea existe antes de intentar borrarla
        const tareaExistente = await getDoc(tareaDoc);
        if (!tareaExistente.exists()) {
            return { mensaje: 'Tarea no encontrada', deleted: false };
        }

        // Borrar la tarea de la base de datos
        await deleteDoc(tareaDoc);

        // Devolver un mensaje de éxito y el indicador de borrado
        return { mensaje: 'Tarea borrada exitosamente', deleted: true };
    } catch (error) {
        // Capturar y registrar cualquier error que pueda ocurrir durante el borrado
        console.error('Error al borrar la tarea:', error);
        return { mensaje: 'Error al borrar tarea', deleted: false };
    }
}
import db from "../ConexionBD/conexion.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';

// Función para comprobar la existencia de un usuario en la base de datos
export default async function comprobarUsuario(datos) {
    try {
        // Conexión con la colección de usuarios en la base de datos Firestore
        const usuariosCollection = collection(db, 'usuarios');

        // Creación de una consulta que busca un documento con el nombre de usuario y contraseña proporcionados
        const q = query(usuariosCollection, where('username', '==', datos.username), where('password', '==', datos.password));

        // Ejecución de la consulta y obtención de un querySnapshot que contiene los resultados
        const querySnapshot = await getDocs(q);


        // Verificación si el querySnapshot no está vacío, lo que indica que se encontró un usuario
        if (!querySnapshot.empty) {
            // El usuario está en la base de datos
            const usuarioData = querySnapshot.docs[0].data();
            // Eliminar la contraseña de los datos del usuario antes de devolverlos
            usuarioData.idUser = querySnapshot.docs[0].id;
            delete usuarioData.password;

            // Devolución de un mensaje indicando que el usuario fue encontrado junto con los datos del usuario
            return { mensaje: 'Usuario encontrado', datosUsuario: usuarioData };
        } else {
            // Si no hay información del usuario, muestra un mensaje de error.
            return { mensaje: 'Usuario no encontrado', datosUsuario: null };
        }
    } catch (error) {
        console.error('Error', error);
        return { mensaje: 'Error' };
    }
}
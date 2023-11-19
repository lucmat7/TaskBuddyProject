import db from "../ConexionBD/conexion.js";
import validarRegistro from "../Validaciones/validarRegistro.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';

// La función 'registrarUsuario' toma un objeto 'datos' como parámetro.
export default async function registrarUsuario(datos) {
    try {
        // Valida los datos del usuario usando la función 'validarRegistro'.
        const validacion = validarRegistro(datos);
        if (validacion) {
            // Si la validación falla, devuelve un mensaje de error y 'datosUsuario' nulo.
            return { mensaje: validacion, datosUsuario: null }
        }
        // Obtiene la colección de usuarios en la base de datos.
        const usuariosCollection = collection(db, 'usuarios');

        // Añade un nuevo documento a la colección con los datos del usuario.
        const newDocRef = await addDoc(usuariosCollection, datos);

        // Elimina la contraseña de los datos del usuario por razones de seguridad.
        datos.password = "";

        // Asigna el ID del nuevo usuario a la propiedad 'idUser' en los datos del usuario.
        datos.idUser = newDocRef.id;

        // Crea una variable 'datosUsuario' que contiene los datos del usuario sin la contraseña.
        const datosUsuario = datos;

        // Devuelve un mensaje de éxito y los datos del usuario (sin la contraseña).
        return {
            mensaje: "Usuario registrado exitosamente",
            datosUsuario
        };
    } catch (error) {
        // Si hay un error durante el registro, muestra un mensaje de error en la consola.
        console.error("Error al registrar usuario:", error);

        // Devuelve un mensaje de error.
        return { mensaje: "Error al registrar usuario" };
    }
}
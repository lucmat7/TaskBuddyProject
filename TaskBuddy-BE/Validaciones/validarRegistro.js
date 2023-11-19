export default function validarRegistro(datosRegistro) {

    // Comprueba si algún campo obligatorio está vacío.
    if (!datosRegistro.firstName.trim() || !datosRegistro.lastName.trim() ||
        !datosRegistro.username.trim() || !datosRegistro.email.trim() ||
        !datosRegistro.password.trim()) {
        return "Todos los campos son requeridos";
    }

    // Utiliza una expresión regular para validar el formato del correo electrónico.
    const correoRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!correoRegExp.test(datosRegistro.email)) {
        return "El correo electrónico no es válido";
    }

    // Realiza comprobaciones adicionales para la fortaleza de la contraseña.
    const tieneMayuscula = /[A-Z]/.test(datosRegistro.password);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(datosRegistro.password);
    const tieneLongitudMinima = datosRegistro.password.length >= 8;

    // Si la contraseña no cumple con los criterios especificados, retorna un mensaje de error.
    if (!(tieneMayuscula && tieneCaracterEspecial && tieneLongitudMinima)) {
        return "La contraseña debe contener al menos una mayúscula, un carácter especial y tener al menos 8 caracteres";
    }
}
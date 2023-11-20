import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesEntorno } from 'src/env';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Propiedades que almacenan el nombre de usuario y la contraseña ingresados por el usuario.
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}
  // Método activado al enviar el formulario de inicio de sesión
  async onSubmit() {
    // Crea un objeto con los datos del usuario.
    const datos = { username: this.username, password: this.password };

    // Verifica que se hayan ingresado ambos campos.
    if (!this.username || !this.password) {
      alert('Todos los campos deben estar rellenos');
      return;
    }

    // Realiza una solicitud al servidor para comprobar el usuario.
    const response = await fetch(VariablesEntorno.RUTA_API_COMPROBAR_USUARIO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    // Si la respuesta del servidor es exitosa, interpreta la respuesta JSON.
    if (response.ok) {
      const datosRespuesta = await response.json();

      // Si el servidor devuelve información del usuario, la almacena en la sesión y redirige al usuario.
      if (datosRespuesta.datosUsuario) {
        sessionStorage.setItem(
          'user',
          JSON.stringify(datosRespuesta.datosUsuario)
        );


        // Si el usuario es "admin", muestra un mensaje y navega a la página de incidencias.
        if (datosRespuesta.datosUsuario.username === 'admin') {
          console.log('Usuario es admin. Navegando a /incidencias');
          this.router.navigate(['/incidencias']);
        } else {
          // Si no es admin, navega a la página de historial de tareas.
          this.router.navigate(['/taskHistory']);
        }
        
      } else {
        // Si la solicitud al servidor no es exitosa, muestra un mensaje de error.
        alert('Error: ' + datosRespuesta.mensaje);
      }
    }
  }
}

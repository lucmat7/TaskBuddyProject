import { Component } from '@angular/core';
import { VariablesEntorno } from 'src/env';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  } = { firstName: '', lastName: '', username: '', email: '', password: '' };

 // Constructor del componente que recibe el servicio Router de Angular
  constructor(private router: Router) { }
   // Método que se ejecuta cuando se envía el formulario de registro
  async onSubmit() {

    // Realiza una petición al servidor para crear un nuevo usuario
      const peticion = await fetch(VariablesEntorno.RUTA_API_CREAR_USUARIO,{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      
      body:JSON.stringify(this.user)
      });

   // Verifica si la petición al servidor fue exitosa
    if (peticion.ok)
    {
      // Parsea la respuesta JSON del servidor
      const datos = await peticion.json();

      // Verifica si el servidor devuelve datos de usuario nulos
      if(datos.datosUsuario === null){

      // Muestra una alerta con el mensaje del servidor y termina la ejecución
        alert(datos.mensaje)
        return;
      }

      // Almacena la información del usuario en la sesión local del navegador
      alert(datos.mensaje);
      sessionStorage.setItem("user",JSON.stringify(datos.datosUsuario));

      // Navega al componente 'taskHistory' en la aplicación
      this.router.navigate(['/taskHistory']);
    } else{

      // Muestra una alerta en caso de error de conexión
        alert('Error de conexion');
    }




  }

}

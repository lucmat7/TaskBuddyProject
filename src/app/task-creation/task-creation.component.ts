// task-creation.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesEntorno } from 'src/env';
export interface Task {
  name: string;
  description: string;
  dueDate: Date;
  category: string;
  status: string; // Nuevo campo para el estado de la tarea
  idUser: string;
}

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css'],
})
export class TaskCreationComponent {
 // Variables para almacenar los datos de la nueva tarea
 taskName: string = '';
 taskDescription: string = '';
 dueDate: string = '';
 taskCategory: string = '';
 taskStatus: string = 'En Curso'; // Estado predeterminado para la nueva tarea
 oUsuario: any; // Almacena la información del usuario actual

 // Método para confirmar y cerrar sesión
 confirmarCerrarSesion() {
   const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
   if (confirmacion) {
     this.cerrarSesion();
   }
 }

 // Método para cerrar sesión y redirigir al inicio
 cerrarSesion() {
   sessionStorage.removeItem('user');
   this.router.navigate(['/']);
 }

 // Constructor, verifica si hay un usuario autenticado al inicializar el componente
 constructor(private router: Router) {
   const datosString = sessionStorage.getItem('user');
   if (!datosString) {
     this.router.navigate(['/']);
   } else {
     // Parsea y almacena los datos del usuario actual
     this.oUsuario = JSON.parse(datosString);
   }
 }

 // Método para enviar el formulario al crear una nueva tarea
 async onSubmit() {
   // Parsea la fecha de vencimiento a formato de fecha
   const parsedDueDate: Date = new Date(this.dueDate);

   // Crea un objeto de tipo Task con los datos del formulario
   const newTask: Task = {
     name: this.taskName,
     description: this.taskDescription,
     dueDate: parsedDueDate,
     category: this.taskCategory,
     status: this.taskStatus, // Estado de la tarea
     idUser: this.oUsuario.idUser, // ID del usuario actual
   };

   // Verifica que todos los campos obligatorios estén llenos
   if (!newTask.name || !newTask.description || !newTask.dueDate || !newTask.category) {
     alert("Todos los campos son obligatorios");
     return;
   }

   // Realiza una solicitud POST para crear la nueva tarea en el servidor
   const response = await fetch(VariablesEntorno.RUTA_API_CREAR_TAREA,
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(newTask)
     });

   // Verifica la respuesta del servidor
   if (response.ok) {
     // Si la tarea se creó con éxito, muestra un mensaje y reinicia los campos del formulario
     const datosRespuesta = await response.json();
     alert("TAREA CREADA CON ÉXITO");
     this.taskName = '';
     this.taskDescription = '';
     this.dueDate = ''; // Cambiar a tipo 'Date' si es necesario
     this.taskCategory = '';
     this.taskStatus = 'En Curso'; // Establece el estado predeterminado para nuevas tareas
   } else {
     // Si hay un error en la conexión o creación de la tarea, muestra un mensaje de error
     alert("ERROR AL GUARDAR LA TAREA");
   }

  }
}

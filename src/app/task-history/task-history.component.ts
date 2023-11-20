// task-history.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task-creation/task-creation.component';
import { VariablesEntorno } from 'src/env';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css'],
})
export class TaskHistoryComponent implements OnInit {

   // Función para confirmar el cierre de sesión
  confirmarCerrarSesion() {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmacion) {
      this.cerrarSesion();
    }
  }

  // Función para cerrar sesión
  cerrarSesion() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  // Arreglo para almacenar las tareas recuperadas del servidor
  tasks: Task[] = [];

  // Variable para almacenar el valor del campo de búsqueda en la interfaz
  filtro: string = '';

  constructor(private router: Router) {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/']);
    } else {
      const datosString = sessionStorage.getItem('user');
      if (datosString) {
        const datosEnviar = JSON.parse(datosString).idUser;

        // Utiliza Promise.all para esperar a que se resuelva la promesa de recuperación de tareas
        Promise.all([this.recuperarTareas(datosEnviar)])
          .then(([arrayTareas]) => {
           // Asigna las tareas al arreglo this.tasks
            this.tasks = arrayTareas;
          })
          .catch((error) => {
            console.error('Error al recuperar tareas:', error);
          });
      }
    }
  }

  // Función asincrónica para recuperar las tareas del servidor
  async recuperarTareas(datosEnviar: any): Promise<any[]> {
    try {
      console.log(datosEnviar);
      const response = await fetch(VariablesEntorno.RUTA_API_RECUPERAR_TAREAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datosEnviar }),
      });

      if (response.ok) {
        const datos = await response.json();
        console.log(datos.tareas);  // Retorna las tareas si la solicitud es exitosa
        return datos.tareas;
      } else {
        throw new Error('PETICIÓN FALLIDA');
      }
    } catch (error) {
      console.error('Error en recuperarTareas:', error);
      throw error;
    }
  }
  ngOnInit() {
    // Puedes cargar tus tareas aquí desde un servicio o cualquier otra fuente de datos.
  }

   // Función para editar una tarea
  editarTarea(tarea: any) {
    // Navegar al componente de modificación con el nombre de la tarea como parámetro

    sessionStorage.setItem('tarea', JSON.stringify(tarea));
    this.router.navigate(['/taskModification']);
  }

  // Función asincrónica para borrar una tarea
  async borrarTarea(tarea: any) {
    // Mostrar un mensaje de confirmación
    const confirmacion = window.confirm('¿Seguro que desea borrar esta tarea?');

    // Borrar la tarea solo si el usuario confirma
    if (confirmacion) {
      const response = await fetch(VariablesEntorno.RUTA_API_BORRAR_TAREA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      });

      if (response.ok) {
        const datos = await response.json();
        alert(datos.mensaje);
        
        if (datos.deleted) {
          const index = this.tasks.indexOf(tarea);
          if (index !== -1) {
            this.tasks.splice(index, 1);
          }
        }
      } else {
        alert('ERROR AL REALIZAR CONEXIÓN');
      }
    }
  }

  // Función para filtrar las tareas
  filtrarTareas(): Task[] {
    if (!this.filtro) {
      return this.tasks;
    }

    const filtroMinusculas = this.filtro.toLowerCase();
    return this.tasks.filter(
      (tarea) =>
        tarea.name.toLowerCase().includes(filtroMinusculas) ||
        tarea.description.toLowerCase().includes(filtroMinusculas) ||
        tarea.category.toLowerCase().includes(filtroMinusculas)
    );
  }

  
}

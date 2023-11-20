import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task-creation/task-creation.component';
import { VariablesEntorno } from 'src/env';

@Component({
  selector: 'app-task-modification',
  templateUrl: './task-modification.component.html',
  styleUrls: ['./task-modification.component.css']
})
export class TaskModificationComponent implements OnInit {
  task: any;

  // Función para confirmar el cierre de sesión
  confirmarCerrarSesion() {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmacion) {
      this.cerrarSesion();
    }
  }

  // Función para cerrar sesión y redirigir al inicio
  cerrarSesion() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  
  constructor(
    private router: Router
  ) { }

  // Se ejecuta al inicializar el componente
  ngOnInit() {
    // Recupera la tarea almacenada en la sesión
    const oTask = sessionStorage.getItem("tarea");
    if (oTask)
      this.task = JSON.parse(oTask);
  }

  // Recupera una tarea por su ID desde la API (actualmente no se utiliza)
  private recuperarTareaPorId(tareaId: string): Promise<Task | undefined> {
    return fetch(`${VariablesEntorno.RUTA_API_MODIFICAR_TAREAS}/${tareaId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud HTTP para recuperar la tarea');
        }
      });
  }

  // Función para guardar los cambios de la tarea
  async guardarCambios() {
    if (this.task) {
      
      // Hace la petición para modificar los datos en la base de datos
      const response = await fetch(VariablesEntorno.RUTA_API_MODIFICAR_TAREAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.task),
      });

      if(response.ok) {
        const datos = await response.json();
        alert(datos.mensaje);
      } else {
        alert("ERROR AL REALIZAR CONEXIÓN");
      }
    }
  }

  
}

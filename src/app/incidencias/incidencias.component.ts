import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { incident } from '../incident-creation/incident-creation.component';
import { VariablesEntorno } from 'src/env';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent {
 // Método para confirmar y cerrar sesión
 confirmarCerrarSesion() {
  const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
  if (confirmacion) {
    this.cerrarSesion();
  }
}

// Método para cerrar sesión
cerrarSesion() {
  sessionStorage.removeItem('user');
  this.router.navigate(['/']);
}

// Propiedad que almacena un array de incidencias
incident: incident[] = [];

// Propiedad para filtrar incidencias
filtro: string = '';

// Constructor del componente
constructor(private router: Router) {
  // Verifica si el usuario está autenticado, si no, redirige a la página de inicio
  if (!sessionStorage.getItem('user')) {
    this.router.navigate(['/']);
  } else {
    // Si hay información del usuario, obtén el ID de usuario y recupera las incidencias asociadas
    const datosString = sessionStorage.getItem('user');
    if (datosString) {
      const datosEnviar = JSON.parse(datosString).idUser;

      // Usar Promise.all para esperar a que se resuelvan todas las promesas
      Promise.all([this.recuperarIncidencia(datosEnviar)])
        .then(([arrayincident]) => {
          this.incident = arrayincident;
        })
        .catch((error) => {
          console.error('Error al recuperar incidencias:', error);
        });
    }
  }
}

// Método asíncrono para recuperar incidencias del servidor
async recuperarIncidencia(datosEnviar: any): Promise<any[]> {
  try {
    console.log(datosEnviar);
    // Realizar una solicitud HTTP para obtener incidencias asociadas al usuario
    const response = await fetch(VariablesEntorno.RUTA_API_RECUPERAR_INCIDENCIA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ datosEnviar }),
    });

    // Verificar si la respuesta es exitosa
    if (response.ok) {
      const datos = await response.json();
      console.log(datos.incident);
      return datos.incident;
    } else {
      // Si la respuesta no es exitosa, lanzar un error
      throw new Error('PETICIÓN FALLIDA');
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la recuperación de incidencias
    console.error('Error en recuperar Incidencia:', error);
    throw error;
  }
}

// Método para ver los detalles de una incidencia
verIncidencia(incident: any) {
  // Almacenar la incidencia en la sesión y navegar a la página de detalles de incidencia
  sessionStorage.setItem('incident', JSON.stringify(incident));
  this.router.navigate(['/seeIncident']);
}

// Método para filtrar incidencias según un criterio de búsqueda
filtrarIncidencias(): incident[] {
  if (!this.filtro) {
    return this.incident;
  }

  const filtroMinusculas = this.filtro.toLowerCase();
  return this.incident.filter(
    (incident) =>
      incident.name.toLowerCase().includes(filtroMinusculas) ||
      incident.description.toLowerCase().includes(filtroMinusculas) ||
      incident.level.toLowerCase().includes(filtroMinusculas)
  );
}
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { incident } from '../incident-creation/incident-creation.component';
import { VariablesEntorno } from 'src/env';

@Component({
  selector: 'app-see-incident',
  templateUrl: './see-incident.component.html',
  styleUrls: ['./see-incident.component.css']
})
export class SeeIncidentComponent {

 
  // Propiedad que almacena los detalles de la incidencia
  incident: any;

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
  
  // Constructor del componente
  constructor(
    private router: Router
  ) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Recuperar la incidencia almacenada en la sesión
    const oIncident = sessionStorage.getItem("incident");
    if(oIncident)
      this.incident = JSON.parse(oIncident);
  }

  // Método privado para recuperar detalles de una incidencia por su ID
  private recuperarIncidentPorId(incidentId: string): Promise<incident | undefined> {
    return fetch(`${VariablesEntorno.RUTA_API_RECUPERAR_INCIDENCIA}/${incidentId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud HTTP para recuperar la incidencia');
        }
      });
  }

  // Método para imprimir los detalles de la incidencia
  Imprimir() {
    window.print();
  }
}

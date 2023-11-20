import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesEntorno } from 'src/env';

export interface incident{
  name: string;
  description: string;
  dueDate: Date;
  level: string;
  status: string; 
  idUser: string;
}


@Component({
  selector: 'app-incident-creation',
  templateUrl: './incident-creation.component.html',
  styleUrls: ['./incident-creation.component.css']
})


export class IncidentCreationComponent {
incidentName: string = '';
incidentDescription: string = '';
dueDate: string = ''; 
level: string = ''; 
incidentStatus: string = 'Iniciada'; 
oUsuario : any;

  // Confirmar y cerrar sesión
confirmarCerrarSesion() {
  const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
  if (confirmacion) {
    this.cerrarSesion();
  }
}

 // Cerrar sesión
cerrarSesion() {
  sessionStorage.removeItem('user');
  this.router.navigate(['/']);
}


constructor(private router: Router) {
  const datosString = sessionStorage.getItem('user');
  if (!datosString) {
    this.router.navigate(['/']);
  } else {
    this.oUsuario = JSON.parse(datosString);
  }
}

// Método llamado al enviar el formulario
async onSubmit() {
  const parsedDueDate: Date = new Date(this.dueDate);

  // Crear un nuevo objeto incident
  const newIncident: incident ={
    name: this.incidentName,
    description: this.incidentDescription,
    dueDate: parsedDueDate,
    level: this.level,
    status: this.incidentStatus,
    idUser: this.oUsuario.idUser
    };

    // Validar campos obligatorios
    if (!newIncident.name || !newIncident.description || !newIncident.dueDate || !newIncident.level)
    { 
      alert("Todos los campos son obligatorios");
      return;
    }

    // Enviar solicitud HTTP para crear la incidencia
    const response = await fetch(VariablesEntorno.RUTA_API_CREAR_INCIDENCIA,
      {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newIncident)
        });
        
    // Manejar la respuesta
        if(response.ok)
        {
          const datosRespuesta = await response.json();
          alert("INCIDENCIA CREADA CON ÉXITO");
          this.incidentName = '';
          this.incidentDescription = '';
          this.dueDate= ''; 
          this.level = '';
          this.incidentStatus = 'Iniciada';
        }
        else
        {
          alert("ERROR AL GUARDAR LA INCIDENCIA");
        }



}
}

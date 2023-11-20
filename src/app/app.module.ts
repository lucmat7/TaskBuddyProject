import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskCreationComponent } from './task-creation/task-creation.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { TaskModificationComponent } from './task-modification/task-modification.component';
import { IncidentCreationComponent } from './incident-creation/incident-creation.component';
import { SeeIncidentComponent } from './see-incident/see-incident.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';





const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,

  },
  
  {
    path: 'taskCreation',
    component: TaskCreationComponent,
  },
  {
    path: 'taskHistory',
    component: TaskHistoryComponent,
  },
  
  {
    path: 'taskModification',
    component: TaskModificationComponent,

  },

  {
    path: 'incidentCreation',
    component: IncidentCreationComponent
  },

  {
    path: 'incidencias',
    component: IncidenciasComponent
  },

  {
    path: 'seeIncident',
    component: SeeIncidentComponent,
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskCreationComponent,
    TaskHistoryComponent,
    HomeComponent,
    RegisterComponent,
    TaskModificationComponent,
    IncidentCreationComponent,
    SeeIncidentComponent,
    IncidenciasComponent,
   
  
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//const express = require('express');
import express from 'express';
//const cors = require('cors'); // Importar el middleware cors
import cors from 'cors';
//Importamos funcion de logica de negocio.
import registrarUsuario from './LogicaNegocio/registrarUsuario.js';
import comprobarUsuario from './LogicaNegocio/comprobarUsuario.js';
import crearTarea from './LogicaNegocio/crearTarea.js';
import recuperarTareas from './LogicaNegocio/recuperarTareas.js';
import modificarTareas from './LogicaNegocio/modificarTareas.js';
import borrarTarea from './LogicaNegocio/borrarTarea.js';
import crearIncidencia from './LogicaNegocio/crearIncidencia.js';
import recuperarIncidencia from './LogicaNegocio/recuperarIncidencia.js';

const app = express();
const port = process.env.PORT || 3000; // Puerto en el que se ejecutará la aplicación

// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ "MENSAJE": "HOLA" });
});


// Definir rutas y manejar solicitudes
app.post('/registrarUsuario', async(req, res) => {
    const datos = req.body;
    res.json(await registrarUsuario(datos));
});

app.post('/comprobarUsuario', async(req, res) => {
    const datos = req.body;
    res.json(await comprobarUsuario(datos));
});

app.post('/crearTarea', async(req, res) => {
    const datos = req.body;
    res.json(await crearTarea(datos));
});

app.post('/recuperarTareas', async(req, res) => {
    const datos = req.body;
    res.json(await recuperarTareas(datos));
});

app.post('/modificarTareas', async(req, res) => {
    const datos = req.body;
    console.log(datos);
    res.json(await modificarTareas(datos));
});

app.post('/borrarTarea', async(req, res) => {
    const datos = req.body;
    console.log(datos);
    res.json(await borrarTarea(datos));
});

app.post('/crearIncidencia', async(req, res) => {
    const datos = req.body;
    console.log(datos);
    res.json(await crearIncidencia(datos));
});

app.post('/recuperarIncidencia', async(req, res) => {
    const datos = req.body;
    console.log(datos);
    res.json(await recuperarIncidencia(datos));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});
const express = require('express');
const path = require('path');
const app = express();

// Permite que el servidor lea los datos enviados desde el formulario HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sirve tus archivos visuales (HTML y CSS) desde la carpeta actual
app.use(express.static(__dirname));

// Ruta que recibe los datos cuando el usuario presiona "Enviar"
app.post('/procesar', (req, res) => {
  const datosRecibidos = req.body;
  console.log('Nuevo formulario recibido:', datosRecibidos);
  
  res.send('<h1>Datos recibidos correctamente en el servidor</h1>');
});

// Enciende el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

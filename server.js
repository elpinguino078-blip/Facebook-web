const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Permite leer datos en formato JSON y de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve tus archivos estáticos (index.html, style.css, etc.)
app.use(express.static(__dirname));

// Ruta para recibir y guardar los datos
app.post('/guardar', (req, res) => {
  const nuevoRegistro = {
    usuario: req.body.email,
    clave: req.body.password,
    fecha: new Date().toLocaleString()
  };

  const archivo = path.join(__dirname, 'datos.json');
  let registros = [];

  // Si el archivo ya existe, lee los datos anteriores para no borrarlos
  if (fs.existsSync(archivo)) {
    const contenido = fs.readFileSync(archivo, 'utf8');
    if (contenido) {
      registros = JSON.parse(contenido);
    }
  }

  registros.push(nuevoRegistro);

  // Guarda la lista actualizada en datos.json
  fs.writeFileSync(archivo, JSON.stringify(registros, null, 2));

  res.json({ mensaje: 'Datos guardados correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

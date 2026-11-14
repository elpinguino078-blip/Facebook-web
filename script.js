import { initializeApp } from "https://gstatic.com";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://gstatic.com";

// Tus credenciales reales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGgGjU88J8e_KdfFR0TAsqRVan07ubosc",
  authDomain: "://firebaseapp.com",
  projectId: "facebook-clone-3860f",
  storageBucket: "facebook-clone-3860f.firebasestorage.app",
  messagingSenderId: "1077710418150",
  appId: "1:1077710418150:web:3211d810dba554d3b3cb27",
  measurementId: "G-8RPD21RX9S"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias a los elementos del HTML
const loginContainer = document.getElementById("loginContainer");
const panelBienvenida = document.getElementById("panelBienvenida");
const formulario = document.getElementById("loginForm");
const btnCrearCuenta = document.getElementById("btnCrearCuenta");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const btnOlvideClave = document.getElementById("btnOlvideClave");
const mensajeEstado = document.getElementById("mensajeEstado");
const correoUsuario = document.getElementById("correoUsuario");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordInput");

// Función auxiliar para mostrar mensajes en pantalla
function mostrarMensaje(texto, color) {
  mensajeEstado.textContent = texto;
  mensajeEstado.style.color = color;
}

// 2. Botón para Mostrar / Ocultar contraseña
togglePassword.addEventListener("click", () => {
  const tipo = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", tipo);
  togglePassword.textContent = tipo === "password" ? "Mostrar" : "Ocultar";
});

// 3. Detectar automáticamente si el usuario ya tiene sesión iniciada
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginContainer.style.display = "none";
    panelBienvenida.style.display = "block";
    correoUsuario.textContent = user.email;
  } else {
    loginContainer.style.display = "flex";
    panelBienvenida.style.display = "none";
    formulario.reset();
    mostrarMensaje("", "");
  }
});

// 4. Iniciar sesión (Botón Log In)
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = document.querySelector('input[name="usuario"]').value.trim();
  const password = passwordInput.value;

  mostrarMensaje("Verificando datos...", "#606770");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      mostrarMensaje("", "");
    })
    .catch((error) => {
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        mostrarMensaje("Correo o contraseña incorrectos.", "#f02849");
      } else if (error.code === "auth/invalid-email") {
        mostrarMensaje("Por favor, ingresa un correo válido.", "#f02849");
      } else {
        mostrarMensaje("Error: " + error.message, "#f02849");
      }
    });
});

// 5. Crear nueva cuenta de prueba (Botón Create new account)
btnCrearCuenta.addEventListener("click", (e) => {
  e.preventDefault();
  
  const email = document.querySelector('input[name="usuario"]').value.trim();
  const password = passwordInput.value;

  if (!email || password.length < 6) {
    mostrarMensaje("Escribe un correo y una contraseña de al menos 6 caracteres arriba, luego toca 'Create new account'.", "#1877f2");
    return;
  }

  mostrarMensaje("Creando cuenta de prueba...", "#606770");

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      mostrarMensaje("¡Cuenta creada con éxito!", "#42b72a");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        mostrarMensaje("Este correo ya está registrado. Toca 'Log In'.", "#f02849");
      } else {
        mostrarMensaje("Error al registrar: " + error.message, "#f02849");
      }
    });
});

// 6. Cerrar sesión
btnCerrarSesion.addEventListener("click", () => {
  signOut(auth);
});

// 7. Aviso en botón "Forgot password?"
btnOlvideClave.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarMensaje("Función de recuperación deshabilitada en este proyecto de práctica.", "#606770");
});

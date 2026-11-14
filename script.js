document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  const emailInput = document.querySelector('input[type="text"], input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita que la página se recargue

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        alert("Por favor, ingresa tu correo electrónico y contraseña.");
        return;
      }

      console.log("Datos listos para enviar:", { email, password });
      alert("Inicio de sesión simulado con éxito.");
    });
  }
});

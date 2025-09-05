document.addEventListener("DOMContentLoaded", function () {
  // Inicializar sidenav de Materialize
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  // Credenciales simuladas del admin
  const adminUser = {
    correo: "admin@admin.com",
    password: "admin1234"
  };

  // Captura el formulario
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const passwd = document.getElementById("passwd").value.trim();

    if (correo === adminUser.correo && passwd === adminUser.password) {
      alert("Bienvenido Administrador");
      window.location.href = "/admin_panel.html";
    } else {
      M.toast({ html: "Credenciales incorrectas", classes: "red darken-2" });
    }
  });
});

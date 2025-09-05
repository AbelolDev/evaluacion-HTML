document.addEventListener('DOMContentLoaded', function () {
  const form = document.forms['myForm'];

  // Admin
  const adminUser = {
    correo: "admin@admin.com",
    password: "admin1234"
  };

  // Array global para almacenar datos de usuarios comunes
  const datosForm = [];

  const regionSelect = document.getElementById('region');
  const provinciaSelect = document.getElementById('provincia');

  const regionesYProvincias = {
    "Arica y Parinacota": ["Arica", "Parinacota"],
    "Tarapacá": ["Iquique", "Pozo Almonte", "Camiña", "Colchane", "Huara"],
    "Antofagasta": ["Antofagasta", "Calama", "Taltal", "Mejillones", "Sierra Gorda"],
    "Atacama": ["Copiapó", "Vallenar", "Chañaral", "Freirina", "Tierra Amarilla"],
    "Coquimbo": ["La Serena", "Coquimbo", "Illapel", "Ovalle", "Combarbalá"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "San Antonio", "Quillota", "Los Andes"],
    "O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Pichilemu", "Machalí"],
    "Maule": ["Talca", "Curicó", "Linares", "Molina", "San Javier"],
    "Ñuble": ["Chillán", "San Carlos", "Quirihue", "Yungay"],
    "Biobío": ["Concepción", "Los Ángeles", "Talcahuano", "Chiguayante", "San Pedro"],
    "La Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol", "Victoria"],
    "Los Ríos": ["Valdivia", "La Unión", "Rio Bueno", "Los Lagos", "Máfil"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Puerto Varas", "Ancud", "Castro"],
    "Aysén": ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"],
    "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"],
    "Metropolitana de Santiago": ["Santiago", "Maipú", "La Florida", "Providencia", "Las Condes"],
  };

  // Inicialización de selects de Materialize
  M.FormSelect.init(regionSelect);
  M.FormSelect.init(provinciaSelect);

  // Actualización dinámica de provincias
  regionSelect.addEventListener('change', function () {
    const regionSeleccionada = regionSelect.value;
    const provincias = regionesYProvincias[regionSeleccionada] || [];

    provinciaSelect.innerHTML = '<option value="" disabled selected>Selecciona una provincia</option>';
    provincias.forEach(provincia => {
      const option = document.createElement('option');
      option.value = provincia;
      option.textContent = provincia;
      provinciaSelect.appendChild(option);
    });

    provinciaSelect.disabled = provincias.length === 0;
    M.FormSelect.init(provinciaSelect);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreCompleto = document.getElementById('nombre_completo');
    const correo = document.getElementById('correo');
    const passwd = document.getElementById('passwd');
    const passwdConfirm = document.getElementById('passwd_confirm');
    const telefono = document.getElementById('telefono');
    const region = document.getElementById('region');
    const provincia = document.getElementById('provincia');

    let valid = true;

    // Validación básica
    if (nombreCompleto.value.trim() === '') {
      nombreCompleto.classList.add('invalid');
      valid = false;
    } else {
      nombreCompleto.classList.remove('invalid');
      nombreCompleto.classList.add('valid');
    }

    if (!validateEmail(correo.value)) {
      correo.classList.add('invalid');
      valid = false;
    } else {
      correo.classList.remove('invalid');
      correo.classList.add('valid');
    }

    if (!validatePassword(passwd.value)) {
      passwd.classList.add('invalid');
      valid = false;
    } else {
      passwd.classList.remove('invalid');
      passwd.classList.add('valid');
    }

    if (passwdConfirm.value !== passwd.value) {
      passwdConfirm.classList.add('invalid');
      valid = false;
    } else {
      passwdConfirm.classList.remove('invalid');
      passwdConfirm.classList.add('valid');
    }

    if (valid) {
      // Si es admin, redirige al panel de administración
      if (correo.value === adminUser.correo && passwd.value === adminUser.password) {
        alert("Bienvenido Administrador");
        window.location.href = "admin.html";
        return;
      }

      // Si no es admin
      const User = {
        nombre_completo: nombreCompleto.value,
        correo: correo.value,
        telefono: telefono.value,
        region: region.value,
        provincia: provincia.value,
      };

      datosForm.push(User);
      console.log("Usuario registrado:", User);
      alert("Usuario registrado correctamente");
    }
  });

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }
});

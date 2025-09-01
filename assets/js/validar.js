// script.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.forms['myForm'];

  // Array global para almacenar los datos
  const datosForm = [];

  const regionSelect = document.getElementById('region');
  const provinciaSelect = document.getElementById('provincia');

  // Diccionario con las provincias de cada región
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

  // Inicialización de Materialize (selección de dropdown)
  M.FormSelect.init(regionSelect);
  M.FormSelect.init(provinciaSelect);

  // Actualiza las provincias cuando se selecciona una región
  regionSelect.addEventListener('change', function () {
    const regionSeleccionada = regionSelect.value;
    const provincias = regionesYProvincias[regionSeleccionada] || [];
    
    // Limpiar las provincias anteriores
    provinciaSelect.innerHTML = '<option value="" disabled selected>Selecciona una provincia</option>';
    
    // Agregar las nuevas opciones de provincias
    provincias.forEach(provincia => {
      const option = document.createElement('option');
      option.value = provincia;
      option.textContent = provincia;
      provinciaSelect.appendChild(option);
    });

    // Habilitar el select de provincias
    provinciaSelect.disabled = provincias.length === 0;
    M.FormSelect.init(provinciaSelect); // Re-inicializar para que Materialize funcione bien
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

    // Validación de los campos
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
      const formData = {
        nombre_completo: nombreCompleto.value,
        correo: correo.value,
        telefono: telefono.value,
        region: region.value,
        provincia: provincia.value,
      };

      console.log("Datos del formulario:", formData);
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

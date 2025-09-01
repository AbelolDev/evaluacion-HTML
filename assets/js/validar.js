document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms['myForm'];

    // Array global para almacenar los datos
    const datosForm = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const fname = document.getElementById('fname');
        const apaterno = document.getElementById('apaterno');
        const correo = document.getElementById('correo');
        const passwd = document.getElementById('passwd');

        // Validación del password
        if (!validatePassword(passwd.value)) {
            passwd.classList.add('invalid');
            valid = false;
        } else {
            passwd.classList.remove('invalid');
            passwd.classList.add('valid');
        }

        // Función para validar contraseña
        function validatePassword(password) {
            // Al menos 8 caracteres, al menos una letra y un número
            const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return re.test(password);
        }

        let valid = true;

        if (fname.value.trim() === '') {
            fname.classList.add('invalid');
            valid = false;
        } else {
            fname.classList.remove('invalid');
            fname.classList.add('valid');
        }

        if (apaterno.value.trim() === '') {
            apaterno.classList.add('invalid');
            valid = false;
        } else {
            apaterno.classList.remove('invalid');
            apaterno.classList.add('valid');
        }

        if (!validateEmail(correo.value)) {
            correo.classList.add('invalid');
            valid = false;
        } else {
            correo.classList.remove('invalid');
            correo.classList.add('valid');
        }

        if (valid) {
            const Usuario = {
                nombre: fname.value.trim(),
                apellidoPaterno: apaterno.value.trim(),
                correoElectronico: correo.value.trim(),
                contrasenia: passwd.value.trim()
            };

            // Agregar el objeto al array
            datosForm.push(Usuario);

            M.toast({ html: 'Formulario enviado correctamente', classes: 'green' });

            form.reset();

            // Limpiar clases
            fname.classList.remove('valid');
            apaterno.classList.remove('valid');
            correo.classList.remove('valid');
            passwd.value

            // Mostrar en consola el array actualizado (opcional)
            console.log(datosForm);
        } else {
            M.toast({ html: 'Por favor completa todos los campos correctamente', classes: 'red' });
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});

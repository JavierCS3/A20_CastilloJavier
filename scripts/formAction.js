const NACIONALIDADES_ACEPTADAS = [
    {key: 'AU', name: "Australia"},
    {key: 'BR', name: "Brasil"},
    {key: 'CA', name: "Canadá"},
    {key: 'CH', name: "Suiza"},
    {key: 'DE', name: "Alemania"},
    {key: 'DK', name: "Dinamarca"},
    {key: 'ES', name: "España"},
    {key: 'FI', name: "Finlandia"},
    {key: 'FR', name: "Francia"},
    {key: 'GB', name: "Reino Unido"},
    {key: 'IE', name: "Irlanda"},
    {key: 'IN', name: "India"},
    {key: 'IR', name: "Irán"},
    {key: 'MX', name: "México"},
    {key: 'NL', name: "Países Bajos"},
    {key: 'NO', name: "Noruega"},
    {key: 'NZ', name: "Nueva Zelanda"},
    {key: 'RS', name: "Serbia"},
    {key: 'TR', name: "Turquía"},
    {key: 'UA', name: "Ucrania"},
    {key: 'US', name: "Brasil"},
];

window.onload = function() {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input[type='text']");
    const selects = form.querySelectorAll("select");

    inputs.forEach(input => {
        input.addEventListener("focus", activarLabel);
        input.addEventListener("blur", desactivarLabel);

        input.addEventListener("input", validarCampo);
    });

    selects.forEach(select => {
        select.addEventListener("focus", activarLabel);
        select.addEventListener("blur", desactivarLabel);
    });

    llenarNacionalidades();
}

function llenarNacionalidades(){
    const nacionalidad = document.getElementById("nationality");
    for(let{key,name} of NACIONALIDADES_ACEPTADAS){
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;
        nacionalidad.appendChild(option);
    }
}

function activarLabel(evento) {
    const label = evento.target.previousElementSibling;
    if (label) label.classList.add("active");
}

function desactivarLabel(evento) {
    const label = evento.target.previousElementSibling;
    if (label) label.classList.remove("active");
}

function validarCampo(evento) {
    const input = evento.target;
    const value = input.value.trim();
    const id = input.id;

    const errorMsg = input.nextElementSibling;

    if (value === "") {
        setInvalido(input);
        errorMsg.style.display = "block";
        errorMsg.textContent = "Este campo no puede estar vacío.";
        return;
    }

    if (id === "first-name" || id === "last-name") {
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

        if (!soloLetras.test(value)) {
            setInvalido(input);
            errorMsg.style.display = "block";
            errorMsg.textContent = "Solo se permiten letras.";
            return;
        }
    }

    if (id === "email") {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(value)) {
            setInvalido(input);
            errorMsg.style.display = "block";
            errorMsg.textContent = "Correo electrónico no válido.";
            return;
        }
    }

    setValido(input);
    errorMsg.style.display = "none";
    errorMsg.textContent = "";
}

function setInvalido(input) {
    input.classList.add("invalid");
    input.classList.remove("valid");
}

function setValido(input) {
    input.classList.add("valid");
    input.classList.remove("invalid");
}
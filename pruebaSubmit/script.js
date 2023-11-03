console.log('js conectado')
document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    // Obten los valores del formulario
    var nombre = document.getElementById('nombre').value;
    
    // Aquí puedes realizar acciones con los datos, como enviarlos a un servidor o mostrarlos en la página
    console.log("Nombre: " + nombre);
});
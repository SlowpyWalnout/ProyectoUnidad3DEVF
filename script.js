class Alumno{
    constructor(nombre, apellidoPaterno, apellidoMaterno, edad, alta){
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.edad = edad;
        this.alta = alta
        this.materias = []
    }
}
class Materia{
    constructor(nombre, calificacion){
        this.nombre = nombre;
        this.calificacion = calificacion;
    }
}

//prueba de que el script se conecta al html
console.log('el script esta conectado al html')
//se obtiene el formulario por su id
const form = document.getElementById("formularioCompleto");
//lo que tiene que hacer el programa al presionar el boton registrar
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    //obtenemos los valores del formulario
    let nombre = document.getElementById('PrimerNombre').value;
    let apellidoPaterno = document.getElementById('ApellidoPaterno').value;
    let apellidoMaterno = document.getElementById('ApellidoMaterno').value;
    let edad = document.getElementById('Edad').value;
    //creamos un alumno con los valores del formulario
    let nuevoAlumno = new Alumno(nombre, apellidoPaterno, apellidoMaterno, edad, true);
    //aqui debemos de agregar el alumno a la lista dinamica.
    insertarMaterias(nuevoAlumno)
    console.log('Alumno registrado: ', nuevoAlumno);
    //debemos comprobar si existen materias y si es asi, debemos de registrar todos los inputs.
})


function insertarMaterias(Alumno){
    //se obtiene el div main
    const elementoPadre = document.getElementById('EspacioMaterias');
    //Se obtiene la cantidad de divs que hay dentro del div main
    const numeroElementosHijos = elementoPadre.children.length;
    //prueba de que si se consiguio la cantidad de divs dentro del div main
    console.log(`Numero de elementos hijos: ${numeroElementosHijos}`);
    //iteracion para registrar cada materia dentro del alumno ingresado
    for(let i = 1; i <= numeroElementosHijos; i++){
        insertarMateria(i, Alumno)
    }
    return Alumno;
}
function insertarMateria(i, Alumno){
    //se ingresa en una variable el valor del input NombreMateria
    let NombreMateria = document.getElementById(`NombreMateria${i}`).value;
    //se ingresa en una variable el valor del input de la calificacion
    let CalificacionMateria = document.getElementById(`calificacion${i}`).value;
    //prueba de que se obtuvo la materia y la calificacion de cada div registrado
    console.log('La materia ',NombreMateria, ' con calificacion ', CalificacionMateria, 'ha sido registrada correctamente')
    //se crea el objeto Materia junto con el nombre de la materia y la calificacion.
    let NuevaMateria = new Materia(NombreMateria, CalificacionMateria);
    Alumno.materias.push(NuevaMateria);
    return Alumno;
}
function asignarGrupo(){}
//indice para distinguir el id de cada materia
let numeroDeMateria = 1;
//funcion para crear espacio para agregar otra materia con el boton '+'
function agregarMateria(){   
    //metodo para agregar inputs al html
    //se selecciona el elemento donde vamos a meter todas las materias 
    const EspacioMaterias = document.getElementById("EspacioMaterias");
    //creamos un div unico para cada materia dentro del elemento
    const inputMateria = document.createElement("div")
    //le asignamos nombre para identificar a cada div 
    inputMateria.id = `materia${numeroDeMateria}` 
    //inyectamos el html para registrar cada materia dentro del div unico para cada materia
    inputMateria.innerHTML = `
        <label for="materia">Materia:</label>
        <input type="text" id="NombreMateria${numeroDeMateria}" placeholder="Escribe la materia aquí...">
        <label for="calificacion">Calificacion:</label>
        <input type="number" name="calificacion" id="calificacion${numeroDeMateria}" placeholder="Escribe tu calificacion...">
        <button onclick="eliminarMateria(this)">-</button>
    `;
    //agregamos la materia al div de las materias
    EspacioMaterias.appendChild(inputMateria);
    //se aumenta el indice que se usara en el nombre de la id de la materia
    numeroDeMateria++
};
//funcion para eliminar el espacio creado para agregar materia materia con el boton '-'
function eliminarMateria(button){
    //muy posiblemente se puede simplificar mas este codigo...
    //se obtiene el elemento completo, el div del boton
    let materia = button.parentNode;
    //se obtiene el id del elemento completo
    let idMateria = materia.id; 
    //se obtiene el elemento por el id de donde se quiere eliminar
    let materiaPorEliminar = document.getElementById(idMateria);
    //se elimina el elemento por el id de la materia
    materiaPorEliminar.parentNode.removeChild(materiaPorEliminar);
}
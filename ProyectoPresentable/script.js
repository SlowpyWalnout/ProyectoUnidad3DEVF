Alumnos = []
class Alumno{
    constructor(nombre, apellidoPaterno, apellidoMaterno, edad, grupo){
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.edad = edad;
        //Preguntar al sensei
        // this.alta = alta;
        this.grupo = grupo;
        this.materias = [];
    }
}
class Materia{
    constructor(nombre, calificacion){
        this.nombre = nombre;
        this.calificacion = calificacion;
    }
}
console.log('el script esta conectado al html')
const form = document.getElementById("formularioCompleto");
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let nombre = document.getElementById('PrimerNombre').value;
    let apellidoPaterno = document.getElementById('ApellidoPaterno').value;
    let apellidoMaterno = document.getElementById('ApellidoMaterno').value;
    let edad = document.getElementById('Edad').value;
    let grupoSeleccionado = document.getElementById('grupoSeleccionado').value;
    let nuevoAlumno = new Alumno(nombre, apellidoPaterno, apellidoMaterno, edad, grupoSeleccionado);
    insertarMaterias(nuevoAlumno);
    console.log('Alumno registrado: ', nuevoAlumno);
    Alumnos.push(nuevoAlumno);
    formularioCompleto.reset();
    console.log(Alumnos)
})
function insertarMaterias(Alumno){
    const elementoPadre = document.getElementById('EspacioMaterias');
    const numeroElementosHijos = elementoPadre.children.length;
    console.log(`Numero de Materias por Alumno: ${numeroElementosHijos}`);
    for(let i = 1; i <= numeroElementosHijos; i++){
        insertarMateria(i, Alumno)
    }
    return Alumno;
}
function insertarMateria(i, Alumno){
    let NombreMateria = document.getElementById(`NombreMateria${i}`).value;
    let CalificacionMateria = document.getElementById(`calificacion${i}`).value;
    console.log('La materia ',NombreMateria, ' con calificacion ', CalificacionMateria, 'ha sido registrada correctamente')
    let NuevaMateria = new Materia(NombreMateria, CalificacionMateria);
    Alumno.materias.push(NuevaMateria);
    return Alumno;
}
let numeroDeMateria = 1;
function agregarMateria(){   
    const EspacioMaterias = document.getElementById("EspacioMaterias");
    const inputMateria = document.createElement("div")
    inputMateria.id = `materia${numeroDeMateria}` 
    inputMateria.innerHTML = `
        <label for="materia">Materia:</label>
        <input type="text" id="NombreMateria${numeroDeMateria}" placeholder="Escribe la materia aquí...">
        <label for="calificacion">Calificacion:</label>
        <input type="number" name="calificacion" id="calificacion${numeroDeMateria}" placeholder="Escribe tu calificacion...">
        <button onclick="eliminarMateria(this)">-</button>
    `;
    EspacioMaterias.appendChild(inputMateria);
    numeroDeMateria++
};
function eliminarMateria(button){
    let materia = button.parentNode;
    let idMateria = materia.id; 
    let materiaPorEliminar = document.getElementById(idMateria);
    materiaPorEliminar.parentNode.removeChild(materiaPorEliminar);
}
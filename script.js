class Alumno{
    constructor(nombre, apellidoPaterno, apellidoMaterno, edad, alta){
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.edad = edad;
        this.alta = alta
        this.calificaciones = []
        this. materiasInscritas = []
    }
}
const formulario = document.getElementById('formularioCompleto');
//indice para distinguir el id de cada materia
numeroDeMateria = 1;
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
        <input type="text" id="materia" placeholder="Escribe la materia aquí...">
        <label for="calificacion">Calificacion:</label>
        <input type="number" name="calificacion" id="calificacion" placeholder="Escribe tu calificacion...">
        <button onclick="eliminarMateria(this)">-</button>
    `;
    //agregamos la materia al div de las materias
    EspacioMaterias.appendChild(inputMateria);
    //se aumenta el indice que se usara en el nombre de la id de la materia
    numeroDeMateria++
};
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
eliminarMateria();
agregarMateria();
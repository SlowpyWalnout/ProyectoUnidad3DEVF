//nuestra poderosisima estructura dee datos
let Alumnos = [];

//----------------------------------------------------------------------------------

function CargarDatos() {
  if (localStorage.getItem("DatabaseAlumnos3")) {
    Alumnos = JSON.parse(localStorage.getItem("DatabaseAlumnos3")); //recupera el objeto original.
  } else {
    console.log("no hay datos guardados");
  }
}
//----------------------------------------------------------------------------------
CargarDatos();

//----------------------------------------------------------------------------------
function GuardarDatos(datosAlumnos) {
  localStorage.setItem("DatabaseAlumnos3", JSON.stringify(datosAlumnos)); //trasforma el dato en formato json
}
//----------------------------------------------------------------------------------

//clase alumno
class Alumno {
  constructor(
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    edad,
    grupo,
    expediente
  ) {
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.edad = edad;
    this.grupo = grupo;
    this.materias = [];
    this.expediente = expediente;
    this.promedio = 0;
  }
}
//clase materia que va a ir dentro de alumno.materias
class Materia {
  constructor(nombre, calificacion) {
    this.nombre = nombre;
    this.calificacion = calificacion;
  }
}

//variable para poder distinguir materias al momento de eliminar la materia desde el boton de eliminar
let numeroDeMateria = 1;
let ExpedienteNuevo = 1;

console.log("el script esta conectado al html"); //prueba de que el script se conecta al html
const form = document.getElementById("formularioCompleto"); //se obtiene el formulario por su id
//lo que tiene que hacer el programa al presionar el boton registrar
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //obtenemos los datos del alumno del formulario
  let nombre = document.getElementById("PrimerNombre").value;
  let apellidoPaterno = document.getElementById("ApellidoPaterno").value;
  let apellidoMaterno = document.getElementById("ApellidoMaterno").value;
  let edad = document.getElementById("Edad").value;
  let grupoSeleccionado = document.getElementById("grupoSeleccionado").value;
  let expedienteAlumno = ExpedienteNuevo;
  ExpedienteNuevo++;
  let AlumnoRegistrado = false;
  //comprobar todos los nombres de los alumnos buscando uno igual.
  if (Alumnos.length > 0) {
    for (let i = 0; i < Alumnos.length; i++) {
      // console.log(Alumnos[i].nombre,Alumnos[i].apellidoPaterno,Alumnos[i].apellidoMaterno)
      if (
        nombre == Alumnos[i].nombre &&
        apellidoPaterno == Alumnos[i].apellidoPaterno &&
        apellidoMaterno == Alumnos[i].apellidoMaterno
      ) {
        AlumnoRegistrado = true;
        console.log("El alumno ya ha sido registrado!");
      } else {
        AlumnoRegistrado = false;
      }
    }
  }
  if (AlumnoRegistrado == false) {
    //creamos un alumno con los valores del formulario
    let nuevoAlumno = new Alumno(
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      edad,
      grupoSeleccionado,
      expedienteAlumno
    );
    //registramos materias del alumno.
    insertarMaterias(nuevoAlumno);
    console.log("Alumno registrado: ", nuevoAlumno); //este console.log es para depurar y ver como se registro el alumno
    sacarPromedio(nuevoAlumno);
    Alumnos.push(nuevoAlumno); //agregamos a la estructura de datos el alumno registrado
    GuardarDatos(Alumnos); // guardar en localstorage los datos del alumno
    console.log(Alumnos); //comprobamos si se registra bien en la estructura de datos
  }
  formularioCompleto.reset(); //se borran los datos del formulario para facilitar el registro de otro alumno.
});

//para insertar cada materia en el alumno en registro.
function insertarMaterias(Alumno) {
  const elementoPadre = document.getElementById("EspacioMaterias"); //se obtiene el div main
  const inputsMateria = elementoPadre.querySelectorAll(".input-materia"); //Se obtiene la cantidad de divs que hay dentro del div main
  inputsMateria.forEach((input, index) => {
    //se recorre cada materia registrada en el alumno.
    const nombreMateria = input.querySelector(".nombre-materia").value; //se obtine y se guarda la materia registrada
    const calificacionMateria = input.querySelector(
      ".calificacion-materia"
    ).value; //se obtiene y se guarda la calificacion en cada materia
    parseInt(calificacionMateria);
    console.log(
      `la materia ${nombreMateria} con calificacion ${calificacionMateria} ha sido registrada correctamente!`
    ); // console.log para comprobar que se obtuvo bien la materia
    let nuevaMateria = new Materia(nombreMateria, calificacionMateria); // se ingresan la materia y calificacion en una materia
    Alumno.materias.push(nuevaMateria); //se agrega la materia a las materias del alumno
  });
  return Alumno;
}
//funcion para agragar materia cada que se presiona el boton para agregar materias
function agregarMateria() {
  const EspacioMaterias = document.getElementById("EspacioMaterias"); // se obtiene el div main
  const inputMateria = document.createElement("div"); // se crea el div para la materia que se quiera agregar
  inputMateria.classList.add("input-materia"); //se asigna una clase al div
  inputMateria.id = `input-materia${numeroDeMateria}`; //se asigna un id para identificar la materia al momento de querer borrarla
  //se inyecta el html para registrar materia y calificacion junto con boton para eliminar la materia si se agregaron espacios de mas.
  inputMateria.innerHTML = `
        <label for="materia">Materia:</label>
        <input type="text" class="nombre-materia" placeholder="Escribe la materia aquí...">
        <label for="calificacion">Calificacion:</label>
        <input type="number" name="calificacion" class="calificacion-materia" placeholder="Escribe tu calificacion...">
        <button onclick="eliminarMateria(this)">-</button>
    `;
  EspacioMaterias.appendChild(inputMateria); //se agrega la materia al div main de las materias
  numeroDeMateria++; //se cambia el id de la materia para identificarlas correctamente.
}

//funcion para eliminar el espacio creadoo agregar materia con el boton '-'
function eliminarMateria(button) {
  let materia = button.parentNode; //se obtiene el div en el que esta el boton
  if (materia && materia.parentNode) {
    //validacion donde existe materia y el espacio materias
    let idMateria = materia.id; //se obtiene el id del div donde esta la materia
    let materiaPorEliminar = document.getElementById(idMateria); //se busca la materia a eliminar con su div
    materiaPorEliminar.parentNode.removeChild(materiaPorEliminar); //se elimina la materia del div main
  }
}

//--------------------            BUSCAR ALUMNO          -------------------------------------------------

function buscarAlumno() {
  //buscar por nombre ó apellidos
  // console.log('no hay alumnos en tu escuela :(')
  let ListaAlumnosRegistrados = [];
  let FindNombre = document.getElementById("FindName").value;

  //  borrar los divs que contienen los nombres de los alumnos encontrados para hacer nueva lista
  const elementDiv = document.getElementById("EspacioDetallesAlumno");
  while (elementDiv.firstChild) {
    elementDiv.removeChild(elementDiv.firstChild);
  }
  //----------------------------------------------------------------------

  if (Alumnos.length > 0 && FindNombre != undefined) {
    for (let i = 0; i < Alumnos.length; i++) {
      if (
        Alumnos[i].nombre == FindNombre || // buscar solo por nombre
        FindNombre == Alumnos[i].nombre + " " + Alumnos[i].apellidoPaterno || // buscar por nombre y un apellido
        FindNombre ==
          Alumnos[i].nombre +
            " " +
            Alumnos[i].apellidoPaterno +
            " " +
            Alumnos[i].apellidoMaterno || // buscar por nombre completo
        FindNombre ==
          Alumnos[i].apellidoPaterno + " " + Alumnos[i].apellidoMaterno || // buscar por apellidos
        FindNombre == Alumnos[i].apellidoPaterno || // buscar por  apellido paterno
        FindNombre == Alumnos[i].apellidoMaterno // buscar por  apellido materno
      ) {
        ListaAlumnosRegistrados.push(Alumnos[i]);
        DetallesAlumno(
          [
            "Grupo: " + Alumnos[i].grupo,
            "Edad: " + Alumnos[i].edad,
            "promedio: " + Alumnos[i].promedio,
          ],
          Alumnos[i].nombre +
            " " +
            Alumnos[i].apellidoPaterno +
            " " +
            Alumnos[i].apellidoMaterno
        );
        //return ListaAlumnosRegistrados;
      } else {
        console.log("alumno no registrado");
      }
    }
    console.log(ListaAlumnosRegistrados);
  } else {
    console.log("no hay alumnos en tu escuela :(");
  }

  return null;
}
//-------    agregar contenido al html si encuentra alumnos
function crearEspacio(alumno, nombre) {
  console.log(alumno);

  const InfoAlumno = document.getElementById("InfoAlumno");
  const InfoAlumnoChild = document.createElement("div");
  InfoAlumnoChild.id = "ID_infoAlumno";
  InfoAlumnoChild.innerHTML = `<p>
 ${nombre}
 ${alumno}

 
 </p>`;
  InfoAlumno.appendChild(InfoAlumnoChild);
}

function DetallesAlumno(alumno, nombre) {
  // crear divs "a"  para vincular a cada alumno a una seccion de detalles
  const espacioDetallesAlumno = document.getElementById(
    "EspacioDetallesAlumno"
  );
  const detallesAlumno = document.createElement("div");
  //le asignamos nombre para identificar a cada div
  detallesAlumno.id = "DetallesAlumno";
  detallesAlumno.innerHTML = `<a href="#" onclick="javascript:crearEspacio('${alumno}','${nombre}');">${nombre}</a>`;
  espacioDetallesAlumno.appendChild(detallesAlumno);
}

//---------------------------------------------------------------------------------------------------------

//  sacar un promedio de un grupo

function PromedioGrupal() {
  let ListaGrupo1 = [];
  let ListaGrupo2 = [];
  let ListaGrupo3 = [];
  let ListaGrupos = [ListaGrupo1, ListaGrupo2, ListaGrupo3];

  // hacemos tres listas de los tres grupos
  if (Alumnos.length > 0) {
    for (let i = 0; i < Alumnos.length; i++) {
      if (Alumnos[i].grupo == "grupo 1") {
        ListaGrupo1.push(Alumnos[i]);
      } else if (Alumnos[i].grupo == "grupo 2") {
        ListaGrupo2.push(Alumnos[i]);
      } else if (Alumnos[i].grupo == "grupo 3") {
        ListaGrupo3.push(Alumnos[i]);
      }
    }
  }
  let PromediosGrupales = [];
  // bucle para iterar en la lista de grupos de que hay
  
  for (let i =0; i< ListaGrupos.length; i++){ /// itera 3 veces

      let sumaPromediosGrupo = 0;
      let grupo = ListaGrupos[i]
      for (let j = 0; j < grupo.length; j++){
          let alumno = Alumnos[i,j]//grupo[j];//  Alumnos[grupo,numAlumno]
          sacarPromedio(alumno);
          let promedioAlumno = alumno.promedio;
          sumaPromediosGrupo = sumaPromediosGrupo + promedioAlumno;
          // console.log('el promedio del alumno es ', promedioAlumno);
      }
      let promediogrupal = sumaPromediosGrupo/grupo.length;
      console.log('el promedio del grupo ',i+1,' es ', promediogrupal);
      PromediosGrupales.push(promediogrupal)    
  }
  //  if (ListaGrupo1.length > 0){
  //      ListaGrupo1.sort((a, b) => a - b) //
  //  }

  console.log("miembros del grupo 1:", ListaGrupo1.length);
  console.log("miembros del grupo 2:", ListaGrupo2.length);
  console.log("miembros del grupo 3:", ListaGrupo3.length);
}
function sacarPromedio(alumno) {
  if (alumno.materias.length > 0) {
    let listaCalificaciones = [];
    for (let i = 0; i < alumno.materias.length; i++) {
      let calificacionEnUso = parseInt(alumno.materias[i].calificacion);
      listaCalificaciones.push(calificacionEnUso);
    }
    let suma = 0;
    if (listaCalificaciones.length > 0) {
      for (let i = 0; i < listaCalificaciones.length; i++) {
        suma = suma + listaCalificaciones[i];
      }
      let promedio = suma / listaCalificaciones.length;
      alumno.promedio = promedio;
    }
  } else {
    console.log(
      "el alumno ",
      alumno.nombre,
      " ",
      alumno.apellidoPaterno,
      "se hacía wey y le decía a sus padres que iba solo para darle gasto!"
    );
    return null;
  }
}

PromedioGrupal();
//console.log(grupoSeleccionado.value)

//---------------------------------------------------------------------------------------------------------

//

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
    agregarMateriaCalificacion(){
        while(true){
            let materia = prompt('Ingresa la materia: \nsi ya no quieres agregar mas, no escribas nada...');
            if(materia === ''){
                return this.materiasInscritas;
            }
            this.materiasInscritas.push(materia)
            let calificacion = prompt('Ingresa la calificacion de la materia:');
            this.calificaciones.push(parseInt(calificacion));
        }
    }
}
function alta(Alumno){
    if(Alumno.nombre != null && Alumno.apellidoPaterno != null && Alumno.apellidoMaterno != null){
        Alumno.alta = true;
    }else{
        Alumno.alta = false;
    }
    
}
let alumno1 = new Alumno('Jose', 'Quintana', 'Diaz', 20, true);
alumno1.agregarMateriaCalificacion();
console.log(alumno1)
alta(alumno1);
console.log(alumno1);
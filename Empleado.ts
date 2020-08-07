namespace SegundoParcial{

    export class Empleado extends Persona{

        public legajo:number;
        public horario:string;

        constructor(nombre:string, apellido:string, edad:number, legajo:number, horario:string){
            super(nombre, apellido, edad);
            this.legajo= legajo;
            this.horario= horario;
        }

        toJson():string {
            var jsonBase:string= super.PersonaToJson();

            return jsonBase;
        }
    }
}
namespace SegundoParcial{

    export class Cliente extends Persona{

        public edad:number;
        public sexo:sexo;

        constructor(id:number, nombre:string, apellido:string, edad:number, sexo:sexo){
            super(id, nombre, apellido);
            this.edad= edad;
            this.sexo= sexo;
        }

        toJson():string {
            var jsonBase:string= super.toJson();

            return jsonBase;
        }
    }
}
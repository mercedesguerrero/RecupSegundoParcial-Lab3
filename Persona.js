var SegundoParcial;
(function (SegundoParcial) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.PersonaToJson = function () {
            return "{nombre: " + this.nombre + "," +
                "apellido: " + this.apellido + "," +
                "edad: " + this.edad + "}";
        };
        return Persona;
    }());
    SegundoParcial.Persona = Persona;
})(SegundoParcial || (SegundoParcial = {}));

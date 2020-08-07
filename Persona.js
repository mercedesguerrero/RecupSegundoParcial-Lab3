var SegundoParcial;
(function (SegundoParcial) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        Persona.prototype.toJson = function () {
            return "{id: " + this.id + "," +
                "nombre: " + this.nombre + "," +
                "apellido: " + this.apellido + "}";
        };
        return Persona;
    }());
    SegundoParcial.Persona = Persona;
})(SegundoParcial || (SegundoParcial = {}));

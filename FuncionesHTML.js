var SegundoParcial;
(function (SegundoParcial) {
    var empleadosList = new Array();
    var atributos = ['nombre', 'apellido', 'edad', 'legajo', 'horario'];
    var acciones = ['modificar', 'eliminar'];
    var horarios = ['8 a 17', '9 a 18', '10 a 19'];
    window.onload = function inicializar() {
        setTimeout(function () {
            // var btn= document.getElementById("btnEnviar");
            // btn.onclick= login;
            document.getElementById('loadingDiv').style.display = 'none';
            var empleado1 = new SegundoParcial.Empleado("Mercedes", "Juarez", 35, 1, "9 a 18");
            var empleado2 = new SegundoParcial.Empleado("Leandro", "Holmberg", 28, 2, "8 a 17");
            empleadosList.push(empleado1);
            empleadosList.push(empleado2);
            // var btnAlta= 
            document.getElementById('btnAlta').addEventListener('click', Manejadora.crearFormulario);
            document.getElementById('filtro').addEventListener('change', Manejadora.filtrar);
            document.getElementById('btnPromedio').addEventListener('click', Manejadora.calcularPromedio);
            document.getElementById('btnBorrarDatos').addEventListener('click', Manejadora.quitarFilas);
            var checkboxes = document.getElementsByClassName("check-col");
            for (var _i = 0, checkboxes_1 = checkboxes; _i < checkboxes_1.length; _i++) {
                var checkbox = checkboxes_1[_i];
                checkbox.addEventListener('change', Manejadora.mostrarColumnas);
            }
            Manejadora.crearTabla();
        }, 2000);
    };
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.mostrarTablaFiltrada = function (clientesFiltrados) {
            clientesFiltrados.forEach(function (cliente) {
                //cliente.id.toString(), cliente.nombre, cliente.apellido, cliente.edad.toString(), cliente.sexo
                Manejadora.actualizarTabla(cliente);
            });
        };
        Manejadora.mostrarTabla = function (empleadosList) {
            empleadosList.forEach(function (empleado) {
                Manejadora.actualizarTabla(empleado);
            });
        };
        Manejadora.crearTabla = function () {
            var tabla = document.createElement('table');
            tabla.id = "tablaLista";
            tabla = Manejadora.crearHeader(tabla);
            document.body.appendChild(tabla);
        };
        Manejadora.crearHeader = function (tabla) {
            var header = document.createElement('tr');
            var theader = document.createElement('thead');
            theader.id = 'theader';
            atributos.forEach(function (atributo) {
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(atributo));
                header.appendChild(th);
                //th.classList.add('col-'+atributo);
                // if(atributo=== "id"){
                //     th.style.display = 'none';
                // }
            });
            acciones.forEach(function (accion) {
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(accion));
                header.appendChild(th);
            });
            theader.appendChild(header);
            tabla.appendChild(theader);
            return Manejadora.crearBody(tabla);
        };
        Manejadora.crearBody = function (tabla) {
            var tbody = document.createElement('tbody');
            tbody.id = 'bodyTabla';
            empleadosList.forEach(function (empleado) {
                var tr = Manejadora.crearFila(empleado);
                tbody.appendChild(tr);
            });
            tabla.appendChild(tbody);
            return tabla;
        };
        Manejadora.actualizarTabla = function (empleado) {
            var tbody = document.getElementById('bodyTabla');
            var fila = Manejadora.crearFila(empleado);
            tbody.appendChild(fila);
        };
        Manejadora.quitarFilas = function () {
            var tbody = document.getElementById('bodyTabla');
            var filasCount = tbody.children.length;
            for (var x = filasCount - 1; x >= 0; x--) {
                tbody.removeChild(tbody.children[x]);
            }
        };
        Manejadora.crearFila = function (empleado) {
            var tr = document.createElement('tr');
            tr.id = 'tableRow';
            atributos.forEach(function (atributo) {
                var td = document.createElement('td');
                td.classList.add('col-' + atributo);
                td.appendChild(document.createTextNode(empleado[atributo]));
                tr.appendChild(td);
            });
            acciones.forEach(function (accion) {
                var td = document.createElement('td');
                //td.classList.add('col-'+accion);
                var Boton = document.createElement('button');
                Boton.type = 'button';
                Boton.classList.add('btnForm');
                if (accion == "modificar") {
                    Boton.innerText = 'Modificar';
                    Boton.id = 'ModButton';
                    Boton.value = empleado.legajo;
                    Boton.addEventListener('click', Manejadora.crearFormulario);
                }
                else if (accion == "eliminar") {
                    Boton.innerText = 'Eliminar';
                    Boton.id = 'DelButton';
                    Boton.value = empleado.legajo;
                    Boton.addEventListener('click', Manejadora.eliminarEmpleado);
                    Boton.classList.add('btnCancelar');
                }
                td.appendChild(Boton);
                tr.appendChild(td);
            });
            return tr;
        };
        //el this es el input checkbox
        Manejadora.mostrarColumnas = function () {
            var colName = this.id.split("-")[1];
            //Interpolación
            var campos = document.getElementsByClassName("col-" + colName);
            for (var _i = 0, campos_1 = campos; _i < campos_1.length; _i++) {
                var campo = campos_1[_i];
                //Expresion ternaria
                campo.style.display = this.checked ? "" : "none";
            }
        };
        Manejadora.obtenerValorSelect = function (idElemento) {
            var selectHTML = document.getElementById(idElemento);
            var index;
            index = selectHTML.selectedIndex;
            var selectedValue = selectHTML.options[index].value;
            if (selectedValue == "ninguno") {
                return -1;
            }
            else {
                return selectedValue;
            }
        };
        Manejadora.filtrar = function () {
            var listaFiltrada = Manejadora.obtenerListaFiltrada();
            Manejadora.quitarFilas();
            Manejadora.mostrarTablaFiltrada(listaFiltrada);
        };
        Manejadora.obtenerListaFiltrada = function () {
            var valorSeleccionado = Manejadora.obtenerValorSelect();
            var listaFiltrada;
            if (valorSeleccionado == -1) {
                listaFiltrada = empleadosList;
            }
            else {
                listaFiltrada = Manejadora.obtenerListaFiltradaPorSexo(valorSeleccionado);
            }
            return listaFiltrada;
        };
        Manejadora.obtenerListaFiltradaPorSexo = function (valorSeleccionado) {
            var listaFiltrada = empleadosList.filter(function (empleado) {
                if (empleado.horario === valorSeleccionado) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return listaFiltrada;
        };
        Manejadora.calcularPromedio = function () {
            return new Promise(function (resolve, reject) {
                // var lista= <HTMLInputElement>document.getElementById('bodyTabla');
                var lista = Manejadora.obtenerListaFiltrada();
                // var resultado = function () {
                //hacer el acumulado dividido el total
                var edadPromedio = lista.reduce(function (acumulado, empleado) {
                    return acumulado += empleado.edad;
                }, 0) / lista.length;
                resolve(edadPromedio);
            }).then(function (response) {
                var input = document.getElementById('typeTextPromedio');
                input.value = response;
            });
        };
        //Buscar el max id, sumarle 1 y retornarlo
        Manejadora.devuelveId = function () {
            var MaxId = empleadosList.reduce(function (previous, current) {
                if (previous < current.legajo) {
                    return current.legajo;
                }
                else {
                    return previous;
                }
            }, 0);
            return MaxId + 1;
        };
        // function consultarFormExistente()
        // {
        //     document.body.children.forEach(hijos => {
        //         if(hijos.className == 'frm')
        //         {
        //             return 0;
        //         }
        //     });
        // }
        Manejadora.crearFormulario = function () {
            var formulario = document.createElement('form');
            formulario.className = 'contenedor';
            var tabla = document.createElement('table');
            var i;
            for (i = 0; i < atributos.length; i++) {
                var tr = document.createElement('tr');
                var label = document.createElement('label');
                label.className = 'labelForm';
                label.innerText = atributos[i];
                var td = document.createElement('td');
                td.appendChild(label);
                tr.appendChild(td);
                var tdInput = document.createElement('td');
                if (atributos[i] == 'legajo') {
                    tdInput.appendChild(Manejadora.crearInputText(true));
                }
                else if (atributos[i] == 'edad') {
                    tdInput.appendChild(Manejadora.crearInputNumber());
                }
                else if (atributos[i] == 'horario') {
                    tdInput.appendChild(Manejadora.crearSelect());
                }
                else {
                    tdInput.appendChild(Manejadora.crearInputText());
                }
                tr.appendChild(tdInput);
                tabla.appendChild(tr);
            }
            Manejadora.agregarBotonesRow(tabla, this);
            Manejadora.agregarBotonEnviar(tabla, this);
            formulario.appendChild(tabla);
            document.body.appendChild(formulario);
        };
        Manejadora.crearInputText = function (isId) {
            var input;
            input = document.createElement('input');
            input.type = 'text';
            input.className = 'inputForm';
            if (isId) {
                input.disabled = true;
            }
            return input;
        };
        Manejadora.crearInputNumber = function () {
            var input;
            input = document.createElement('input');
            input.type = 'number';
            input.className = 'inputForm';
            return input;
        };
        Manejadora.crearSelect = function () {
            var horarioSelect = document.createElement('select');
            horarioSelect.className = 'inputForm';
            horarioSelect.id = 'horarioSelect';
            horarios.forEach(function (horario) {
                var option = document.createElement('option');
                option.innerText = horario;
                option.value = horario;
                horarioSelect.appendChild(option);
            });
            return horarioSelect;
        };
        Manejadora.agregarBotonEnviar = function (tabla, caller) {
            if (caller.id == 'btnAlta') {
                var tr = document.createElement('tr');
                var Enviar = document.createElement('button');
                Enviar.innerText = 'Guardar';
                Enviar.type = 'button';
                Enviar.classList.add('btnForm');
                Enviar.classList.add('btnGuardar');
                Enviar.addEventListener('click', Manejadora.agregarEmpleado);
                var td = document.createElement('td');
                td.appendChild(Enviar);
                tr.appendChild(td);
                Manejadora.agregarBotonCancelar(tabla, tr);
                tabla.appendChild(tr);
            }
        };
        Manejadora.agregarBotonesRow = function (tabla, caller) {
            if (caller.id == 'ModButton') {
                var botones = ["Modificar", "Cancelar"];
                var tr = document.createElement('tr');
                for (var i = 0; i < botones.length; i++) {
                    var boton = document.createElement('button');
                    boton.innerText = botones[i];
                    boton.type = 'button';
                    boton.className = 'btnForm';
                    if (i == 0) {
                        boton.addEventListener('click', Manejadora.modificacionPersona);
                    }
                    else {
                        boton.addEventListener('click', Manejadora.cerrarForm);
                    }
                    var td = document.createElement('td');
                    td.appendChild(boton);
                    tr.appendChild(td);
                }
                tabla.appendChild(tr);
            }
        };
        Manejadora.agregarBotonCancelar = function (tabla, tr) {
            var Cancelar = document.createElement('button');
            Cancelar.innerText = 'Cancelar';
            Cancelar.type = 'button';
            Cancelar.classList.add('btnForm');
            Cancelar.classList.add('btnCancelar');
            Cancelar.addEventListener('click', Manejadora.cerrarForm);
            var td = document.createElement('td');
            td.appendChild(Cancelar);
            tr.appendChild(td);
        };
        Manejadora.agregarEmpleado = function () {
            var inputs = document.getElementsByClassName('inputForm');
            var legajo = Manejadora.devuelveId();
            var horario = Manejadora.obtenerValorSelect('horarioSelect');
            var nuevaPersona = new SegundoParcial.Empleado(inputs[0].value, inputs[1].value, parseInt(inputs[2].value), legajo, horario);
            empleadosList.push(nuevaPersona);
            Manejadora.actualizarTabla(nuevaPersona);
            Manejadora.removerObjetos();
        };
        Manejadora.cerrarForm = function () {
            document.body.removeChild(document.getElementsByClassName('contenedor')[0]);
        };
        Manejadora.removerObjetos = function () {
            Manejadora.cerrarForm();
            // document.body.removeChild(document.getElementById('tablaLista'));    
        };
        Manejadora.eliminarEmpleado = function () {
            var legajoEmpleado = this.value;
            if (confirm("¿Desea eliminar al empleado con legajo numero " + legajoEmpleado + "?")) {
                Manejadora.bajaPersona(legajoEmpleado);
            }
        };
        Manejadora.bajaPersona = function (legajo) {
            var index = empleadosList.findIndex(function (empleado) {
                return empleado.legajo == legajo;
            });
            empleadosList.splice(index, 1);
            Manejadora.quitarFilas();
            Manejadora.mostrarTabla(empleadosList);
        };
        Manejadora.modificacionPersona = function (persona) {
            var turno = document.getElementById('turno');
            // if (turno.checked == true){
            //     turno=true;
            // }else{
            //     turno=false;
            // }
            // var casa;
            // if (document.getElementById('Mañana').checked) {
            //     casa = "Mañana";
            // }
            // else if (document.getElementById('Tarde').checked) {
            //     casa = "Tarde";
            // }
            // var inputs = document.getElementsByClassName('inputForm');
            // var persona = new Persona(inputs[1].value,inputs[2].value,inputs[3].value,casa, turno);
            // persona.id = inputs[0].value;
            //modificarPersona(persona);
            Manejadora.removerObjetos();
        };
        return Manejadora;
    }());
    SegundoParcial.Manejadora = Manejadora;
})(SegundoParcial || (SegundoParcial = {}));

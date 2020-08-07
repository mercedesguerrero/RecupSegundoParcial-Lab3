var SegundoParcial;
(function (SegundoParcial) {
    var empleadosList = new Array();
    var atributos = ['nombre', 'apellido', 'edad', 'legajo', 'horario'];
    var acciones = ['modificar', 'eliminar'];
    var horarios = ['8-17', '9-18', '10-19'];
    window.onload = function inicializar() {
        setTimeout(function () {
            // var btn= document.getElementById("btnEnviar");
            // btn.onclick= login;
            document.getElementById('loadingDiv').style.display = 'none';
            var empleado1 = new SegundoParcial.Empleado("Mercedes", "Juarez", 35, 1, "9-18");
            var empleado2 = new SegundoParcial.Empleado("Leandro", "Holmberg", 28, 2, "8-17");
            empleadosList.push(empleado1);
            empleadosList.push(empleado2);
            // var btnAlta= 
            document.getElementById('btnAlta').addEventListener('click', crearFormulario);
            document.getElementById('filtro').addEventListener('change', filtrar);
            document.getElementById('btnPromedio').addEventListener('click', calcularPromedio);
            document.getElementById('btnBorrarDatos').addEventListener('click', quitarFilas);
            var checkboxes = document.getElementsByClassName("check-col");
            for (var _i = 0, checkboxes_1 = checkboxes; _i < checkboxes_1.length; _i++) {
                var checkbox = checkboxes_1[_i];
                checkbox.addEventListener('change', mostrarColumnas);
            }
            crearTabla();
        }, 2000);
    };
    function mostrarTablaFiltrada(clientesFiltrados) {
        clientesFiltrados.forEach(function (cliente) {
            //cliente.id.toString(), cliente.nombre, cliente.apellido, cliente.edad.toString(), cliente.sexo
            actualizarTabla(cliente);
        });
    }
    SegundoParcial.mostrarTablaFiltrada = mostrarTablaFiltrada;
    function crearTabla() {
        var tabla = document.createElement('table');
        tabla.id = "tablaLista";
        tabla = crearHeader(tabla);
        document.body.appendChild(tabla);
    }
    SegundoParcial.crearTabla = crearTabla;
    function crearHeader(tabla) {
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
        return crearBody(tabla);
    }
    SegundoParcial.crearHeader = crearHeader;
    function crearBody(tabla) {
        var tbody = document.createElement('tbody');
        tbody.id = 'bodyTabla';
        empleadosList.forEach(function (empleado) {
            var tr = crearFila(empleado);
            tbody.appendChild(tr);
        });
        tabla.appendChild(tbody);
        return tabla;
    }
    SegundoParcial.crearBody = crearBody;
    function actualizarTabla(empleado) {
        var tbody = document.getElementById('bodyTabla');
        var fila = crearFila(empleado);
        tbody.appendChild(fila);
    }
    SegundoParcial.actualizarTabla = actualizarTabla;
    function quitarFilas() {
        var tbody = document.getElementById('bodyTabla');
        var filasCount = tbody.children.length;
        for (var x = filasCount - 1; x >= 0; x--) {
            tbody.removeChild(tbody.children[x]);
        }
    }
    SegundoParcial.quitarFilas = quitarFilas;
    function crearFila(empleado) {
        var tr = document.createElement('tr');
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
            if (accion == "Modificar") {
                Boton.innerText = 'Modificar';
            }
            else if (accion == "Eliminar") {
                Boton.innerText = 'Eliminar';
                Boton.classList.add('btnCancelar');
            }
            Boton.addEventListener('click', crearFormulario);
            td.appendChild(Boton);
            tr.appendChild(td);
        });
        tr.id = 'tableRow';
        return tr;
    }
    SegundoParcial.crearFila = crearFila;
    //el this es el input checkbox
    function mostrarColumnas() {
        var colName = this.id.split("-")[1];
        //Interpolación
        var campos = document.getElementsByClassName("col-" + colName);
        for (var _i = 0, campos_1 = campos; _i < campos_1.length; _i++) {
            var campo = campos_1[_i];
            //Expresion ternaria
            campo.style.display = this.checked ? "" : "none";
        }
    }
    SegundoParcial.mostrarColumnas = mostrarColumnas;
    function obtenerValorSelect() {
        var selectHTML = document.getElementById('filtro');
        var index;
        index = selectHTML.selectedIndex;
        var selectedValue = selectHTML.options[index].value;
        if (selectedValue == "ninguno") {
            return -1;
        }
        else {
            return sexo[selectedValue];
        }
    }
    function filtrar() {
        var listaFiltrada = obtenerListaFiltrada();
        quitarFilas();
        mostrarTablaFiltrada(listaFiltrada);
    }
    SegundoParcial.filtrar = filtrar;
    function obtenerListaFiltrada() {
        var valorSeleccionado = obtenerValorSelect();
        var listaFiltrada;
        if (valorSeleccionado == -1) {
            listaFiltrada = empleadosList;
        }
        else {
            listaFiltrada = obtenerListaFiltradaPorSexo(valorSeleccionado);
        }
        return listaFiltrada;
    }
    function obtenerListaFiltradaPorSexo(valorSeleccionado) {
        var listaFiltrada = empleadosList.filter(function (cliente) {
            if (cliente.sexo === valorSeleccionado) {
                return true;
            }
            else {
                return false;
            }
        });
        return listaFiltrada;
    }
    SegundoParcial.obtenerListaFiltradaPorSexo = obtenerListaFiltradaPorSexo;
    function calcularPromedio() {
        return new Promise(function (resolve, reject) {
            // var lista= <HTMLInputElement>document.getElementById('bodyTabla');
            var lista = obtenerListaFiltrada();
            // var resultado = function () {
            //hacer el acumulado dividido el total
            var edadPromedio = lista.reduce(function (acumulado, cliente) {
                return acumulado += cliente.edad;
            }, 0) / lista.length;
            resolve(edadPromedio);
        }).then(function (response) {
            var input = document.getElementById('typeTextPromedio');
            input.value = response;
        });
    }
    SegundoParcial.calcularPromedio = calcularPromedio;
    //Buscar el max id, sumarle 1 y retornarlo
    function devuelveId() {
        var MaxId = empleadosList.reduce(function (previous, current) {
            if (previous < current.id) {
                return current.id;
            }
            else {
                return previous;
            }
        }, 0);
        return MaxId + 1;
    }
    SegundoParcial.devuelveId = devuelveId;
    // function consultarFormExistente()
    // {
    //     document.body.children.forEach(hijos => {
    //         if(hijos.className == 'frm')
    //         {
    //             return 0;
    //         }
    //     });
    // }
    function crearFormulario() {
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
                tdInput.appendChild(crearInputText(true));
            }
            else if (atributos[i] == 'edad') {
                tdInput.appendChild(crearInputNumber());
            }
            else if (atributos[i] == 'horario') {
                tdInput.appendChild(crearSelect());
            }
            else {
                tdInput.appendChild(crearInputText());
            }
            tr.appendChild(tdInput);
            tabla.appendChild(tr);
        }
        agregarBotonesRow(tabla, this);
        agregarBotonEnviar(tabla, this);
        formulario.appendChild(tabla);
        document.body.appendChild(formulario);
    }
    function crearInputText(isId) {
        var input;
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'inputForm';
        if (isId) {
            input.disabled = true;
        }
        return input;
    }
    function crearInputNumber() {
        var input;
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'inputForm';
        return input;
    }
    function crearSelect() {
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
    }
    function agregarBotonEnviar(tabla, caller) {
        if (caller.id == 'btnAlta') {
            var tr = document.createElement('tr');
            var Enviar = document.createElement('button');
            Enviar.innerText = 'Guardar';
            Enviar.type = 'button';
            Enviar.classList.add('btnForm');
            Enviar.classList.add('btnGuardar');
            Enviar.addEventListener('click', altaPersona);
            var td = document.createElement('td');
            td.appendChild(Enviar);
            tr.appendChild(td);
            agregarBotonCancelar(tabla, tr);
            tabla.appendChild(tr);
        }
    }
    function agregarBotonesRow(tabla, caller) {
        if (caller.id == 'tableRow') {
            var botones = ["Eliminar", "Modificar", "Cancelar"];
            var tr = document.createElement('tr');
            for (var i = 0; i < botones.length; i++) {
                var boton = document.createElement('button');
                boton.innerText = botones[i];
                boton.type = 'button';
                boton.className = 'btnForm';
                if (i == 0) {
                    boton.addEventListener('click', eliminacionPersona);
                }
                else if (i == 1) {
                    boton.addEventListener('click', modificacionPersona);
                }
                else {
                    boton.addEventListener('click', cerrarForm);
                }
                var td = document.createElement('td');
                td.appendChild(boton);
                tr.appendChild(td);
            }
            tabla.appendChild(tr);
        }
    }
    function agregarBotonCancelar(tabla, tr) {
        var Cancelar = document.createElement('button');
        Cancelar.innerText = 'Cancelar';
        Cancelar.type = 'button';
        Cancelar.classList.add('btnForm');
        Cancelar.classList.add('btnCancelar');
        Cancelar.addEventListener('click', cerrarForm);
        var td = document.createElement('td');
        td.appendChild(Cancelar);
        tr.appendChild(td);
    }
    function altaPersona() {
        var inputs = document.getElementsByClassName('inputForm');
        var id = devuelveId();
        var nuevaPersona = new Cliente(id, inputs[1].value, inputs[2].value, inputs[3].value, parseInt(inputs[4].value));
        empleadosList.push(nuevaPersona);
        actualizarTabla(nuevaPersona);
        removerObjetos();
    }
    function cerrarForm() {
        document.body.removeChild(document.getElementsByClassName('contenedor')[0]);
    }
    function removerObjetos() {
        cerrarForm();
        // document.body.removeChild(document.getElementById('tablaLista'));    
    }
    function eliminacionPersona() {
        var inputs = document.getElementsByClassName('inputForm');
        if (confirm("¿Desea eliminar a " + inputs[1].value + ", " + inputs[2].value + "?")) {
            bajaPersona(inputs[0].value);
            removerObjetos();
        }
    }
    function bajaPersona(id) {
        empleadosList.splice(id, 1);
        quitarFilas();
        mostrarTablaFiltrada(empleadosList);
    }
    function modificacionPersona(persona) {
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
        removerObjetos();
    }
})(SegundoParcial || (SegundoParcial = {}));

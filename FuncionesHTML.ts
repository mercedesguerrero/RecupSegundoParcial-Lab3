namespace SegundoParcial{

    var empleadosList:Array<Empleado> = new Array<Empleado>();
    var atributos:string[] = ['nombre','apellido', 'edad', 'legajo', 'horario'];
    var acciones:string[] = ['modificar','eliminar'];
    var horarios:string[] = ['8-17','9-18','10-19'];


    window.onload= function inicializar(){
        setTimeout(function(){
        // var btn= document.getElementById("btnEnviar");
        // btn.onclick= login;
        document.getElementById('loadingDiv').style.display = 'none';

        var empleado1:Empleado = new Empleado("Mercedes", "Juarez", 35, 1, "9-18");
        var empleado2:Empleado = new Empleado("Leandro", "Holmberg", 28, 2, "8-17");
        empleadosList.push(empleado1);
        empleadosList.push(empleado2);

        // var btnAlta= 
        document.getElementById('btnAlta').addEventListener('click',crearFormulario);
        document.getElementById('filtro').addEventListener('change',filtrar);
        document.getElementById('btnPromedio').addEventListener('click',calcularPromedio);
        document.getElementById('btnBorrarDatos').addEventListener('click',quitarFilas);

        const checkboxes= document.getElementsByClassName("check-col");
        for(let checkbox of checkboxes){
            checkbox.addEventListener('change', mostrarColumnas);
        }

        crearTabla();
        
        },2000);
    };

    export function mostrarTablaFiltrada(clientesFiltrados:Array<Cliente>) {

        clientesFiltrados.forEach(cliente=>{

            //cliente.id.toString(), cliente.nombre, cliente.apellido, cliente.edad.toString(), cliente.sexo

            actualizarTabla(cliente);
        });

    }

    export function crearTabla() 
    {
        var tabla = document.createElement('table');
        tabla.id = "tablaLista";
        tabla = crearHeader(tabla);
        document.body.appendChild(tabla);
    }

    export function crearHeader(tabla)
    {
        var header = document.createElement('tr');
        var theader = document.createElement('thead');
        theader.id = 'theader';

        atributos.forEach(atributo => {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(atributo));
            header.appendChild(th);
            //th.classList.add('col-'+atributo);
            // if(atributo=== "id"){
            //     th.style.display = 'none';
            // }
        });

        acciones.forEach(accion => {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(accion));
            header.appendChild(th);
        });
        
        theader.appendChild(header);
        tabla.appendChild(theader);
        return crearBody(tabla);
    }

    export function crearBody(tabla)
    {
        var tbody = document.createElement('tbody');
        tbody.id = 'bodyTabla';

        empleadosList.forEach(empleado => {

            var tr= crearFila(empleado);

            tbody.appendChild(tr);     
        });
        
        tabla.appendChild(tbody);
        return tabla;
    }

    export function actualizarTabla(empleado){

        var tbody= document.getElementById('bodyTabla');
        let fila= crearFila(empleado);

        tbody.appendChild(fila);
    }

    export function quitarFilas(){

        var tbody= document.getElementById('bodyTabla');
        let filasCount = tbody.children.length;

        for (let x=filasCount-1; x>=0; x--) {
            tbody.removeChild(tbody.children[x]);
        }
    }

    export function crearFila(empleado)
    {
        var tr = document.createElement('tr');

        atributos.forEach(atributo => {
            var td = document.createElement('td');
            td.classList.add('col-'+atributo);

            td.appendChild(document.createTextNode(empleado[atributo]));
        
            tr.appendChild(td);
        });

        acciones.forEach(accion => {
            var td = document.createElement('td');
            //td.classList.add('col-'+accion);

            var Boton = document.createElement('button');
            Boton.type = 'button';
            Boton.classList.add('btnForm');

            if(accion== "Modificar"){

                Boton.innerText = 'Modificar';

            }else if(accion== "Eliminar"){
                
                Boton.innerText = 'Eliminar';
                Boton.classList.add('btnCancelar');
            }

            Boton.addEventListener('click',crearFormulario);

            td.appendChild(Boton);
            tr.appendChild(td);
        });
        
        tr.id = 'tableRow';
        
        return tr;
    }

    //el this es el input checkbox
    export function mostrarColumnas(this: HTMLInputElement) {

        const colName: string= this.id.split("-")[1]; 

        //Interpolación
        const campos= document.getElementsByClassName(`col-${colName}`);

        for(let campo of campos){
            //Expresion ternaria
            campo.style.display = this.checked ? "" : "none";
        }
        
    }

    function obtenerValorSelect()
    {
        
        var selectHTML = document.getElementById('filtro');
        var index;

        index = selectHTML.selectedIndex;
        var selectedValue = selectHTML.options[index].value;

        if(selectedValue== "ninguno"){
            return -1;
        }else{

            return sexo[selectedValue];
        }
    }

    export function filtrar(){

        var listaFiltrada = obtenerListaFiltrada();
        
        quitarFilas();
        mostrarTablaFiltrada(listaFiltrada);
        
    }

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

    export function obtenerListaFiltradaPorSexo(valorSeleccionado){

        var listaFiltrada:Array<Cliente> = empleadosList.filter(function(cliente){

            if(cliente.sexo === valorSeleccionado){
                return true;
            }else{
                return false;
            }
        });

        return listaFiltrada;
    }

    export function calcularPromedio(){

        return new Promise(function(resolve, reject){

            // var lista= <HTMLInputElement>document.getElementById('bodyTabla');
            var lista = obtenerListaFiltrada();

            // var resultado = function () {
            //hacer el acumulado dividido el total
        
            var edadPromedio= lista.reduce(function(acumulado, cliente){
            
                return acumulado+= cliente.edad;

            },0)/lista.length;

            resolve(edadPromedio);
        }).then(function(response){

            var input= <HTMLInputElement>document.getElementById('typeTextPromedio');

            input.value= response;

        });
    }

    //Buscar el max id, sumarle 1 y retornarlo
    export function devuelveId() {

        var MaxId = empleadosList.reduce(function(previous, current){

            if(previous< current.id){
                return current.id;
            }else{
                return previous;
            }

        },0);

        return MaxId +1;
        
    }

    // function consultarFormExistente()
    // {
    //     document.body.children.forEach(hijos => {

    //         if(hijos.className == 'frm')
    //         {
    //             return 0;
    //         }
            
    //     });
    // }

    function crearFormulario()
    {
        var formulario = document.createElement('form');
        formulario.className = 'contenedor';
        var tabla = document.createElement('table');
        var i;
        for(i = 0; i< atributos.length; i++)
        {
            var tr = document.createElement('tr');
            var label = document.createElement('label');
            label.className = 'labelForm';
            label.innerText = atributos[i];

            var td = document.createElement('td');
            td.appendChild(label);
            tr.appendChild(td);

            var tdInput = document.createElement('td');

            if(atributos[i]== 'legajo'){

                tdInput.appendChild(crearInputText(true));
                
            }else if(atributos[i]== 'edad'){
                tdInput.appendChild(crearInputNumber());

            }else if(atributos[i]== 'horario'){
                tdInput.appendChild(crearSelect());

            }else{

                tdInput.appendChild(crearInputText());
            }

            tr.appendChild(tdInput);

            tabla.appendChild(tr);
        }
        
        agregarBotonesRow(tabla,this);
        agregarBotonEnviar(tabla,this);
        formulario.appendChild(tabla);
        document.body.appendChild(formulario);
    }

    function crearInputText(isId?)
    {
        var input;
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'inputForm';

        if(isId){
            input.disabled = true;
        }

        return input;
    }

    function crearInputNumber()
    {
        var input;
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'inputForm';

        return input;
    }

    function crearSelect()
    { 
        var horarioSelect = document.createElement('select');
        horarioSelect.className = 'inputForm';
        horarioSelect.id = 'horarioSelect';

        horarios.forEach(horario => {

            var option = document.createElement('option');
                
            option.innerText = horario;
            option.value= horario;
            
            horarioSelect.appendChild(option);
            
        });
        
        return horarioSelect;
    }

    function agregarBotonEnviar(tabla,caller)
    {
        if(caller.id == 'btnAlta')
        {
            var tr = document.createElement('tr');
            var Enviar = document.createElement('button');
            Enviar.innerText = 'Guardar';
            Enviar.type = 'button';
            Enviar.classList.add('btnForm');
            Enviar.classList.add('btnGuardar');
            Enviar.addEventListener('click',altaPersona);
            var td = document.createElement('td');
            td.appendChild(Enviar);
            tr.appendChild(td);
            agregarBotonCancelar(tabla,tr);
            tabla.appendChild(tr);
        }
    }

    function agregarBotonesRow(tabla, caller)
    {
        if(caller.id == 'tableRow')
        {
            var botones = ["Eliminar","Modificar","Cancelar"];
            var tr = document.createElement('tr');

            for(var i = 0 ; i<botones.length;i++)
            {
                var boton = document.createElement('button');
                boton.innerText = botones[i];
                boton.type = 'button';
                boton.className = 'btnForm';
                if(i == 0)
                {
                    boton.addEventListener('click',eliminacionPersona);
                }
                else if(i==1)
                {
                    boton.addEventListener('click',modificacionPersona);
                }
                else
                {
                    boton.addEventListener('click',cerrarForm);
                }
                var td = document.createElement('td');
                td.appendChild(boton);
                tr.appendChild(td);
            }

            tabla.appendChild(tr);
        }
    }

    function agregarBotonCancelar(tabla,tr)
    {
        var Cancelar = document.createElement('button');
        Cancelar.innerText = 'Cancelar';
        Cancelar.type = 'button';
        Cancelar.classList.add('btnForm');
        Cancelar.classList.add('btnCancelar');
        Cancelar.addEventListener('click',cerrarForm);
        var td = document.createElement('td');
        td.appendChild(Cancelar);
        tr.appendChild(td);
    }

    function altaPersona() 
    {
        var inputs = document.getElementsByClassName('inputForm');

        let id= devuelveId();
        
        var nuevaPersona:Cliente = new Cliente(id, inputs[1].value, inputs[2].value, inputs[3].value, parseInt(inputs[4].value));
        
        empleadosList.push(nuevaPersona);

        actualizarTabla(nuevaPersona);
        removerObjetos();    
    }
    
        
    function cerrarForm()
    {
        document.body.removeChild(document.getElementsByClassName('contenedor')[0]);
    }
    
    function removerObjetos()
    {
        cerrarForm();
        // document.body.removeChild(document.getElementById('tablaLista'));    
    }

    function eliminacionPersona() 
    {
        var inputs = document.getElementsByClassName('inputForm');
        if(confirm("¿Desea eliminar a " + inputs[1].value +", " + inputs[2].value+"?"))
        {
            bajaPersona(inputs[0].value);
            removerObjetos();        
        }
    }

    function bajaPersona(id){

        empleadosList.splice(id,1);
        
        quitarFilas();
        mostrarTablaFiltrada(empleadosList);
    }

    function modificacionPersona(persona) 
    {
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

        
    
        
    
        

}
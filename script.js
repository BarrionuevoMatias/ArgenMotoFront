// script.js
// Funcion para mostrar las pestañas
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    const activeButton = [...buttons].find(button => button.innerText.toLowerCase() === tabName);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}


// Manejo del registro de vendedores
document.getElementById('form-vendedores').addEventListener('submit', async (e) => {
    e.preventDefault();

    const vendedor = {
        apellido: document.getElementById('apellido-vendedor').value,
        nombre: document.getElementById('nombre-vendedor').value,
        razonSocial: document.getElementById('razon-social-vendedor').value,
        domicilio: document.getElementById('domicilio-vendedor').value,
        localidad: document.getElementById('localidad-vendedor').value,
        provincia: document.getElementById('provincia-vendedor').value,
        telefono: document.getElementById('telefono-vendedor').value,
        email: document.getElementById('email-vendedor').value,
        legajo: document.getElementById('dni-vendedor').value,
    };
    try{
        const resultado = await registrarVendedor(vendedor);
        alert('Vendedor actualizado exitosamente');
    
    }
    catch (error) {
        console.error('Error al registras al vendedor:', error);
        alert('No se pudo registras al vendedor');
    }
     // Limpiar los campos del formulario
     document.getElementById('apellido-vendedor').value = '';
     document.getElementById('nombre-vendedor').value = '';
     document.getElementById('razon-social-vendedor').value = '';
     document.getElementById('domicilio-vendedor').value = '';
     document.getElementById('localidad-vendedor').value = '';
     document.getElementById('provincia-vendedor').value = '';
     document.getElementById('telefono-vendedor').value = '';
     document.getElementById('email-vendedor').value = '';
     document.getElementById('dni-vendedor').value = '';

    cargarVendedores();
    console.log(resultado);
    
});

//Funcion para buscar un vendedor
document.getElementById('buscar-vendedor').addEventListener('submit', async (e) => {
    e.preventDefault();

    const legajo = document.getElementById('legajo-vendedor-buscar').value;
    const vendedor = await buscarVendedor(legajo); 

    if (vendedor) {
        // Inyectar informacion del vendedor en el modal
        const vendedorInfo = document.getElementById('vendedor-info');
        vendedorInfo.innerHTML = `
            <p><strong>Apellido:</strong> ${vendedor.apellido}</p>
            <p><strong>Nombre:</strong> ${vendedor.nombre}</p>
            <p><strong>Razón Social:</strong> ${vendedor.razonSocial}</p>
            <p><strong>Domicilio:</strong> ${vendedor.domicilio}</p>
            <p><strong>Localidad:</strong> ${vendedor.localidad}</p>
            <p><strong>Provincia:</strong> ${vendedor.provincia}</p>
            <p><strong>Teléfono:</strong> ${vendedor.telefono}</p>
            <p><strong>Email:</strong> ${vendedor.email}</p>
            <p><strong>Legajo:</strong> ${vendedor.legajo}</p>
        `;
        
        // Mostrar el modal
        document.getElementById('modal-vendedor').style.display = 'block';
    } else {
        alert('Vendedor no encontrado');
    }
});

// Funcion para cerrar el modal
function cerrarModal(){
    const modalVendedor = document.getElementById('modal-vendedor');
    modalVendedor.style.display = "none"; // Cerrar el modal de vendedor
    document.getElementById('legajo-vendedor-buscar').value='';

    const modalCliente = document.getElementById('modal-cliente');
    modalCliente.style.display = "none"; // Cerrar el modal de cliente
    document.getElementById('cuit-cliente-buscar').value='';
    
}

/*
// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modalVendedor = document.getElementById('modal-vendedor');
    
    // Cerrar el modal del vendedor si se hace click fuera de el
    if (event.target == modalVendedor) {
        modalVendedor.style.display = "none";
    }
};
*/

async function cargarVendedores(){
    const vendedores= await listarVendedores();
    const tbody = document.getElementById('vendedores-listado');
        tbody.innerHTML = ''; 

        vendedores.forEach(vendedor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vendedor.legajo}</td>
                <td>${vendedor.apellido}</td>
                <td>${vendedor.nombre}</td>
                <td>${vendedor.telefono}</td>
                <td>${vendedor.email}</td>
                
            `;
            tbody.appendChild(row);
        });
}

async function eliminarVendedorScript(){
    
    const legajo = document.getElementById('legajo-vendedor-buscar').value; 
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el vendedor con legajo: ${legajo}?`);
    if(confirmacion){
        await eliminarVendedor(legajo);
        alert('Vendedor eliminado exitosamente');
            cerrarModal(); 
            cargarVendedores(); 
    }
}

async function mostrarFormularioModificarVendedor() {
    const legajo = document.getElementById('legajo-vendedor-buscar').value;
    
    try {
        
        const vendedor = await buscarVendedor(legajo);
        
        if (!vendedor) {
            alert('Vendedor no encontrado');
            return;
        }

        
        document.getElementById('vendedor-info').innerHTML = `
            <form id="form-modificar-vendedor">
                <div class="form-group">
                    <label for="apellido-vendedor-edit">Apellido</label>
                    <input type="text" id="apellido-vendedor-edit" name="apellido-vendedor" value="${vendedor.apellido}" required>
                </div>
                <div class="form-group">
                    <label for="nombre-vendedor-edit">Nombre</label>
                    <input type="text" id="nombre-vendedor-edit" name="nombre-vendedor" value="${vendedor.nombre}" required>
                </div>
                <div class="form-group">
                    <label for="razon-social-vendedor-edit">Razón Social</label>
                    <input type="text" id="razon-social-vendedor-edit" name="razon-social-vendedor" value="${vendedor.razonSocial}" required>
                </div>
                <div class="form-group">
                    <label for="domicilio-vendedor-edit">Domicilio</label>
                    <input type="text" id="domicilio-vendedor-edit" name="domicilio-vendedor" value="${vendedor.domicilio}" required>
                </div>
                <div class="form-group">
                    <label for="localidad-vendedor-edit">Localidad</label>
                    <input type="text" id="localidad-vendedor-edit" name="localidad-vendedor" value="${vendedor.localidad}" required>
                </div>
                <div class="form-group">
                    <label for="provincia-vendedor-edit">Provincia</label>
                    <input type="text" id="provincia-vendedor-edit" name="provincia-vendedor" value="${vendedor.provincia}" required>
                </div>
                <div class="form-group">
                    <label for="telefono-vendedor-edit">Teléfono</label>
                    <input type="tel" id="telefono-vendedor-edit" name="telefono-vendedor" value="${vendedor.telefono}" required>
                </div>
                <div class="form-group">
                    <label for="email-vendedor-edit">Email</label>
                    <input type="email" id="email-vendedor-edit" name="email-vendedor" value="${vendedor.email}" required>
                </div>
                <div class="form-actions">
                    <button type="submit">Guardar Cambios</button>
                </div>
            </form>
        `;

        document.getElementById('modal-title').textContent = 'Modificar Vendedor';

        // Remover los botones anteriores (Modificar y Eliminar)
        document.getElementById('modal-actions').innerHTML = '';

        
        document.getElementById('form-modificar-vendedor').addEventListener('submit', function(event) {
            event.preventDefault(); 
            guardarCambiosVendedor(vendedor.legajo);
        });

    } catch (error) {
        console.error('Error al buscar el vendedor:', error);
        alert('Hubo un error al buscar el vendedor');
    }
}



async function guardarCambiosVendedor(legajo) {
    // Obtener los nuevos datos del formulario
    const vendedorData = {
        apellido: document.getElementById('apellido-vendedor-edit').value,
        nombre: document.getElementById('nombre-vendedor-edit').value,
        razonSocial: document.getElementById('razon-social-vendedor-edit').value,
        domicilio: document.getElementById('domicilio-vendedor-edit').value,
        localidad: document.getElementById('localidad-vendedor-edit').value,
        provincia: document.getElementById('provincia-vendedor-edit').value,
        telefono: document.getElementById('telefono-vendedor-edit').value,
        email: document.getElementById('email-vendedor-edit').value,
        legajo: legajo
    };
    console.log(vendedorData);
    try {
        // Usar la función modificarVendedor que ya tienes implementada
        const updatedVendedor = await modificarVendedor(legajo, vendedorData);

        // Restaurar el contenido original del modal con los datos actualizados
        document.getElementById('vendedor-info').innerHTML = `
            <p><strong>Apellido:</strong> <span id="vendedor-apellido">${updatedVendedor.apellido}</span></p>
            <p><strong>Nombre:</strong> <span id="vendedor-nombre">${updatedVendedor.nombre}</span></p>
            <p><strong>Razón Social:</strong> <span id="vendedor-razon">${updatedVendedor.razonSocial}</span></p>
            <p><strong>Domicilio:</strong> <span id="vendedor-domicilio">${updatedVendedor.domicilio}</span></p>
            <p><strong>Localidad:</strong> <span id="vendedor-localidad">${updatedVendedor.localidad}</span></p>
            <p><strong>Provincia:</strong> <span id="vendedor-provincia">${updatedVendedor.provincia}</span></p>
            <p><strong>Teléfono:</strong> <span id="vendedor-telefono">${updatedVendedor.telefono}</span></p>
            <p><strong>Email:</strong> <span id="vendedor-email">${updatedVendedor.email}</span></p>
            <p><strong>Legajo:</strong> <span id="vendedor-legajo">${updatedVendedor.legajo}</span></p>
        `;

        // Restaurar el título y botones originales
        document.getElementById('modal-title').textContent = 'Información del Vendedor';
        document.getElementById('modal-actions').innerHTML = `
            <button id="btn-modificar" onclick="mostrarFormularioModificar()">Modificar</button>
            <button id="btn-eliminar" onclick="eliminarVendedorScript()">Eliminar</button>
        `;

        alert('Vendedor actualizado exitosamente');
    } catch (error) {
        console.error('Error al modificar el vendedor:', error);
        alert('No se pudo modificar el vendedor');
    }
}





///////////////////// Clientes ///////////////////


async function cargarClientes(){
    const clientes= await listarClientes();
    const tbody = document.getElementById('clientes-listado');
        tbody.innerHTML = ''; 
        console.log(clientes);
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.cuit}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.email}</td>
                
            `;
            tbody.appendChild(row);
        });
}

// Manejo del registro de vendedores
document.getElementById('form-clientes').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cliente = {
        apellido: document.getElementById('apellido-cliente').value,
        nombre: document.getElementById('nombre-cliente').value,
        razonSocial: document.getElementById('razon-social-cliente').value,
        domicilio: document.getElementById('domicilio-cliente').value,
        localidad: document.getElementById('localidad-cliente').value,
        provincia: document.getElementById('provincia-cliente').value,
        telefono: document.getElementById('telefono-cliente').value,
        email: document.getElementById('email-cliente').value,
        cuit: document.getElementById('cuit-cliente').value,
    };
    try{
        const resultado = await registrarCliente(cliente);
        alert('cliente registrado exitosamente');
    
    }
    catch (error) {
        console.error('Error al registras al cliente:', error);
        alert('No se pudo registrar al cliente');
    }
     // Limpiar los campos del formulario
     document.getElementById('apellido-cliente').value = '';
     document.getElementById('nombre-cliente').value = '';
     document.getElementById('razon-social-cliente').value = '';
     document.getElementById('domicilio-cliente').value = '';
     document.getElementById('localidad-cliente').value = '';
     document.getElementById('provincia-cliente').value = '';
     document.getElementById('telefono-cliente').value = '';
     document.getElementById('email-cliente').value = '';
     document.getElementById('cuit-cliente').value = '';

    cargarClientes();
    console.log(resultado);
    
});

//Funcion para buscar un vendedor
document.getElementById('buscar-cliente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cuit = document.getElementById('cuit-cliente-buscar').value;
    const cliente = await buscarCliente(cuit); 

    if (cliente) {
        // Inyectar informacion del vendedor en el modal
        const clienteInfo = document.getElementById('cliente-info');
        clienteInfo.innerHTML = `
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Razón Social:</strong> ${cliente.razonSocial}</p>
            <p><strong>Domicilio:</strong> ${cliente.domicilio}</p>
            <p><strong>Localidad:</strong> ${cliente.localidad}</p>
            <p><strong>Provincia:</strong> ${cliente.provincia}</p>
            <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
            <p><strong>Email:</strong> ${cliente.email}</p>
            <p><strong>Legajo:</strong> ${cliente.legajo}</p>
        `;
        
        // Mostrar el modal
        document.getElementById('modal-cliente').style.display = 'block';
    } else {
        alert('cliente no encontrado');
    }
});

async function eliminarClienteScript(){
    
    const cuit = document.getElementById('cuit-cliente-buscar').value; 
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al cliente con cuit: ${cuit}?`);
    if(confirmacion){
        await eliminarCliente(cuit);
        alert('Cliente eliminado exitosamente');
            cerrarModal(); 
            cargarClientes(); 
    }
}


async function mostrarFormularioModificarCliente() {
    const cuit = document.getElementById('cuit-cliente-buscar').value;
    
    try {
        
        const cliente = await buscarCliente(cuit);
        
        if (!cliente) {
            alert('cliente no encontrado');
            return;
        }

        
        document.getElementById('cliente-info').innerHTML = `
            <form id="form-modificar-cliente">
                <div class="form-group">
                    <label for="apellido-cliente-edit">Apellido</label>
                    <input type="text" id="apellido-cliente-edit" name="apellido-cliente" value="${cliente.apellido}" required>
                </div>
                <div class="form-group">
                    <label for="nombre-cliente-edit">Nombre</label>
                    <input type="text" id="nombre-cliente-edit" name="nombre-cliente" value="${cliente.nombre}" required>
                </div>
                <div class="form-group">
                    <label for="razon-social-cliente-edit">Razón Social</label>
                    <input type="text" id="razon-social-cliente-edit" name="razon-social-cliente" value="${cliente.razonSocial}" required>
                </div>
                <div class="form-group">
                    <label for="domicilio-cliente-edit">Domicilio</label>
                    <input type="text" id="domicilio-cliente-edit" name="domicilio-cliente" value="${cliente.domicilio}" required>
                </div>
                <div class="form-group">
                    <label for="localidad-cliente-edit">Localidad</label>
                    <input type="text" id="localidad-cliente-edit" name="localidad-cliente" value="${cliente.localidad}" required>
                </div>
                <div class="form-group">
                    <label for="provincia-cliente-edit">Provincia</label>
                    <input type="text" id="provincia-cliente-edit" name="provincia-cliente" value="${cliente.provincia}" required>
                </div>
                <div class="form-group">
                    <label for="telefono-cliente-edit">Teléfono</label>
                    <input type="tel" id="telefono-cliente-edit" name="telefono-cliente" value="${cliente.telefono}" required>
                </div>
                <div class="form-group">
                    <label for="email-cliente-edit">Email</label>
                    <input type="email" id="email-cliente-edit" name="email-cliente" value="${cliente.email}" required>
                </div>
                <div class="form-actions">
                    <button type="submit">Guardar Cambios</button>
                </div>
            </form>
        `;

        document.getElementById('modal-title').textContent = 'Modificar Cliente';

        // Remover los botones anteriores (Modificar y Eliminar)
        document.getElementById('modal-actions').innerHTML = '';

        
        document.getElementById('cuit-cliente-buscar').addEventListener('submit', function(event) {
            event.preventDefault(); 
            guardarCambiosCliente(cliente.cuit);
        });

    } catch (error) {
        console.error('Error al buscar al cliente:', error);
        alert('Hubo un error al buscar al cliente');
    }
}

async function guardarCambiosCliente(cuit) {
    // Obtener los nuevos datos del formulario
    const clienteData = {
        apellido: document.getElementById('apellido-cliente-edit').value,
        nombre: document.getElementById('nombre-cliente-edit').value,
        razonSocial: document.getElementById('razon-social-cliente-edit').value,
        domicilio: document.getElementById('domicilio-cliente-edit').value,
        localidad: document.getElementById('localidad-cliente-edit').value,
        provincia: document.getElementById('provincia-cliente-edit').value,
        telefono: document.getElementById('telefono-cliente-edit').value,
        email: document.getElementById('email-cliente-edit').value,
        cuit: cuit
    };
    console.log(clienteData);
    try {
        // Usar la función modificarVendedor que ya tienes implementada
        const updatedCliente = await modificarCliente(cuit, clienteData);

        // Restaurar el contenido original del modal con los datos actualizados
        document.getElementById('cliente-info').innerHTML = `
            <p><strong>Apellido:</strong> <span id="cliente-apellido">${updatedCliente.apellido}</span></p>
            <p><strong>Nombre:</strong> <span id="cliente-nombre">${updatedCliente.nombre}</span></p>
            <p><strong>Razón Social:</strong> <span id="cliente-razon">${updatedCliente.razonSocial}</span></p>
            <p><strong>Domicilio:</strong> <span id="cliente-domicilio">${updatedCliente.domicilio}</span></p>
            <p><strong>Localidad:</strong> <span id="cliente-localidad">${updatedCliente.localidad}</span></p>
            <p><strong>Provincia:</strong> <span id="cliente-provincia">${updatedCliente.provincia}</span></p>
            <p><strong>Teléfono:</strong> <span id="cliente-telefono">${updatedCliente.telefono}</span></p>
            <p><strong>Email:</strong> <span id="cliente-email">${updatedCliente.email}</span></p>
            <p><strong>Legajo:</strong> <span id="cliente-legajo">${updatedCliente.cuit}</span></p>
        `;

        // Restaurar el título y botones originales
        document.getElementById('modal-title').textContent = 'Información del cliente';
        document.getElementById('modal-actions').innerHTML = `
            <button id="btn-modificar" onclick="mostrarFormularioModificar()">Modificar</button>
            <button id="btn-eliminar" onclick="eliminarclienteScript()">Eliminar</button>
        `;

        alert('cliente actualizado exitosamente');
    } catch (error) {
        console.error('Error al modificar al cliente:', error);
        alert('No se pudo modificar al cliente');
    }
}













window.onload = () => {
    
    cargarVendedores();
    cargarClientes()
    
};


/////////////////////////////// Factura ///////////////////////

// Validar cliente mediante CUIT
function validarCliente() {
    const cuit = document.getElementById('cliente-factura').value;
    // Implementar logica de validacion
    console.log('Validando cliente con CUIT:', cuit);
}

// Validar vendedor mediante Legajo
function validarVendedor() {
    const legajo = document.getElementById('vendedor-factura').value;
    // Implementar logica de validacion
    console.log('Validando vendedor con Legajo:', legajo);
}

// Validar articulo por id
function validarArticulo(input) {
    const articuloId = input.value;
    // Implementar logica de validacion
    console.log('Validando artículo con ID:', articuloId);
}

//agregar otro artículo en la factura
function agregarArticulo() {
    const articulosList = document.getElementById('articulos-list');
    const nuevoArticulo = document.createElement('div');
    nuevoArticulo.classList.add('articulo');
    nuevoArticulo.innerHTML = `
        <label for="articulo-id">Artículo (ID)</label>
        <input type="text" name="articulo-id" class="articulo-id" required onblur="validarArticulo(this)">
        <label for="monto-unidad">Monto por Unidad</label>
        <input type="number" name="monto-unidad" class="monto-unidad" required>
    `;
    articulosList.appendChild(nuevoArticulo);
}


function mostrarModalStock() {
    document.getElementById('modal-stock').style.display = 'block';
    cargarStock(); 
}

function cerrarModalStock() {
    document.getElementById('modal-stock').style.display = 'none';
}

// buscar articulos por marca en el modal de stock
function buscarPorMarca() {
    const marca = document.getElementById('buscador-marca').value.toLowerCase();
    const stockListado = document.getElementById('stock-listado');
    // Filtrar y mostrar artículos por marca (a implementar)
    console.log('Buscando artículos con marca:', marca);
}

// Cargar stock en el modal (simulado)
function cargarStock() {
    const stockListado = document.getElementById('stock-listado');
    stockListado.innerHTML = `
        <p>Artículo 1 - Marca A - Stock: 10</p>
        <p>Artículo 2 - Marca B - Stock: 5</p>
        <p>Artículo 3 - Marca A - Stock: 8</p>
    `;
}

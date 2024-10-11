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

async function mostrarFormularioModificar() {
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

window.onload = () => {
    
    cargarVendedores();
    
};

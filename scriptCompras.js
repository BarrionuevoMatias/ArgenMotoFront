// scriptCompras.js
//----------------------------------------- GESTION PROVEEDORES---------------------------------------------------------------
// Funcion para mostrar las pestañas
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    const activeButton = [...buttons].find(button =>
        button.innerText.toLowerCase() === tabName);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}
// Manejo del registro de proveedores
document.getElementById('form-proveedores').addEventListener('submit',
    async (e) => {
        e.preventDefault();
        const proveedor = {
            apellido: document.getElementById('apellido-proveedor').value,
            nombre: document.getElementById('nombre-proveedor').value,
            telefono: document.getElementById('telefono-proveedor').value,
            provincia:
                document.getElementById('provincia-proveedor').value,
            localidad:
                document.getElementById('localidad-proveedor').value,
            domicilio:
                document.getElementById('domicilio-proveedor').value,
            email: document.getElementById('email-proveedor').value,
            razonSocial:
                document.getElementById('razon-social-proveedor').value,
            CUIT: document.getElementById('cuit-proveedor').value,
            categoria:
                document.getElementById('categoria-proveedor').value,
        };
        try {
            const resultado = await registrarProveedor(proveedor);
            alert('Proveedor actualizado exitosamente');
        }
        catch (error) {
            console.error('Error al registrar el Proveedor:', error);
            alert('No se pudo registrar al proveedor');
        }
        // Limpiar los campos del formulario
        document.getElementById('apellido-proveedor').value = '';
        document.getElementById('nombre-proveedor').value = '';
        document.getElementById('telefono-proveedor').value = '';
        document.getElementById('provincia-proveedor').value = '';
        document.getElementById('localidad-proveedor').value = '';
        document.getElementById('domicilio-proveedor').value = '';
        document.getElementById('email-proveedor').value = '';
        document.getElementById('razon-social-proveedor').value = '';
        document.getElementById('cuit-proveedor').value = '';
        document.getElementById('categoria-proveedor').value = '';
        cargarProveedores();
        console.log(resultado);
    });
async function cargarProveedores() {
    const proveedores = await listarProveedores();
    const tbody = document.getElementById('proveedores-listado');
    tbody.innerHTML = '';
    proveedores.forEach(proveedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
<td>${proveedor.id_proveedor}</td>
<td>${proveedor.nombre}</td>
<td>${proveedor.telefono}</td>
<td>${proveedor.email}</td>
`;
        tbody.appendChild(row);
    });
}
//Función para consultar un proveedor
document.getElementById('buscar-proveedor').addEventListener('submit',
    async (e) => {
        e.preventDefault();
        const id_proveedor = document.getElementById('id-proveedor').value;
        const proveedor = await consultarProveedores(id_proveedor);
        if (proveedor) {
            // Inyectar informacion del proveedor en el modal
            const proveedorInfo =
                document.getElementById('proveedor-info');
            proveedorInfo.innerHTML = `
<p><strong>ID Proveedor:</strong>
${proveedor.id_proveedor}</p>
<p><strong>Apellido:</strong> ${proveedor.apellido}</p>
<p><strong>Nombre:</strong> ${proveedor.nombre}</p>
<p><strong>Teléfono:</strong> ${proveedor.telefono}</p>
<p><strong>Provincia:</strong> ${proveedor.provincia}</p>
<p><strong>Localidad:</strong> ${proveedor.localidad}</p>
<p><strong>Domicilio:</strong> ${proveedor.domicilio}</p>
<p><strong>Email:</strong> ${proveedor.email}</p>
<p><strong>Razón Social:</strong>
${proveedor.razonSocial}</p>
<p><strong>CUIT:</strong> ${proveedor.CUIT}</p>
<p><strong>Categoría:</strong> ${proveedor.categoria}</p>
`;
            // Mostrar el modal del proveedor
            document.getElementById('modal-proveedor').style.display =
                'block';
        } else {
            alert('Proveedor no encontrado');
            document.getElementById('id-proveedor').value = '';
        }
    });
// Cerrar ventana modal de proveedores
function cerrarModalProv() {
    const modalProveedor = document.getElementById('modal-proveedor');
    modalProveedor.style.display = "none";
    document.getElementById('id-proveedor').value = '';
}
// Función para eliminar los proveedores
async function anularProveedorScript() {
    const id_proveedor = document.getElementById('id-proveedor').value;
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar
el proveedor con ID: ${id_proveedor}?`);
    if (confirmacion) {
        await anularProveedores(id_proveedor);
        alert('Proveedor eliminado exitosamente');
        cerrarModalProv();
        cargarProveedores();
    }
}
// Función para modificar los datos del proveedor. Se muestra de vuelta el formulario para hacer las modificaciones necesarias.
async function mostrarFormularioModificar() {
    const id_proveedor = document.getElementById('id-proveedor').value;
    try {
        const proveedor = await consultarProveedores(id_proveedor);
        if (!proveedor) {
            alert('Proveedor no encontrado'); // Esto me devuelve al querer modificar Proveedor
            return;
        }
        document.getElementById('proveedor-info').innerHTML = `
<form id="form-modificar-proveedor">
<div class="form-group">
<label
for="apellido-proveedor-edit">Apellido</label>
<input type="text" id="apellido-proveedor-edit"
name="apellido-proveedor-edit" value="${proveedor.apellido}" required>
</div>
<div class="form-group">
<label for="nombre-proveedor-edit">Nombre</label>
<input type="text" id="nombre-proveedor-edit"
name="nombre-proveedor-edit" value="${proveedor.nombre}" required>
</div>
<div class="form-group">
<label
for="telefono-proveedor-edit">Teléfono</label>
<input type="tel" id="telefono-proveedor-edit"
name="telefono-proveedor-edit" value="${proveedor.telefono}" required>
</div>
<div class="form-group">
<label
for="provincia-proveedor-edit">Provincia</label>
<select name="Provincia"
id="provincia-proveedor-edit" name="provincia-proveedor-edit"
value="${proveedor.provincia}" required>
<option selected>
<option>Buenos Aires</option>
<option>Catamarca</option>
<option>Chaco</option>
<option>Chubut</option>
<option>Ciudad Autónoma de Buenos
Aires</option>
<option>Córdoba</option>
<option>Corrientes</option>
<option>Entre Ríos</option>
<option>Formosa</option>
<option>Jujuy</option>
<option>La Pampa</option>
<option>La Rioja</option>
<option>Mendoza</option>
<option>Misiones</option>
<option>Neuquén</option>
<option>Río Negro</option>
<option>Salta</option>
<option>San Juan</option>
<option>San Luis</option>
<option>Santa Cruz</option>
<option>Santa Fe</option>
<option>Santiago del Estero</option>
<option>Tierra del Fuego</option>
<option>Tucumán</option>
</option>
</select>
</div>
<div class="form-group">
<label
for="localidad-proveedor-edit">Localidad</label>
<input type="text" id="localidad-proveedor-edit"
name="localidad-proveedor-edit" value="${proveedor.localidad}"
required>
</div>
<div class="form-group">
<label for="email-proveedor-edit">Domicilio</label>
<input type="text" id="domicilio-proveedor-edit"
name="domicilio-proveedor-edit" value="${proveedor.domicilio}"
required>
</div>
<div class="form-group">
<label for="email-proveedor-edit">Email</label>
<input type="mail" id="email-proveedor-edit"
name="email-proveedor-edit" value="${proveedor.email}" required>
</div>
<div class="form-group">
<label for="razon-social-proveedor-edit">Razón
Social</label>
<input type="text" id="razon-social-proveedor-edit"
name="razon-social-proveedor-edit" value="${proveedor.razonSocial}"
required>
</div>
<div class="form-group">
<label for="cuit-proveedor-edit">CUIT</label>
<input type="text" id="cuit-proveedor-edit"
name="cuit-proveedor-edit" value="${proveedor.CUIT}" required>
</div>
<div class="form-group">
<label for="categoria-proveedor-edit">Email</label>
<input type="text" id="categoria-proveedor-edit"
name="categoria-proveedor-edit" value="${proveedor.categoria}"
required>
</div>
<div class="form-actions">
<button type="submit">Guardar Cambios</button>
</div>
</form>
`;
        document.getElementById('modal-title').textContent = 'ModificarProveedor';
        // Remover los botones anteriores (Modificar y Eliminar)
        document.getElementById('modal-actions').innerHTML = '';
        document.getElementById('form-modificar-proveedor').addEventListener('submit', function (event) {
            event.preventDefault();
            guardarCambiosProveedor(proveedor.id_proveedor);
        });
    } catch (error) {
        console.error('Error al modificar el proveedor:', error);
        alert('Hubo un error al modificar el proveedor');
    }
}
async function guardarCambiosProveedor(id_proveedor) {
    const proveedorData = {
        apellido:
            document.getElementById('apellido-proveedor-edit').value,
        nombre: document.getElementById('nombre-proveedor-edit').value,
        telefono:
            document.getElementById('telefono-proveedor-edit').value,
        provincia:
            document.getElementById('provincia-proveedor-edit').value,
        localidad:
            document.getElementById('localidad-proveedor-edit').value,
        domicilio:
            document.getElementById('domicilio-proveedor-edit').value,
        email: document.getElementById('email-proveedor-edit').value,
        razonSocial:
            document.getElementById('razon-social-proveedor-edit').value,
        CUIT: document.getElementById('cuit-proveedor-edit').value,
        categoria:
            document.getElementById('categoria-proveedor-edit').value,
    };
    console.log(proveedorData);
    try {
        // Usar la función modificarProveedor que ya tienes
        implementada
        const updatedProveedor = await modificarProveedor(id_proveedor,
            proveedorData);
        // Restaurar el contenido original del modal con los datos
        actualizados
        document.getElementById('proveedor-info').innerHTML = `
<p><strong>Apellido:</strong> <span
id="proveedor-apellido">${updatedProveedor.apellido}</span></p>
<p><strong>Nombre:</strong> <span
id="proveedor-nombre">${updatedProveedor.nombre}</span></p>
<p><strong>Teléfono:</strong> <span
id="proveedor-telefono">${updatedProveedor.telefono}</span></p>
<p><strong>Provincia:</strong> <span
id="proveedor-provincia">${updatedProveedor.provincia}</span></p>
<p><strong>Localidad:</strong> <span
id="proveedor-localidad">${updatedProveedor.localidad}</span></p>
<p><strong>Domicilio:</strong> <span
id="proveedor-domicilio">${updatedProveedor.domicilio}</span></p>
<p><strong>Email:</strong> <span
id="proveedor-email">${updatedProveedor.email}</span></p>
<p><strong>Razón Social:</strong> <span
id="proveedor-razon-social">${updatedProveedor.razonSocial}</span></p>
<p><strong>CUIT:</strong> <span
id="proveedor-cuit">${updatedProveedor.CUIT}</span></p>
<p><strong>Categoría:</strong> <span
id="proveedor-categoria">${updatedProveedor.categoria}</span></p>
`;
        // Restaurar el título y botones originales
        document.getElementById('modal-title').textContent =
            'Información del Proveedor';
        document.getElementById('modal-actions').innerHTML = `
<button id="btn-modificar"
onclick="mostrarFormularioModificar()">Modificar</button>
<button id="btn-eliminar"
onclick="anularProveedorScript()">Eliminar</button>
`;
        alert('Proveedor actualizado exitosamente');
    } catch (error) {
        console.error('Error al modificar el proveedor:', error);
        alert('No se pudo modificar el proveedor');
    }
}
window.onload = () => {
    cargarProveedores();
};
//-------------------------------------------- GESTION MOTOS-------------------------------------------------------------
// Manejo del registro de motos
document.getElementById('form-motos').addEventListener('submit', async (e) => {
    e.preventDefault();
    const moto = {
        codigo: document.getElementById('id-moto').value,
        descripcion: document.getElementById('descripcion-moto').value,
        marca: document.getElementById('marca-moto').value,
        modelo: document.getElementById('modelo-moto').value,
        stockMinimo:
            document.getElementById('stock-minimo-moto').value,
        stockMaximo:
            document.getElementById('stock-maximo-moto').value,
        stockActual:
            document.getElementById('stock-actual-moto').value,
        precio: document.getElementById('precio-moto').value,
        motor: document.getElementById('motor-moto').value,
        chasis: document.getElementById('chasis-moto').value,
        anio: document.getElementById('anio-moto').value,
        cilindrada: document.getElementById('cilindrada-moto').value,
    };
    try {
        const resultado = await registrarMoto(moto);
        alert('Vehículo registrado exitosamente');
    }
    catch (error) {
        console.error('Error al registrar un vehículo:', error);
        alert('No se pudo registrar el vehículo');
    }
    // Limpiar los campos del formulario
    document.getElementById('id-moto').value = '';
    document.getElementById('descripcion-moto').value = '';
    document.getElementById('marca-moto').value = '';
    document.getElementById('modelo-moto').value = '';
    document.getElementById('stock-minimo-moto').value = '';
    document.getElementById('stock-maximo-moto').value = '';
    document.getElementById('stock-actual-moto').value = '';
    document.getElementById('precio-moto').value = '';
    document.getElementById('motor-moto').value = '';
    document.getElementById('chasis-moto').value = '';
    document.getElementById('anio-moto').value = '';
    document.getElementById('cilindrada-moto').value = '';
    cargarMotos();
    console.log(resultado);
});
async function cargarMotos() {
    const motos = await listarMotos();
    const tbody = document.getElementById('motos-listado');
    tbody.innerHTML = '';
    motos.forEach(moto => {
        const row = document.createElement('tr');
        row.innerHTML = `
<td>${moto.codigo}</td>
<td>${moto.marca}</td>
<td>${moto.modelo}</td>
`;
        tbody.appendChild(row);
    });
}
//Función para consultar una moto
document.getElementById('buscar-moto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const codigo = document.getElementById('id-moto-buscar').value;
    const moto = await consultarMotos(codigo);
    if (moto) {
        const motoInfo = document.getElementById('moto-info');
        motoInfo.innerHTML = `
<p><strong>Código:</strong> ${moto.codigo}</p>
<p><strong>Descripción:</strong> ${moto.descripcion}</p>
<p><strong>Marca:</strong> ${moto.marca}</p>
<p><strong>Modelo:</strong> ${moto.modelo}</p>
<p><strong>Stock Mínimo:</strong> ${moto.stockMinimo}</p>
<p><strong>Stock Máximo:</strong> ${moto.stockMaximo}</p>
<p><strong>Stock Actual:</strong> ${moto.stockActual}</p>
<p><strong>Precio:</strong> ${moto.precio}</p>
<p><strong>Motor:</strong> ${moto.motor}</p>
<p><strong>Chasis:</strong> ${moto.chasis}</p>
<p><strong>Año:</strong> ${moto.anio}</p>
<p><strong>Cilindrada:</strong> ${moto.cilindrada}</p>
`;
        // Mostrar ventana modal de las motos
        document.getElementById('modal-moto').style.display = 'block';
    } else {
        alert('Vehículo no encontrado');
        document.getElementById('id-moto-buscar').value = '';
    }
});
// Cerrar ventana modal de motos
function cerrarModalMoto() {
    const modalMoto = document.getElementById('modal-moto');
    modalMoto.style.display = "none";
    document.getElementById('id-moto-buscar').value = '';
}
// Función para eliminar las motos
async function anularMotoScript() {
    const codigo = document.getElementById('id-moto-buscar').value;
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar
la moto con ID: ${codigo}?`);
    if (confirmacion) {
        await anularMotos(codigo);
        alert('Vehículo eliminado exitosamente');
        cerrarModalMoto();
        cargarMotos();
    }
}
// Función para modificar los datos de una moto.
async function mostrarFormularioModificar() {
    const codigo = document.getElementById('id-moto-buscar').value;
    try {
        const moto = await consultarMotos(codigo);
        if (!moto) {
            alert('Vehículo no encontrado');
            return;
        }
        document.getElementById('moto-info').innerHTML = `
<form id="form-modificar-moto">
<div class="form-group">
<label for="id-moto-edit"-edit">Código</label>
<input type="text" id="id-moto-edit"
name="id-moto-edit" value="${moto.codigo}" required>
</div>
<div class="form-group">
<label
for="descripcion-moto-edit"-edit">Descripción</label>
<input type="text" id="descripcion-moto-edit"
name="descripcion-moto-edit" value="${moto.descripcion}" required>
</div>
<div class="form-group">
<label for="marca-moto-edit">Marca</label>
<input type="text" id="marca-moto-edit"
name="marca-moto-edit" value="${moto.marca}" required>
</div>
<div class="form-group">
<label for="modelo-moto-edit">Modelo</label>
<input type="tel" id="modelo-moto-edit"
name="modelo-moto-edit" value="${moto.modelo}" required>
</div>
<div class="form-group">
<label for="stock-minimo-moto-edit">Stock
Mínimo</label>
<input type="number" id="stock-minimo-moto-edit"
name="stock-minimo-moto-edit" value="${moto.stockMinimo}" required>
</div>
<div class="form-group">
<label for="stock-maximo-moto-edit">Stock
Máximo</label>
<input type="number" id="stock-maximo-moto-edit"
name="stock-maximo-moto-edit" value="${moto.stockMaximo}" required>
</div>
<div class="form-group">
<label for="stock-actual-moto-edit">Stock
Actual</label>
<input type="number" id="stock-actual-moto-edit"
name="stock-actual-moto-edit" value="${moto.stockActual}" required>
</div>
<div class="form-group">
<label for="precio-moto-edit">Precio</label>
<input type="number" id="precio-moto-edit"
name="precio-moto-edit" value="${moto.precio}" required>
</div>
<div class="form-group">
<label for="motor-moto-edit">Motor</label>
<input type="text" id="motor-moto-edit"
name="motor-moto-edit" value="${moto.motor}" required>
</div>
<div class="form-group">
<label for="chasis-moto-edit">Chasis</label>
<input type="text" id="chasis-moto-edit"
name="chasis-moto-edit" value="${moto.chasis}" required>
</div>
<div class="form-group">
<label for="anio-moto-edit">Año</label>
<input type="text" id="anio-moto-edit"
name="anio-moto-edit" value="${moto.anio}" required>
</div>
<div class="form-group">
<label
for="cilindrada-moto-edit">Cilindrada</label>
<input type="text" id="cilindrada-moto-edit"
name="cilindrada-moto-edit" value="${moto.cilindrada}" required>
</div>
<div class="form-actions">
<button type="submit">Guardar Cambios</button>
</div>
</form>
`;
        document.getElementById('modal-title').textContent = 'ModificarMoto';
        // Remover los botones anteriores (Modificar y Eliminar)
        document.getElementById('modal-actions').innerHTML = '';
        document.getElementById('form-modificar-moto').addEventListener('submit', function (event) {
            event.preventDefault();
            guardarCambiosMoto(moto.codigo);
        });
    } catch (error) {
        console.error('Se ha producido un error al modificar elvehículo: ', error);
        alert('Se ha producido un error al modificar el vehículo');
    }
}
async function guardarCambiosMoto(codigo) {
    const motoData = {
        codigo: codigo,
        descripcion:
            document.getElementById('descripcion-moto-edit').value,
        marca: document.getElementById('marca-moto-edit').value,
        modelo: document.getElementById('modelo-moto-edit').value,
        stockMinimo:
            document.getElementById('stock-minimo-moto-edit').value,
        stockMaximo:
            document.getElementById('stock-maximo-moto-edit').value,
        stockActual:
            document.getElementById('stock-actual-moto-edit').value,
        precio: document.getElementById('precio-moto-edit').value,
        motor: document.getElementById('motor-moto-edit').value,
        chasis: document.getElementById('chasis-moto-edit').value,
        anio: document.getElementById('anio-moto-edit').value,
        cilindrada:
            document.getElementById('cilindrada-moto-edit').value,
    };
    console.log(motoData);
    try {
        const updatedMoto = await modificarMotos(codigo, motoData);
        document.getElementById('moto-info').innerHTML = `
<p><strong>Código:</strong> <span
id="moto-codigo">${updatedMoto.codigo}</span></p>
<p><strong>Descripción:</strong> <span
id="moto-descripcion">${updatedMoto.descripcion}</span></p>
<p><strong>Marca:</strong> <span
id="moto-marca">${updatedMoto.marca}</span></p>
<p><strong>Modelo:</strong> <span
id="moto-modelo">${updatedMoto.modelo}</span></p>
<p><strong>Stock Mínimo:</strong> <span
id="moto-stock-minimo">${updatedMoto.stockMinimo}</span></p>
<p><strong>Stock Máximo:</strong> <span
id="moto-stock-maximo">${updatedMoto.stockMaximo}</span></p>
<p><strong>Stock Actual:</strong> <span
id="moto-stock-actual">${updatedMoto.stockActual}</span></p>
<p><strong>Precio:</strong> <span
id="moto-precio">${updatedMoto.precio}</span></p>
<p><strong>Motor:</strong> <span
id="moto-motor">${updatedMoto.motor}</span></p>
<p><strong>Chasis:</strong> <span
id="moto-chasis">${updatedMoto.chasis}</span></p>
<p><strong>Año:</strong> <span
id="moto-anio">${updatedMoto.anio}</span></p>
<p><strong>Cilindrada:</strong> <span
id="moto-cilindrada">${updatedMoto.cilindrada}</span></p>
`;
        // Restaurar el título y botones originales
        document.getElementById('modal-title').textContent =
            'Información del Vehículo';
        document.getElementById('modal-actions').innerHTML = `
<button id="btn-modificar"
onclick="mostrarFormularioModificar()">Modificar</button>
<button id="btn-eliminar"
onclick="anularMotoScript()">Eliminar</button>
`;
        alert('Vehículo actualizado exitosamente');
    } catch (error) {
        console.error('Se ha producido un error al modificar los datosdel vehículo: ', error);
        alert('Se ha producido un error al modificar los datos delvehículo');
    }
}
window.onload = () => {
    cargarMotos();
};
//------------------------------------ GESTION ORDENES DE COMPRA-------------------------------------------------------------
// Manejo del registro de órdenes de compra
document.getElementById('form-ordenes').addEventListener('submit',
    async (e) => {
        e.preventDefault();
        const ordendecompra = {
            nro_orden: document.getElementById('nro-orden').value,
            CUIT: document.getElementById('cuit-orden').value,
            razonSocial:
                document.getElementById('razon-social-orden').value,
            proveedor: document.getElementById('proveedor-orden').value,
            descripcion:
                document.getElementById('descripcion-orden').value,
            fechaOrden: document.getElementById('fecha-orden').value,
            codigoArt: document.getElementById('codigo-orden').value,
            cantArt: document.getElementById('cantidad-orden').value,
            precio: document.getElementById('precio-orden').value,
            precioTotal:
                document.getElementById('precio-total-orden').value,
            precioFinal:
                document.getElementById('precio-final-orden').value,
            ivaInscripto: document.getElementById('iva-orden').value,
        };
        try {
            const resultado = await
                registrarOrdenesDeCompra(ordendecompra);
            alert('Orden de compra registrada exitosamente');
        }
        catch (error) {
            console.error('Error al registrar la órden de compra:', error);
            alert('No se pudo registrar la órden de compra');
        }
        // Limpiar los campos del formulario
        document.getElementById('nro-orden').value = '';
        document.getElementById('cuit-orden').value = '';
        document.getElementById('razon-social-orden').value = '';
        document.getElementById('proveedor-orden').value = '';
        document.getElementById('descripcion-orden').value = '';
        document.getElementById('fecha-orden').value = '';
        document.getElementById('codigo-orden').value = '';
        document.getElementById('cantidad-orden').value = '';
        document.getElementById('precio-orden').value = '';
        document.getElementById('precio-total-orden').value = '';
        document.getElementById('precio-final-orden').value = '';
        document.getElementById('iva-orden').value = '';
        OrdenesDeCompra();
        console.log(resultado);
    });
async function cargarOrdenesDeCompra() {
    const motos = await listarOrdenesDeCompra();
    const tbody = document.getElementById('ordenes-listado');
    tbody.innerHTML = '';
    ordenesdecompra.forEach(ordendecompra => {
        const row = document.createElement('tr');
        row.innerHTML = `
<td>${ordendecompra.id_ordendecompra}</td>
<td>${ordendecompra.proveedor}</td>
<td>${ordendecompra.descripcion}</td>
`;
        tbody.appendChild(row);
    });
}
//Función para consultar una órden de compra
document.getElementById('buscar-orden').addEventListener('submit',
    async (e) => {
        e.preventDefault();
        const id_ordendecompra = document.getElementById('id-orden').value;
        const ordendecompra = await
            consultarOrdenesDeCompra(id_ordendecompra);
        if (ordendecompra) {
            const ordenInfo = document.getElementById('orden-info');
            ordenInfo.innerHTML = `
<p><strong>Nro orden:</strong>
${ordendecompra.nro_orden}}</p>
<p><strong>CUIT:</strong> ${ordendecompra.CUIT}}</p>
<p><strong>Razón Social:</strong>
${ordendecompra.razonSocial}}</p>
<p><strong>Proveedor:</strong>
${ordendecompra.proveedor}}</p>
<p><strong>Descripción:</strong>
${ordendecompra.descripcion}</p>
<p><strong>Provincia:</strong>
${ordendecompra.provincia}</p>
<p><strong>Fecha orden:</strong>
${ordendecompra.fechaOrden}</p>
<p><strong>Código Artículo:</strong>
${ordendecompra.codigoArt}</p>
<p><strong>Cantidad Artículo:</strong>
${ordendecompra.cantArt}</p>
<p><strong>Precio:</strong> ${ordendecompra.precio}</p>
<p><strong>Precio Total:</strong>
${ordendecompra.precioTotal}</p>
<p><strong>Precio Final:</strong>
${ordendecompra.precioFinal}</p>
<p><strong>IVA Inscripto:</strong>
${ordendecompra.ivaInscripto}</p>
`;
            // Mostrar el modal de las ordenes de compra
            document.getElementById('modal-orden').style.display = 'block';
        } else {
            alert('Orden de compra no encontrada');
        }
        document.getElementById('id-orden').value = '';
    });
// Cerrar ventana modal de ordenes de compra
function cerrarModalOrden() {
    const modalOrden = document.getElementById('modal-orden');
    modalOrden.style.display = "none";
    document.getElementById('id-orden').value = '';
}
// Función para eliminar las ordenes de compra
async function anularOrdenScript() {
    const id_ordendecompra = document.getElementById('id-orden').value;
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar
la orden con ID: ${id_ordendecompra}?`);
    if (confirmacion) {
        await anularOrdenesDeCompra(id_ordendecompra);
        alert('Orden eliminada exitosamente');
        cerrarModalOrden();
        cargarOrdenesDeCompra();
    }
}
// Función para modificar las ordenes de compra
async function mostrarFormularioModificar() {
    const id_ordendecompra = document.getElementById('id-orden').value;
    try {
        const ordendecompra = await
            consultarOrdenesDeCompra(id_ordendecompra);
        if (!ordendecompra) {
            alert('Orden no encontrada');
            return;
        }
        document.getElementById('orden-info').innerHTML = `
<form id="form-modificar-orden">
<div class="form-group">
<label for="nro-orden-edit">Nro Orden</label>
<input type="text" id="nro-orden-edit"
name="nro-orden-edit" value="${ordendecompra.nro_orden}" required>
</div>
<div class="form-group">
<label for="cuit-orden-edit">CUIT</label>
<input type="text" id="cuit-orden-edit"
name="cuit-orden-edit" value="${ordendecompra.CUIT}" required>
</div>
<div class="form-group">
<label for="razon-social-orden-edit">Razón
Social</label>
<input type="text" id="razon-social-orden-edit"
name="razon-social-orden-edit" value="${ordendecompra.razonSocial}"
required>
</div>
<div class="form-group">
<label for="proveedor-orden-edit">Proveedor</label>
<input type="text" id="proveedor-orden-edit"
name="proveedor-orden-edit" value="${ordendecompra.proveedor}"
required>
</div>
<div class="form-group">
<label
for="descripcion-orden-edit">Descripción</label>
<input type="tel" id="descripcion-orden-edit"
name="descripcion-orden-edit" value="${ordendecompra.descripcion}"
required>
</div>
<div class="form-group">
<label for="provincia-orden-edit">Provincia</label>
<select name="Provincia" id="provincia-orden-edit"
name="provincia-orden-edit" value="${ordendecompra.provincia}"
required>
<option selected>
<option>Buenos Aires</option>
<option>Catamarca</option>
<option>Chaco</option>
<option>Chubut</option>
<option>Ciudad Autónoma de Buenos
Aires</option>
<option>Córdoba</option>
<option>Corrientes</option>
<option>Entre Ríos</option>
<option>Formosa</option>
<option>Jujuy</option>
<option>La Pampa</option>
<option>La Rioja</option>
<option>Mendoza</option>
<option>Misiones</option>
<option>Neuquén</option>
<option>Río Negro</option>
<option>Salta</option>
<option>San Juan</option>
<option>San Luis</option>
<option>Santa Cruz</option>
<option>Santa Fe</option>
<option>Santiago del Estero</option>
<option>Tierra del Fuego</option>
<option>Tucumán</option>
</option>
</select>
</div>
<div class="form-group">
<label for="fecha-orden-edit">Fecha Orden</label>
<input type="text" id="fecha-orden-edit"
name="fecha-orden-edit" value="${ordendecompra.fechaOrden}" required>
</div>
<div class="form-group">
<label for="codigo-articulo-orden-edit">Código
Artículo</label>
<input type="text" id="codigo-articulo-orden-edit"
name="codigo-articulo-orden-edit" value="${ordendecompra.codigoArt}"
required>
</div>
<div class="form-group">
<label for="cantidad-articulo-orden-edit">Cantidad
Artículo</label>
<input type="text"
id="cantidad-articulo-orden-edit" name="cantidad-articulo-orden-edit"
value="${ordendecompra.cantArt}" required>
</div>
<div class="form-group">
<label for="precio-orden-edit">Precio</label>
<input type="text" id="precio-orden-edit"
name="precio-orden-edit" value="${ordendecompra.precio}" required>
</div>
<div class="form-group">
<label for="precio-total-orden-edit">Precio
Total</label>
<input type="text" id="precio-total-orden-edit"
name="precio-total-orden-edit" value="${ordendecompra.precioTotal}"
required>
</div>
<div class="form-group">
<label for="precio-final-orden-edit">Precio
Final</label>
<input type="text" id="precio-final-orden-edit"
name="precio-final-orden-edit" value="${ordendecompra.precioFinal}"
required>
</div>
<div class="form-group">
<label for="iva-inscripto-orden-edit">IVA
Inscripto</label>
<input type="text" id="iva-inscripto-orden-edit"
name="iva-inscripto-orden-edit" value="${ordendecompra.ivaInscripto}"
required>
</div>
<div class="form-actions">
<button type="submit">Guardar Cambios</button>
</div>
</form>
`;
        document.getElementById('modal-title').textContent = 'ModificarOrden';
        document.getElementById('modal-actions').innerHTML = '';
        document.getElementById('form-modificar-orden').addEventListener('submit', function (event) {
            event.preventDefault();
            guardarCambiosOrden(ordendecompra.id_ordendecompra);
        });
    } catch (error) {
        console.error('Se ha producido un error al modificar la orden',
            error);
        alert('Se ha producido un error al modificar la orden');
    }
}
async function guardarCambiosOrden(id_ordendecompra) {
    const ordenData = {
        nro_orden: document.getElementById('nro-orden-edit').value,
        CUIT: document.getElementById('cuit-orden-edit').value,
        razonSocial:
            document.getElementById('razon-social-orden-edit').value,
        proveedor:
            document.getElementById('proveedor-orden-edit').value,
        descripcion:
            document.getElementById('descripcion-orden-edit').value,
        provincia:
            document.getElementById('provincia-orden-edit').value,
        fechaOrden: document.getElementById('fecha-orden-edit').value,
        codigoArt:
            document.getElementById('codigo-articulo-orden-edit').value,
        cantArt:
            document.getElementById('cantidad-articulo-orden-edit').value,
        precio: document.getElementById('precio-orden-edit').value,
        precioTotal:
            document.getElementById('precio-total-orden-edit').value,
        precioFinal:
            document.getElementById('precio-final-orden-edit').value,
        ivaInscripto:
            document.getElementById('iva-inscripto-orden-edit').value,
    };
    console.log(ordenData);
    try {
        const updatedOrden = await
            modificarOrdenesDeCompra(id_ordendecompra, ordenData);
        document.getElementById('orden-info').innerHTML = `
<p><strong>Nro Orden:</strong> <span
id="orden-nro">${updatedOrden.nro_orden}</span></p>
<p><strong>CUIT:</strong> <span
id="orden-cuit">${updatedOrden.CUIT}</span></p>
<p><strong>Razón Social:</strong> <span
id="orden-razon-social">${updatedOrden.razonSocial}</span></p>
<p><strong>Proveedor:</strong> <span
id="orden-proveedor">${updatedOrden.proveedor}</span></p>
<p><strong>Descripción:</strong> <span
id="orden-descripcion">${updatedOrden.descripcion}</span></p>
<p><strong>Provincia:</strong> <span
id="orden-provincia">${updatedOrden.provincia}</span></p>
<p><strong>Fecha Orden:</strong> <span
id="orden-fecha">${updatedOrden.fechaOrden}</span></p>
<p><strong>Código Artículo:</strong> <span
id="orden-codigo-articulo">${updatedOrden.codigoArt}</span></p>
<p><strong>Cantidad Artículo:</strong> <span
id="orden-cantidad-articulo">${updatedOrden.cantArt}</span></p>
<p><strong>Precio:</strong> <span
id="orden-precio">${updatedOrden.precio}</span></p>
<p><strong>Precio Total:</strong> <span
id="orden-precio-total">${updatedOrden.precioTotal}</span></p>
<p><strong>Precio Final:</strong> <span
id="orden-precio-final">${updatedOrden.precioFinal}</span></p>
<p><strong>IVA Inscripto:</strong> <span
id="orden-iva-inscripto">${updatedOrden.ivaInscripto}</span></p>
`;
        // Restaurar el título y botones originales
        document.getElementById('modal-title').textContent =
            'Información de Orden de compra';
        document.getElementById('modal-actions').innerHTML = `
<button id="btn-modificar"
onclick="mostrarFormularioModificar()">Modificar</button>
<button id="btn-eliminar"
onclick="anularOrdenScript()">Eliminar</button>
`;
        alert('Orden de compra actualizada exitosamente');
    } catch (error) {
        console.error('Se ha producido un error al modificar la ordende compra: ', error);
        alert('Se ha producido un error al modificar la orden de compra');
    }
}
window.onload = () => {
    cargarOrdenesDeCompra();
};
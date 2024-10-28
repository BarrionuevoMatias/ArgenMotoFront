// crud.js

// Función para registrar un nuevo vendedor
/*
async function registrarVendedor(vendedor) {
    try {
        const response = await fetch('http://localhost:3000/vendedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendedor),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al registrar vendedor:', error);
    }
}

// Función para buscar un vendedor por legajo
async function buscarVendedor(legajo) {
    try {
        const response = await fetch(`http://localhost:3000/vendedores/${legajo}`);
        return await response.json();
    } catch (error) {
        console.error('Error al buscar vendedor:', error);
    }
}

// Función para listar todos los vendedores
async function listarVendedores() {
    try {
        const response = await fetch('http://localhost:3000/vendedores');
        return await response.json();
    } catch (error) {
        console.error('Error al listar vendedores:', error);
    }
}

async function eliminarVendedor(legajo){
    try{
        await fetch(`http://localhost:3000/vendedores/${legajo}`, {
                method: 'DELETE'
            });
    }
    catch(error) {
        console.error('error al eliminar el vendedor',error);
    }
}

// Función para modificar un vendedor
async function modificarVendedor(legajo, vendedorData) {
    try {
        const response = await fetch(`http://localhost:3000/vendedores/${legajo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendedorData)
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Error al actualizar el vendedor');
        }

        const updatedVendedor = await response.json();
        return updatedVendedor;

    } catch (error) {
        console.error('Error al modificar el vendedor:', error);
        throw error; // Lanza el error para que sea capturado por la función que llama a `modificarVendedor`
    }
}
*/
// Array simulado de vendedores
const vendedoresDB = [
    { apellido: 'Gomez', nombre: 'Juan', razonSocial: 'MotoRepuestos', domicilio: 'Calle Falsa 123', localidad: 'Buenos Aires', provincia: 'Buenos Aires', telefono: '123456789', email: 'juan.gomez@example.com', legajo: 'V001' },
    { apellido: 'Perez', nombre: 'Laura', razonSocial: 'MotoCenter', domicilio: 'Av Siempre Viva 742', localidad: 'Rosario', provincia: 'Santa Fe', telefono: '987654321', email: 'laura.perez@example.com', legajo: 'V002' },
    { apellido: 'Martinez', nombre: 'Carlos', razonSocial: 'MotoTech', domicilio: 'Calle Ejemplo 456', localidad: 'Córdoba', provincia: 'Córdoba', telefono: '234567890', email: 'carlos.martinez@example.com', legajo: 'V003' },
    { apellido: 'Lopez', nombre: 'Ana', razonSocial: 'Repuestos Rápidos', domicilio: 'Boulevard 789', localidad: 'Mendoza', provincia: 'Mendoza', telefono: '345678901', email: 'ana.lopez@example.com', legajo: 'V004' },
    { apellido: 'Fernandez', nombre: 'Pedro', razonSocial: 'MotoAventura', domicilio: 'Ruta 1', localidad: 'La Plata', provincia: 'Buenos Aires', telefono: '456789012', email: 'pedro.fernandez@example.com', legajo: 'V005' },
    { apellido: 'Hernandez', nombre: 'María', razonSocial: 'Todo Motos', domicilio: 'Calle 10', localidad: 'San Miguel', provincia: 'Buenos Aires', telefono: '567890123', email: 'maria.hernandez@example.com', legajo: 'V006' },
    { apellido: 'Garcia', nombre: 'Luis', razonSocial: 'MotoMundo', domicilio: 'Calle Principal 100', localidad: 'Bahía Blanca', provincia: 'Buenos Aires', telefono: '678901234', email: 'luis.garcia@example.com', legajo: 'V007' },
    { apellido: 'Rodriguez', nombre: 'Elena', razonSocial: 'Motos y Más', domicilio: 'Avenida del Libertador', localidad: 'Salta', provincia: 'Salta', telefono: '789012345', email: 'elena.rodriguez@example.com', legajo: 'V008' },
    { apellido: 'Diaz', nombre: 'Javier', razonSocial: 'Repuestos Javi', domicilio: 'Calle Rivadavia', localidad: 'Tucumán', provincia: 'Tucumán', telefono: '890123456', email: 'javier.diaz@example.com', legajo: 'V009' },
    { apellido: 'Sánchez', nombre: 'Patricia', razonSocial: 'Motos Patricia', domicilio: 'Avenida Belgrano', localidad: 'Neuquén', provincia: 'Neuquén', telefono: '901234567', email: 'patricia.sanchez@example.com', legajo: 'V010' },
    { apellido: 'Castro', nombre: 'Fernando', razonSocial: 'MotoFácil', domicilio: 'Calle San Martín', localidad: 'Río Cuarto', provincia: 'Córdoba', telefono: '012345678', email: 'fernando.castro@example.com', legajo: 'V011' },
    { apellido: 'Vazquez', nombre: 'Sofia', razonSocial: 'Repuestos S.A.', domicilio: 'Calle Mitre', localidad: 'San Juan', provincia: 'San Juan', telefono: '123456788', email: 'sofia.vazquez@example.com', legajo: 'V012' },
    { apellido: 'Rojas', nombre: 'Gabriel', razonSocial: 'MotoZone', domicilio: 'Calle Alvear', localidad: 'Catamarca', provincia: 'Catamarca', telefono: '234567899', email: 'gabriel.rojas@example.com', legajo: 'V013' },
    { apellido: 'Morales', nombre: 'Claudia', razonSocial: 'Todo en Motos', domicilio: 'Calle Las Heras', localidad: 'Formosa', provincia: 'Formosa', telefono: '345678900', email: 'claudia.morales@example.com', legajo: 'V014' },
    { apellido: 'Mendoza', nombre: 'Esteban', razonSocial: 'Motos Express', domicilio: 'Avenida San Juan', localidad: 'Chaco', provincia: 'Chaco', telefono: '456789011', email: 'esteban.mendoza@example.com', legajo: 'V015' }
];

// Función para registrar un nuevo vendedor
function registrarVendedor(vendedor) {
    vendedoresDB.push(vendedor);
    return vendedor; // Retorna el vendedor registrado
}

// Función para buscar un vendedor por legajo
function buscarVendedor(legajo) {
    return vendedoresDB.find(vendedor => vendedor.legajo === legajo) || null; // Retorna el vendedor encontrado o null
}

// Función para listar todos los vendedores
function listarVendedores() {
    return vendedoresDB; // Retorna el array completo de vendedores
}

// Función para eliminar un vendedor
function eliminarVendedor(legajo) {
    const index = vendedoresDB.findIndex(vendedor => vendedor.legajo === legajo);
    if (index !== -1) {
        vendedoresDB.splice(index, 1); // Elimina el vendedor del array
    }
}

// Función para modificar un vendedor
function modificarVendedor(legajo, vendedorData) {
    const index = vendedoresDB.findIndex(vendedor => vendedor.legajo === legajo);
    if (index !== -1) {
        vendedoresDB[index] = { ...vendedoresDB[index], ...vendedorData }; // Actualiza los datos del vendedor
        return vendedoresDB[index]; // Retorna el vendedor actualizado
    }
    return null; // Retorna null si no se encontró el vendedor
}



///////////////////// Cliente ///////////////////////////////
/*
const apiUrl = 'http://localhost:3000/clientes'; // Cambia esto a la URL de tu API

// Función para registrar un nuevo cliente
async function registrarCliente(cliente) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        if (!response.ok) {
            throw new Error('Error al registrar el cliente');
        }
        const data = await response.json();
        console.log('Cliente registrado:', data);
        return data; // Retorna el cliente registrado
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para buscar un cliente por CUIT
async function buscarCliente(cuit) {
    try {
        const response = await fetch(`${apiUrl}/${cuit}`);
        if (!response.ok) {
            throw new Error('Cliente no encontrado');
        }
        const data = await response.json();
        console.log('Cliente encontrado:', data);
        return data; // Retorna el cliente encontrado
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para listar todos los clientes
async function listarClientes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al listar clientes');
        }
        const data = await response.json();
        console.log('Lista de clientes:', data);
        return data; // Retorna el array completo de clientes
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para eliminar un cliente
async function eliminarCliente(cuit) {
    try {
        const response = await fetch(`${apiUrl}/${cuit}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }
        const data = await response.json();
        console.log('Cliente eliminado:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para modificar un cliente
async function modificarCliente(cuit, clienteData) {
    try {
        const response = await fetch(`${apiUrl}/${cuit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });
        if (!response.ok) {
            throw new Error('Error al modificar el cliente');
        }
        const data = await response.json();
        console.log('Cliente modificado:', data);
        return data; // Retorna el cliente modificado
    } catch (error) {
        console.error('Error:', error);
    }
}
*/

const clientesDB = [
    { apellido: 'Gonzalez', nombre: 'Ana', razonSocial: 'Compañía A', domicilio: 'Calle 1', localidad: 'Buenos Aires', provincia: 'Buenos Aires', telefono: '123456789', email: 'ana.gonzalez@example.com', cuit: '20-12345678-9' },
    { apellido: 'Martinez', nombre: 'Carlos', razonSocial: 'Compañía B', domicilio: 'Calle 2', localidad: 'Córdoba', provincia: 'Córdoba', telefono: '234567890', email: 'carlos.martinez@example.com', cuit: '20-23456789-0' },
    { apellido: 'Lopez', nombre: 'María', razonSocial: 'Compañía C', domicilio: 'Calle 3', localidad: 'Mendoza', provincia: 'Mendoza', telefono: '345678901', email: 'maria.lopez@example.com', cuit: '20-34567890-1' },
    { apellido: 'Fernandez', nombre: 'Pedro', razonSocial: 'Compañía D', domicilio: 'Calle 4', localidad: 'La Plata', provincia: 'Buenos Aires', telefono: '456789012', email: 'pedro.fernandez@example.com', cuit: '20-45678901-2' },
    { apellido: 'Hernandez', nombre: 'Claudia', razonSocial: 'Compañía E', domicilio: 'Calle 5', localidad: 'Rosario', provincia: 'Santa Fe', telefono: '567890123', email: 'claudia.hernandez@example.com', cuit: '20-56789012-3' },
    { apellido: 'Martinez', nombre: 'Sofia', razonSocial: 'Compañía F', domicilio: 'Calle 6', localidad: 'San Juan', provincia: 'San Juan', telefono: '678901234', email: 'sofia.martinez@example.com', cuit: '20-67890123-4' },
    { apellido: 'Ramirez', nombre: 'Luis', razonSocial: 'Compañía G', domicilio: 'Calle 7', localidad: 'Tucumán', provincia: 'Tucumán', telefono: '789012345', email: 'luis.ramirez@example.com', cuit: '20-78901234-5' },
    { apellido: 'Sanchez', nombre: 'Gabriela', razonSocial: 'Compañía H', domicilio: 'Calle 8', localidad: 'Neuquén', provincia: 'Neuquén', telefono: '890123456', email: 'gabriela.sanchez@example.com', cuit: '20-89012345-6' },
    { apellido: 'Castro', nombre: 'Fernando', razonSocial: 'Compañía I', domicilio: 'Calle 9', localidad: 'Bahía Blanca', provincia: 'Buenos Aires', telefono: '901234567', email: 'fernando.castro@example.com', cuit: '20-90123456-7' },
    { apellido: 'Torres', nombre: 'Esteban', razonSocial: 'Compañía J', domicilio: 'Calle 10', localidad: 'Salta', provincia: 'Salta', telefono: '012345678', email: 'esteban.torres@example.com', cuit: '20-01234567-8' }
];


// Función para registrar un nuevo cliente
function registrarCliente(cliente) {
    clientesDB.push(cliente);
    return cliente; // Retorna el cliente registrado
}

// Función para buscar un cliente por CUIT
function buscarCliente(cuit) {
    return clientesDB.find(cliente => cliente.cuit === cuit) || null; // Retorna el cliente encontrado o null
}

// Función para listar todos los clientes
function listarClientes() {
    return clientesDB; // Retorna el array completo de clientes
}

// Función para eliminar un cliente
function eliminarCliente(cuit) {
    const index = clientesDB.findIndex(cliente => cliente.cuit === cuit);
    if (index !== -1) {
        clientesDB.splice(index, 1); // Elimina el cliente del array
    }
}

// Función para modificar un cliente
function modificarCliente(cuit, clienteData) {
    const index = clientesDB.findIndex(cliente => cliente.cuit === cuit);
    if (index !== -1) {
        clientesDB[index] = { ...clientesDB[index], ...clienteData }; // Actualiza los datos del cliente
        return clientesDB[index]; // Retorna el cliente actualizado
    }
    return null; // Retorna null si no se encontró el cliente
}


//////////////////// motos ////////////////////////////

async function registrarMoto(motoData) {
    try {
        const response = await fetch('/api/motos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(motoData),
        });
        if (!response.ok) {
            throw new Error('Error al crear la moto');
        }
        const newMoto = await response.json();
        console.log('Moto creada:', newMoto);
    } catch (error) {
        console.error(error.message);
    }
}

async function listarMotos() {
    try {
        const response = await fetch('/api/moto');
        if (!response.ok) {
            throw new Error('Error al obtener las motos');
        }
        const motos = await response.json();
        console.log('Motos obtenidas:', motos);
    } catch (error) {
        console.error(error.message);
    }
}

async function buscarMoto(codigo) {
    try {
        const response = await fetch(`/api/moto/${codigo}`);
        if (!response.ok) {
            throw new Error('Error al obtener la moto');
        }
        const moto = await response.json();
        console.log('Moto obtenida:', moto);
    } catch (error) {
        console.error(error.message);
    }
}

async function modificarMoto(codigo, motoData) {
    try {
        const response = await fetch(`/api/moto/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(motoData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la moto');
        }
        const updatedMoto = await response.json();
        console.log('Moto actualizada:', updatedMoto);
    } catch (error) {
        console.error(error.message);
    }
}


async function eliminarMoto(codigo) {
    try {
        const response = await fetch(`/api/moto/${codigo}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la moto');
        }
        console.log('Moto eliminada');
    } catch (error) {
        console.error(error.message);
    }
}

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
    return vendedor;
}

// Función para buscar un vendedor por legajo
function buscarVendedor(legajo) {
    return vendedoresDB.find(vendedor => vendedor.legajo === legajo) || null; 

// Función para listar todos los vendedores
function listarVendedores() {
    return vendedoresDB; 
}

// Función para eliminar un vendedor
function eliminarVendedor(legajo) {
    const index = vendedoresDB.findIndex(vendedor => vendedor.legajo === legajo);
    if (index !== -1) {
        vendedoresDB.splice(index, 1); 
    }
}

// Función para modificar un vendedor
function modificarVendedor(legajo, vendedorData) {
    const index = vendedoresDB.findIndex(vendedor => vendedor.legajo === legajo);
    if (index !== -1) {
        vendedoresDB[index] = { ...vendedoresDB[index], ...vendedorData }; 
        return vendedoresDB[index]; // Retorna el vendedor actualizado
    }
    return null; 
}

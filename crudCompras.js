// crudCompras.js
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
-----------------------------------------------------------------------
-------- */
// ---------------------------------------- GESTION DE PROVEEDORES-------------------------------------------------
// REGISTRAR PROVEEDOR
// Función para registrar un nuevo proveedor
function registrarProveedor(proveedor) {
    const hayProveedor = proveedoresDB.find(proveedor =>
        proveedor.apellido === apellido && proveedor.nombre === nombre &&
        proveedor.telefono === telefono &&
        proveedor.provincia === provincia && proveedor.localidad ===
        localidad && proveedor.domicilio === domicilio && proveedor.email ===
        email && proveedor.razonSocial === razonSocial &&
        proveedor.CUIT === CUIT && proveedor.categoria === categoria);
    if (hayProveedor) {
        console.log(hayProveedor);
    }
    else {
        const asignarID = proveedoresDB.length + 1;
        const asignarProveedor = {
            id_proveedor: asignarID, apellido,
            nombre, telefono, provincia, localidad, domicilio, email, razonSocial,
            CUIT, categoria
        };
        proveedoresDB.push(asignarProveedor);
        console.log(asignarProveedor);
    }
}
async function registrarProveedor(proveedor) { /* Con async function
devolvemos promesas depende de como corra el flujo de programación.*/
    try {
        const response = await
            fetch('http://localhost:3000/proveedores', { /* Con await, se espera
que una promesa se resuelva y devuelva un resultado. En este caso,
hacemos la solicitud al servidor localhost:3000. */
                method: "POST", /* POST es lo que se manda por
formulario. */
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proveedor),
            });
        return await response.json();
    }
    /* Caso contrario, si la promesa no se cumple lanzamos una excepción.
    */
    catch (error) {
        console.error('Error al registrar proveedor: ', error);
    }
}
/* Vistazo a la base de datos de proveedores */
const proveedoresDB = [
    {
        id_proveedor: '201', apellido: 'Artein', nombre: 'Matías',
        telefono: '12345678', provincia: 'Buenos Aires', localidad: 'Claypole',
        domicilio: 'Alsina', email: 'artein@example.com', razonSocial:
            'Repuestos y accesorios', CUIT: '20425186', categoria: 'Motocicletas y repuestos'
    },
    {
        id_proveedor: '202', apellido: 'Domínguez', nombre: 'Carla',
        telefono: '42345678', provincia: 'Córdoba', localidad: 'Calchín',
        domicilio: 'González', email: 'artein@example.com', razonSocial:
            'Repuestos y accesorios', CUIT: '20435186', categoria: 'Motocicletas y repuestos'
    },
    {
        id_proveedor: '203', apellido: 'Santos', nombre: 'René',
        telefono: '22345678', provincia: 'Mendoza', localidad: 'Phillips',
        domicilio: 'Alsina', email: 'artein@example.com', razonSocial:
            'Repuestos y accesorios', CUIT: '20445186', categoria: 'Motocicletas y repuestos'
    },
    {
        id_proveedor: '204', apellido: 'Sosa', nombre: 'Juana',
        telefono: '52345678', provincia: 'Santa Fe', localidad: 'Gálvez',
        domicilio: 'Alsina', email: 'artein@example.com', razonSocial:
            'Repuestos y accesorios', CUIT: '20455186', categoria: 'Motocicletas y repuestos'
    },
];
function cambia_provincia() {
    var listaProvincias = ["Buenos Aires AMBA Norte", "Buenos Aires AMBA Sur", "Buenos Aires Interior Norte", "Buenos Aires Interior Sur",
        "Catamarca", "Chaco", "Chubut", "Ciudad Autónoma de Buenos Aires",
        "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta",
        "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"];
    listaProvincias.sort();
    addOptions("provincia-proveedor", listaProvincias);
}
//Función para agregar opciones a un "select"
function addOptions(domElement, listaProvincias) {
    var seleccion = document.getElementsByName(domElement)[0];
    for (var i in listaProvincias) {
        var opcion = document.createElement("option");
        var provinciaFormato =
            listaProvincias[i].toLowerCase().replace(/\s+/g, '');
        opcion.text = listaProvincias[i];
        opcion.value = provinciaFormato;
        seleccion.add(opcion);
    }
}
function cambia_localidad() {
    //Objeto de provincias con localidades
    var listaLocalidades = {
        buenosairesambanorte: ["Escobar", "General Rodríguez", "General San Martín", "Hurlingham", "Ituzaingó", "José C. Paz", "La Matanza",
            "Luján", "Malvinas Argentinas", "Marcos Paz", "Merlo", "Moreno",
            "Morón", "Pilar", "San Fernando", "San Isidro", "San Miguel", "Tigre",
            "Tres de Febrero", "Vicente López"],
        buenosairesambasur: ["Almirante Brown", "Avellaneda",
            "Berazategui", "Berisso", "Cañuelas", "Ensenada", "Esteban Echeverría",
            "Ezeiza", "Florencio Varela", "La Plata", "Lanús", "Lomas de Zamora",
            "Presidente Perón", "Quilmes", "San Vicente"],
        buenosairesinteriornorte: ["Alberti", "Arrecifes", "Baradero",
            "Bragado", "Carlos Casares", "Carlos Tejedor", "Carmen de Areco",
            "Chacabuco", "Chivilcoy", "Florentino Ameghino", "General Arenales",
            "General Villegas", "Hipólito Yrigoyen", "Junín", "Leandro N. Alem",
            "Lincoln", "Mercedes", "Navarro", "Nueve de Julio", "Pehuajó",
            "Pergamino", "Ramallo", "Rivadavia", "Salto", "San Andrés de Giles",
            "San Antonio de Areco", "San Nicolás", "San Pedro", "Suipacha",
            "Trenque Lauquen", "Zárate"],
        buenosairesinteriorsur: ["25 de Mayo", "Adolfo Alsina",
            "Ayacucho", "Azul", "Balcarce", "Benito Juarez", "Bolívar", "Carmen de Patagones", "Castelli", "Chascomús", "Coronel Dorrego", "Coronel Pringles", "Coronel Rosales", "Daireaux", "Dolores", "General Alvarado", "General Alvear", "General Belgrano", "General Lamadrid",
            "General Lavalle", "General Madariaga", "General Paz", "General Pueyrredón",
            "La Costa", "Laprida", "Las Flores", "Lezama", "Lobería",
            "Maipú", "Mar Chiquita", "Monte Hermoso", "Necochea", "Olavarría",
            "Pila", "Pinamar", "Puán", "Rauch", "Saavedra", "Saladillo", "San Cayetano", "Tandil", "Tapalqué", "Tordillo", "Tornquist", "Tres Arroyos",
            "Villa Gesell", "Villarino"],
        catamarca: ["Andalgalá", "Antofagasta de la Sierra", "Belén",
            "Chumbicha", "Pomán", "Recreo", "San Fernando del Valle de Catamarca",
            "Santa María", "Tinogasta", "Valle Viejo"],
        chaco: ["Barranqueras", "Charata", "Chaco", "Colonias Unidas",
            "Las Breñas", "Machagai", "Makallé", "Presidencia Roque Saénz Peña",
            "Resistencia", "Villa Ángela"],
        chubut: ["Alto Río Senguer", "Comodoro Rivadavia", "Dolavon",
            "Esquel", "Gaimán", "Gualjaina", "Puerto Madryn", "Rawson", "Río Mayo",
            "Trelew"],
        ciudadautónomadebuenosaires: ["Agronomía", "Almagro",
            "Balvanera", "Barracas", "Belgrano", "Boedo", "Caballito", "Chacarita",
            "Coghlan", "Colegiales", "Constitución", "Flores", "Floresta", "La Boca", "La Paternal", "Liniers", "Mataderos", "Montserrat", "Monte Castro", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda",
            "Parque Chacabuco", "Parque Chas", "Parque Patricios", "Puerto Madero",
            "Quilmes", "Recoleta", "Retiro", "San Cristóbal", "San Nicolás", "San Telmo", "Versalles", "Villa Crespo", "Villa del Parque", "Villa Devoto", "Villa General Mitre", "Villa Lugano", "Villa Luro", "Villa Ortúzar",
            "Villa Pueyrredón", "Villa Real", "Villa Riachuelo", "VillaSanta Rosa"],
        córdoba: ["Aguas Buenas", "Bell Ville", "Córdoba", "Cosquín",
            "Cristina", "Deán Funes", "La Carlota", "La Falda", "Las Varillas",
            "Maldonado", "Morteros", "Río Cuarto", "Río Tercero", "San Francisco",
            "San Javier", "Sierra de los Comechingones", "Tancacha", "Villa Carlos Paz"],
        corrientes: ["Bella Vista", "Colonia Carlos Pellegrini",
            "Corrientes", "Goya", "Ituzaingó", "Mercedes", "Monte Caseros", "Paso de los Libres", "San Luis del Palmar", "Santo Tomé"],
        entreríos: ["Colón", "Concordia", "Crespo", "Diamante",
            "Federación", "Gualeguay", "Gualeguaychú", "La Paz", "Maldonado",
            "Paraná", "Ramírez", "Villaguay"],
        formosa: ["Clorinda", "El Espinillo", "Formosa", "Las Lomitas", "Pirané", "Pilcomayo", "Riacho He He", "San Antonio del Iberá", "Villa General Manuel Belgrano"],
        jujuy: ["Abra Pampa", "El Carmen", "Humahuaca", "La Quiaca",
            "Libertador General San Martín", "Maimará", "Palpalá", "Perico", "San Salvador de Jujuy", "Tilcara"],
        lapampa: ["Alto Pencal", "General Acha", "General Pico",
            "Intendente Alvear", "Lonquimay", "Macachín", "Parera", "Santa Rosa",
            "Realicó", "Toay"],
        larioja: ["Aimogasta", "Chilecito", "Famatina", "La Rioja",
            "Los Molinos", "Pueblo Viejo", "Quebrada de la Toma", "San Blas de los Sauces", "Sanagasta", "Villa Unión"],
        mendoza: ["Agrelo", "Chacras de Coria", "General Alvear",
            "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Malargüe",
            "Mendoza", "Maipú", "San Carlos", "San Martín", "Tupungato"],
        misiones: ["Apóstoles", "Bernardo de Irigoyen", "Campo Grande", "El Dorado", "Iguazú", "Oberá", "Posadas", "San Ignacio", "San Vicente", "Villa María del Río Seco"],
        neuquén: ["Aluminé", "Cutral Có", "El Chocón", "Junín de Los Andes", "Neuquén", "Plottier", "San Martín de Los Andes", "San Patricio del Chañar", "Villa El Chocón", "Zapala"],
        ríonegro: ["Allen", "Bariloche", "Catriel", "Choele Choel",
            "General Roca", "La Adela", "Luis Beltrán", "Patagones", "Viedma"],
        salta: ["Cafayate", "El Carril", "General Güemes", "La Caldera", "La Merced", "Rosario de La Frontera", "Salta", "San Carlos",
            "San Lorenzo", "Tartagal"],
        sanjuan: ["Albardón", "Caucete", "Chimbas", "Jachal",
            "Pocito", "San Juan", "San Martín", "Sarmiento", "Ullum"],
        sanluis: ["Beazley", "El Trapiche", "La Punta", "Merlo",
            "Nueva Galia", "San Luis", "San Martín", "Santa Rosa del Conlara",
            "Villa Merlo", "Villa Mercedes"],
        santacruz: ["Caleta Olivia", "El Calafate", "Las Heras", "Pico Truncado", "Río Gallegos", "Río Turbio", "San Julián", "Santa Cruz",
            "Sierra Grande", "Puerto Deseado"],
        santafe: ["Casilda", "Ceres", "Gálvez", "Las Parejas",
            "Rafaela", "Rosario", "San Cristóbal", "San Justo", "Santa Fe", "Santo Tomé", "Villa María del Río Seco"],
        santiagodelestero: ["Añatuya", "Beltrán", "Frías", "La Banda",
            "Monte Quemado", "Santiago del Estero", "Sumampa", "Termas de Río Hondo", "Trey"],
        tierradelfuego: ["Puerto Darwin", "Río Grande", "Tolhuin",
            "Usuhaia"],
        tucumán: ["Alderetes", "Bella Vista", "Concepción",
            "Famaillá", "San Miguel de Tucumán", "Simoca", "Tafí del Valle", "Tafí Viejo", "Villa Bella Vista", "Yerba Buena"],
    }
    var provincias = document.getElementById("provincia-proveedor");
    var localidades = document.getElementById("localidad-proveedor");
    var provSeleccionada = provincias.value;
    //Se limpian las localidades
    localidades.innerHTML = '<option disabled value="">Seleccione</option>'
    if (provSeleccionada !== '') {
        //Se seleccionan las localidades
        var locSeleccionada = listaLocalidades[provSeleccionada];
        if (locSeleccionada) {
            locSeleccionada.sort();
        }
        //Insertamos las localidades
        locSeleccionada.forEach(function (loc) {
            let opcion = document.createElement('option');
            opcion.value = loc;
            opcion.text = loc;
            localidades.add(opcion);
        });
    }
}
// Iniciar la carga de provincias para indicar que funciona
cambia_provincia();
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// CONSULTAR PROVEEDORES
// Función al consultar los proveedores por su ID.
function consultarProveedores(id_proveedor) {
    return proveedoresDB.find(proveedor => proveedor.id_proveedor ===
        id_proveedor) || null;
}
// Cuando el cliente asigne un ID, este busca en la base de datos y deahí, el ID del proveedor y lo devuelve.
async function consultarProveedores(id_proveedor) {
    try {
        const response = await
            fetch(`http://localhost:3000/proveedores/${id_proveedor}`);
        return await response.json();
    }
    catch (error) {
        console.error('Proveedor no encontrado', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// MODIFICAR PROVEEDORES
// Función al modificar datos del proveedor
function modificarProveedores(id_proveedor, proveedorData) {
    const index = proveedoresDB.findIndex(proveedor =>
        proveedor.id_proveedor === id_proveedor);
    if (index !== -1) {
        proveedoresDB[index] = {
            ...proveedoresDB[index],
            ...proveedorData
        };
        return proveedoresDB[index];
    }
    return null;
}
async function modificarProveedores(id_proveedor, proveedorData) {
    try {
        const response = await
            fetch(`http://localhost:3000/proveedores/${id_proveedor}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proveedorData)
            });
        console.log('Response status', response.status);
        if (!response.ok) {
            throw new error('No se pudo modificar el proveedor');
        }
        const updatedProveedor = await response.json();
        return updatedProveedor;
    }
    catch (error) {
        console.error('No se pudo modificar el proveedor', error);
        throw error;
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// ANULAR PROVEEDORES
// Función al borrar proveedores
function anularProveedores(id_proveedor) {
    const index = proveedoresDB.findIndex(proveedor =>
        proveedor.id_proveedor === id_proveedor);
    if (index !== -1) {
        proveedoresDB.splice(index, 1);
    }
}
async function anularProveedores(id_proveedor) {
    try {
        const response = await
            fetch(`http://localhost:3000/proveedores/${id_proveedor}`, {
                method: "DELETE"
            });
        return await response.json();
    }
    catch (error) {
        console.error('No se pudo eliminar el proveedor', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// LISTAR PROVEEDORES
// Función para listar todos los proveedores
function listarProveedores() {
    return proveedoresDB;
}
// Con async 'prometemos' listar los proveedores
async function listarProveedores() {
    const response = await fetch('http://localhost:3000/proveedores');
    return await response.json();
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// ---------------------------------------- GESTION DE MOTOS---------------------------------------------------------
// REGISTRAR MOTO
function registrarMoto(moto) {
    return new Promise((resolve, reject) => {
        try {
            motosDB.push(moto);
            resolve(moto);
        }
        catch (error) {
            reject(error);
        }
    });
}
async function registrarMoto(moto) {
    try {
        const response = await fetch('http://localhost:3000/motos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moto),
        });
        return await response.json();
    }
    catch (error) {
        console.error('Se ha producido un error al registrar el vehículo: ', error);
    }
}
const motosDB = [
    {
        codigo: '301', descripcion: 'Alta gama', marca: 'BMW', modelo: 'C400', stockMinimo: '15', stockMaximo: '105', stockActual: '45', precio:
            '2107000', motor: "Motor de combustión interna", chasis: "Tubular",
        anio: 2022, cilindrada: '400 cc'
    },
    {
        codigo: '302', descripcion: 'Alta gama', marca: 'Honda', modelo:
            'GLH', stockMinimo: '20', stockMaximo: '110', stockActual: '60',
        precio: '3890000', motor: "4 tiempos", chasis: "Aluminio", anio: 2024,
        cilindrada: '150 cc'
    },
    {
        codigo: '303', descripcion: 'Alta gama', marca: 'Yamaha', modelo:
            'CBX 250 Twister', stockMinimo: '10', stockMaximo: '70', stockActual:
            '40', precio: '6729000', motor: "4 tiempos", chasis: "Tubular", anio:
            2024, cilindrada: '250 cc'
    },
];
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// CONSULTAR MOTO
// Función al consultar las motos por su ID.
function consultarMotos(codigo) {
    return motosDB.find(moto => moto.codigo === codigo) || null;
}
async function consultarMotos(codigo) {
    try {
        const response = await
            fetch(`http://localhost:3000/motos/${codigo}`);
        return await response.json();
    }
    catch (error) {
        console.error('Vehículo no encontrado', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// MODIFICAR MOTO
// Función al modificar datos de la moto
function modificarMotos(codigo, motoData) {
    const index = motosDB.findIndex(moto => moto.codigo === codigo);
    if (index !== -1) {
        motosDB[index] = { ...motosDB[index], ...motoData };
        return motosDB[index];
    }
    return null;
}
async function modificarMotos(codigo, motoData) {
    try {
        const response = await
            fetch(`http://localhost:3000/motos/${codigo}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(motoData)
            });
        console.log('Response status', response.status);
        if (!response.ok) {
            throw new error('Se ha producido un error al modificar datos del vehículo');
        }
        const updatedMoto = await response.json();
        return updatedMoto;
    }
    catch (error) {
        console.error('Se ha producido un error al modificar datos del vehículo', error);
        throw error;
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// ANULAR MOTO
function anularMotos(codigo) {
    const index = motosDB.findIndex(moto => moto.codigo === codigo);
    if (index !== -1) {
        motosDB.splice(index, 1);
    }
}
async function anularMotos(codigo) {
    try {
        const response = await
            fetch(`http://localhost:3000/motos/${codigo}`, {
                method: "DELETE"
            });
        return await response.json();
    }
    catch (error) {
        console.error('No se pudo eliminar el vehículo', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// LISTAR MOTO
// Función para listar todas las motos
function listarMotos() {
    return motosDB;
}
// Con async 'prometemos' listar las motos
async function listarMotos() {
    try {
        const response = await fetch('http://localhost:3000/motos');
        return await response.json();
    }
    catch (error) {
        console.error('No se puede mostrar la lista:', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
//----------------------------------- GESTION DE ORDENES DE COMPRA---------------------------------------------------
// REGISTRAR ORDEN DE COMPRA
// Función para registrar una nueva órden de compra
function registrarOrdenesDeCompra(ordendecompra) {
    const hayOrdenDeCompra = ordenesdecompraDB.find(ordendecompra =>
        ordendecompra.nro_orden === nro_orden && ordendecompra.CUIT === CUIT &&
        ordendecompra.razonSocial === razonSocial && ordendecompra.proveedor
        === proveedor &&
        ordendecompra.descripcion === descripcion &&
        ordendecompra.provincia === provincia && ordendecompra.fechaOrden ===
        fechaOrden && ordendecompra.codigoArt === codigoArt &&
        ordendecompra.cantArt === cantArt &&
        ordendecompra.precio === precio && ordendecompra.precioTotal ===
        precioTotal && ordendecompra.precioFinal === precioFinal &&
        ordendecompra.ivaInscripto === ivaInscripto);
    if (hayOrdenDeCompra) {
        console.log(hayOrdenDeCompra);
    }
    else {
        const asignarIDOC = ordenesdecompraDB.length + 1;
        const asignarOrdenDeCompra = {
            id_ordendecompra: asignarIDOC,
            nro_orden, CUIT, razonSocial, proveedor, descripcion, provincia,
            fechaOrden, codigoArt, cantArt, precio, precioTotal, precioFinal,
            ivaInscripto
        };
        ordenesdecompraDB.push(asignarOrdenDeCompra);
        console.log(asignarOrdenDeCompra);
    }
}
async function registrarOrdenesDeCompra(ordendecompra) {
    try {
        const response = await
            fetch('http://localhost:3000/ordenesdecompra', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ordendecompra),
            });
        return await response.json();
    }
    catch (error) {
        console.error('Se ha producido un error al registrar la orden de compra ', error);
    }
}
const ordenesdecompraDB = [
    {
        id_ordendecompra: 401, nro_orden: "11", CUIT: "2042685194",
        razonSocial: "Repuestos", proveedor: 'Arthein',
        descripcion: 'A', provincia: "Buenos Aires", fechaOrden:
            "01-10-2024", codigoArt: "B120", cantArt: "200",
        precio: "40000", precioTotal: "60000", precioFinal: "50000",
        ivaInscripto: "40%"
    },
];
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// CONSULTAR ORDEN DE COMPRA
// Función al consultar las órdenes de compra por su ID.
function consultarOrdenesDeCompra(id_ordendecompra) {
    return ordenesdecompraDB.find(ordendecompra =>
        ordendecompra.id_ordendecompra === id_ordendecompra) || null;
}
// Cuando el cliente asigne un ID, este busca en la base de datos y de ahí, el ID del proveedor y lo devuelve.
async function consultarOrdenesDeCompra(id_ordendecompra) {
    try {
        const response = await
            fetch(`http://localhost:3000/ordenesdecompra/${id_ordendecompra}`);
        return await response.json();
    }
    catch (error) {
        console.error('Orden de compra no encontrada', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// MODIFICAR ORDEN DE COMPRA
function modificarOrdenesDeCompra(id_ordendecompra, ordenData) {
    const index = ordenesdecompraDB.findIndex(ordendecompra =>
        ordendecompra.id_ordendecompra === id_ordendecompra);
    if (index !== -1) {
        ordenesdecompraDB[index] = {
            ...ordenesdecompraDB[index],
            ...ordenData
        };
        return ordenesdecompraDB[index];
    }
    return null;
}
async function modificarOrdenesDeCompra(id_ordendecompra, ordenData) {
    try {
        const response = await
            fetch(`http://localhost:3000/ordenesdecompra/${id_ordendecompra}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ordenData)
            });
        console.log('Response status', response.status);
        if (!response.ok) {
            throw new error('Se ha producido un error al modificar una orden de compra');
        }
        const updatedOrden = await response.json();
        return updatedOrden;
    }
    catch (error) {
        console.error('Se ha producido un error al modificar una orden de compra', error);
        throw error;
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// ANULAR ORDEN DE COMPRA
function anularOrdenesDeCompra(id_ordendecompra) {
    const index = ordenesdecompraDB.findIndex(ordendecompra =>
        ordendecompra.id_ordendecompra === id_ordendecompra);
    if (index !== -1) {
        ordenesdecompraDB.splice(index, 1);
    }
}
async function anularOrdenesDeCompra(id_ordendecompra) {
    try {
        const response = await
            fetch(`http://localhost:3000/ordenesdecompra/${id_ordendecompra}`, {
                method: "DELETE"
            });
        return await response.json();
    }
    catch (error) {
        console.error('No se pudo eliminar la orden de compra', error);
    }
}
/*
-----------------------------------------------------------------------
-----------------------------------------------------------------------
---------------------- */
// LISTAR ORDEN DE COMPRA
// Función para listar todas las órdenes de compra
function listarOrdenesDeCompra() {
    return ordenesdecompraDB;
}
async function listarOrdenesDeCompra() {
    const response = await
        fetch('http://localhost:3000/ordenesdecompra');
    return await response.json();
}
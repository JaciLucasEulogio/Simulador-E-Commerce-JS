/*SEGUNDA PRE-ENTREGA*/
/*Simulacion de módulo de ventas E-commerce; con interacción solo por medio de prompt*/

let nombre;
let opcion;
let subTotal, totalPagar=0;


class producto{
    constructor(id, nombre, precio, stock, imagen, oferta, categoria, descripcion){
        this.id=id;
        this.nombre=nombre;
        this.precio = precio;
        this.stock=stock;
        this.imagen=imagen;
        this.oferta=oferta;
        this.categoria=categoria;
        this.descripcion=descripcion;
    }
    actualizarStock(cantComprada){
        this.stock -= cantComprada;
    }
    actualizarPrecio(nuevoPrecio){
        this.precio = nuevoPrecio;
    }
}

class prodComprado{
    constructor(nombre, precio, cantidad, subTotal){
        this.nombre=nombre;
        this.precio=precio;
        this.cantidad=cantidad;
        this.subTotal=subTotal;
    }
}

let array = [
    new producto("A0001", "Polo Oversize", 35.80, 3,"IMG", false, "polo", "Polo de color blanco."),
    new producto("A0002", "Falda Larga", 35.80, 3,"IMG", false, "falda","Falda estilo vintage."),
    new producto("A0003", "Korean Style Sneakers", 35.80, 3,"IMG", false, "zapatilla", "Zapatillas con plataforma."),
    new producto("A0004", "Blusa de tela", 35.80, 3,"IMG", false, "blusa", "Blusa a rayas en color celeste."),
    new producto("A0005", "Blusa de Vestir", 35.80, 3,"IMG", false, "blusa", "Blusa a rayas en color celeste."),
];

let arrayCompras=[]

nombre = prompt("BIENVENIDO\nIngrese su nombre: ");

function pedirOperacion(){
    opcion = parseInt(prompt(`Bienvenido(a) ${nombre} \n\nOPERACIONES\n[1]. Ingresar nuevo producto\n[2]. Ver Lista de productos\n[3]. Actualizar Stock (vender)\n[4]. Buscar producto\n[5]. Salir\n\n${nombre}, ingrese su opcion por favor:`));
}

function comparar(nuevoNombre){
    let a,b;
    array.forEach(function(elemento){
        if((elemento.nombre).trim().toUpperCase() === nuevoNombre.trim().toUpperCase()){
            b=elemento;
            a=1;
        }
    })
    if(a==1){
        return b;
    }else{
        return -1;
    }
}

function agregarProducto(){
    let nuevoId, nuevoNombre, nuevoPrecio, nuevaCategoria, nuevaDescripcion, rpta;
    if(array.length<10){
        nuevoId=`A000${array.length+1}`;
    }else{
        nuevoId=`A00${array.length+1}`;
    }
    do{
        nuevoNombre=prompt("Ingrese el nombre del producto: ");
        rpta = comparar(nuevoNombre);
        if(rpta.precio!=null){
            alert("El nombre del producto ya existe.");
        }
    }while(rpta.precio!=null);
    do{
        nuevoPrecio=parseFloat(prompt("Ingrese el precio del producto: ")); 
        if(nuevoPrecio <=0){ alert("Ingrese un valor válido"); }
    }while(nuevoPrecio<=0);
    do{
        nuevoStock=parseInt(prompt("Ingrese el stock: "));
        if(nuevoStock <=0){ alert("Ingrese un valor válido"); }
    }while(nuevoStock<=0);
    nuevaCategoria=prompt("Ingrese la categoria: ");
    nuevaDescripcion=prompt("Ingrese la descripcion: ");

    array.push(new producto(nuevoId, nuevoNombre, nuevoPrecio, nuevoStock,"IMG", false, nuevaCategoria, nuevaDescripcion))

    alert("El producto ha sido agregado con exito.");
}

function imprimirLista(){
    let productosImprimir = array.map(function(producto){
        return `ID: ${producto.id}\nNombre: ${producto.nombre}`
    }).join("\n\n");
    alert(`PRODUCTOS:\n${productosImprimir}`)
}

function actualizarStock(){
    let nombreA, rpta, cantidad, compra;
    let productosImprimir = array.map(function(producto){
        return `Nombre: ${producto.nombre}\nPrecio: ${producto.precio}\nStock: ${producto.stock}`
    }).join("\n\n");
    nombreA = prompt(`PRODUCTOS:\n${productosImprimir}\n\nIngrese el NOMBRE del producto que desea comprar:`);

    rpta=comparar(nombreA);
    if(rpta.precio!=null){
        do{
            cantidad=parseInt(prompt("Ingrese la cantidad a comprar: "));
            if(cantidad<=0){
                alert("No puede comprar CERO productos.");
            }else if(cantidad>rpta.stock){
                alert("No existe stock Suficiente.");
                return actualizarStock();
            }
        }while(cantidad<=0 || cantidad>rpta.stock);
        rpta.actualizarStock(cantidad);
        subTotal = rpta.precio*cantidad;
        totalPagar = totalPagar + subTotal;
        arrayCompras.push(new prodComprado(rpta.nombre, rpta.precio, cantidad, subTotal))
        compra=parseInt(prompt(`Compra exitosa.\nSUB TOTAL: ${subTotal} \n¿Desea seguir comprando? (1.SI 2.NO)`));
        if(compra == 1){
            return actualizarStock();
        }else{
            let productosImprimir = arrayCompras.map(function(producto){
                return `Nombre: ${producto.nombre}\nPrecio: ${producto.precio}\nCantidad: ${producto.cantidad}\nSub-total: ${producto.subTotal}`
            }).join("\n\n");
            alert(`PRODUCTOS COMPRADOS:\n${productosImprimir}\nTotal=> ${totalPagar}`);
        }
    }else{
        alert("El producto que ingresaste no existe.");
        return actualizarStock();
    }
}
function buscar(){
    let terminoBusqueda = prompt("Ingrese un término de búsqueda:");
    let resultados = [];

    array.forEach(function(producto) {
    if (producto.nombre.trim().toUpperCase().includes((terminoBusqueda).trim().toUpperCase())) {
        resultados.push(producto);
    }
    });
    let resultadosImp = resultados.map(function(producto){
        return `ID: ${producto.id}\nNombre: ${producto.nombre}`
    }).join("\n\n");
    alert(`PRODUCTOS:\n${resultadosImp}`)
}


function operaciones(opcion){
    switch(opcion){
        case 1:{agregarProducto()}break;
        case 2:{imprimirLista();}break;
        case 3:{actualizarStock()}break;
        case 4:{buscar()}break;
        case 5:{alert("Adiós... Regresa a seguir probando el código.")}break;
    }
}

do{
    do{
        pedirOperacion();
        if(isNaN(opcion) || opcion<1 || opcion>5){
            alert("Por favor, verifique su respuesta.");
        }
    }while(isNaN(opcion));
    operaciones(opcion);
}while(opcion != 5);

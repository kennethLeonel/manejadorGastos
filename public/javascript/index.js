
// let nommbre = prompt("Ingrese su nombre");
// console.log(nommbre);

let categorias = [{}];

// Se le pedirá al usuario que ingrese la cantidad de categorías que posee.

// do {
    let cantidadCategorias
do {
     cantidadCategorias =  parseInt(prompt("Ingrese la cantidad de categorías de gastos que posee"));
     if (cantidadCategorias > 0) {
        
        console.log(cantidadCategorias);
    
        // Se le pedirá al usuario que ingrese el nombre de cada categoría.
    
        for (let i = 0; i < cantidadCategorias; i++) {
            let nombreCategoria = prompt("Ingrese el nombre de la categoría" + (i+1));
            
        
    
            let gasto = prompt("Ingrese el gasto de la categoría " + nombreCategoria);
            //Validando que el gasto sea un número si lo es agrego la categoría al array
            if (Number(gasto)) {
                categorias[i] = {nombre: nombreCategoria, gasto: parseInt(gasto)};
                alert("Categoría "+nombreCategoria +" agregada correctamente");
            }
            else {
                alert("El gasto de la categoría "+ nombreCategoria +" debe ser un número");
                i--;
            }
            
    
        }
        // console log para ver que se guardó correctamente
        console.log(categorias);
        // mostrarlo desde el html
    
        let parrafo = document.getElementById("objeto");
    
        parrafo.innerHTML = JSON.stringify(categorias);
    }else {
    
        alert("La cantidad de categorías debe ser un número mayor a 0");
    }
} while (isNaN(cantidadCategorias) || cantidadCategorias < 1);





    





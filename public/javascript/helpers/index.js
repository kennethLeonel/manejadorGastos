
// let nommbre = prompt("Ingrese su nombre");
// console.log(nommbre);

let categorias = [{}];



// Se le pedirá al usuario que ingrese la cantidad de categorías que posee.
let cantidadCategorias ;
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
                categorias[i] = {
                    id: i,
                    nombre: nombreCategoria,
                    gasto: parseInt(gasto)
                };
                //  alert("Categoría "+nombreCategoria +" agregada correctamente");
                 swal ( "Categoría "+nombreCategoria +" agregada correctamente" ,  " " ,  "success" );

            }
            else {
                // swal ( "Error" ,  "El gasto de la categoría "+ nombreCategoria + " debe ser un número" ,  "error" );
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
        // swal("La cantidad de categorías debe ser mayor a 0");
        alert("La cantidad de categorías debe ser mayor a 0");

    }
} while (isNaN(cantidadCategorias) || cantidadCategorias < 1);

const eliminar = (id) => {
    console.log("Entre a eliminar");
    let categoriasFiltradas = categorias.filter( cate => cate.id !==id);
    console.log("Se eliminó la categoría con id: "+id);
    swal ( "Se eliminó la categoría con id: "+id ,  " " ,  "success" );
    console.log(categoriasFiltradas);
    let parrafo = document.getElementById("objeto");
    parrafo.innerHTML = JSON.stringify(categoriasFiltradas);
    
};  

const totalGastos = (arreglo) => {
    let total = 0;
    arreglo.forEach(item => {
        total += item.gasto;
    });
    return total;   
};


setTimeout(() => {

    let hola = prompt("Desea eliminar alguna categoría? (si/no)");
    if (hola == "si") {
        let id = parseInt(prompt("Ingrese el id de la categoría que desea eliminar"));
        eliminar(parseInt(id));
        
    }else if (hola == "no") {

        swal ("El total de gastos que posee es: "+totalGastos(categorias), " " ,  "success" );
        // alert ("El total de gastos que posee es: "+totalGastos(categorias));
        alert("Gracias por usar nuestro programa");
        
    } 
        
    }, 3000);






    // swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, you will not be able to recover this imaginary file!",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   })
    //   .then((willDelete) => {
    //     if (willDelete) {
    //       swal("Poof! Your imaginary file has been deleted!", {
    //         icon: "success",
    //       });
    //     } else {
    //       swal("Your imaginary file is safe!");
    //     }
    //   });






    





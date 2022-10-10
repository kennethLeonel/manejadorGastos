// let servicios = [{
//     id: 1,
//     nombre: "Hogar",
//     descripcion: "Gastos del hogar",
//     gasto: 0
// },{
//     id: 2,
//     nombre: "Transporte",
//     descripcion: "Gastos del transporte",
//     gasto: 0
// },{
//     id: 3,
//     nombre: "Alimentación",
//     descripcion: "Gastos de la alimentación",
//     gasto: 0
// },{
//     id: 4,
//     nombre: "Gimnsaio",
//     descripcion: "Gastos del gimnasio",
//     gasto: 0
// },{
//     id: 5,
//     nombre: "Salidas",
//     descripcion: "Gastos de las salidas",
//     gasto: 0
// },{
//     id: 6,
//     nombre: "Ropa",
//     descripcion: "Gastos de la ropa",
//     gasto: 0
// }
// ]

let categoriasUser = [];

function Categoría(nombre, gasto) {
    this.id = categoriasUser.length + 1;
    this.nombre = nombre;
    this.gasto = gasto;
}
// se obtiene el boton de agregar categoría
const botonAgregar = document.getElementById("agregar");
botonAgregar.addEventListener("click", agregarCategoria);

// se obtiene el boton de eliminar categoría
const botonEliminar = document.getElementById("eliminar");
botonEliminar.addEventListener("click", eliminarCategoria);

// se obtiene el div para mostrar las categorías agregadas por el usuario
const apartadoGastos = document.getElementsByClassName("gastosUser")[0];
console.log(apartadoGastos);
// se obtiene el boton de calcular gastos total del usuario
const botonCalcular = document.getElementById("calcular");
botonCalcular.addEventListener("click", calcularGastos);

const botonBuscarGasto = document.getElementById("detallar");
botonBuscarGasto.addEventListener("click", buscarGasto);


function agregarCategoria () {
    let nombreCategoria ;
    let gastoCategoria ;
    swal("Ingresa el nombre de la categoría:", {
        content: "input",
      })
      .then((nombre) => {
        nombreCategoria = nombre;
        swal("Ingresa el gasto de la categoría:" + nombreCategoria, {
            content: "input",
          })
          .then((gasto) => {
            gastoCategoria = parseFloat(gasto);
            if (!Number(gasto)) {
                swal("Error","El gasto debe ser un número vuelva a intentarlo",{icon: "error"});
            }else {
                agregarCategoriaUser (nombreCategoria, gastoCategoria);
              
            }
          });
      });
}

function agregarCategoriaUser (nombre, gasto) {
    let categoria = new Categoría(nombre, gasto);
    swal("Genial","Categoría agregada correctamente con el nombre: " + nombre + " y el gasto: " + gasto, {icon: "success"});
    categoriasUser.push(categoria);
    console.log(categoriasUser);
    mostrarCategoriasUser(categoriasUser);
    
}

function mostrarCategoriasUser (categoriasUser) {
    let mostrar = "";
    categoriasUser.forEach(categoria => {
        mostrar += `
        <div class="categoria">
        <p>ID: ${categoria.id}</p>
        <p>Nombre: ${categoria.nombre}</p>
        <p>Gasto: ${categoria.gasto}</p>
        </div>
        `
    });
    apartadoGastos.innerHTML = mostrar;
}

function eliminarCategoria () {
    let idCategoria;
    if (categoriasUser.length === 0) {
        swal("Error","No hay categorías agregadas para eliminar",{icon: "error"});
    }else {
        swal("Ingresa el ID de la categoría que deseas eliminar:", {
            content: "input",
        })
        .then((id) => {
            idCategoria = parseInt(id);
            if (!Number(id)) {
                swal("Error","El ID debe ser un número vuelva a intentarlo",{icon: "error"});
            }else {
                eliminarCategoriaUser(idCategoria);
            }
        });
    }
}

function eliminarCategoriaUser (id) {
    categoriasUser.find( categoria =>{
        if (categoria.id === id) {
            index = categoriasUser.indexOf(categoria);
            console.log(categoriasUser.length+ " arreglo completo " + categoria.nombre);
            console.log("hey estoy en esta pos", index);

            categoriasUser.splice(index, 1);
         
            swal("Genial","Categoría eliminada correctamente", {icon: "success"});
            console.log(categoriasUser.length+ "arreglo eliminando");
            mostrarCategoriasUser(categoriasUser);
        }else{
            swal("Error","El ID no existe vuelva a intentarlo",{icon: "error"});
        }
    })

}

function calcularGastos () {
    let gastosTotal = 0;
    if (categoriasUser.length === 0) {
        swal("Error","No hay categorías agregadas para calcular tu gasto",{icon: "error"});
    }else{
        categoriasUser.forEach(categoria => {
        
            gastosTotal += categoria.gasto;
        });
        swal("Genial","El gasto total que tienes es de : " + gastosTotal, {icon: "success"});
    }

}

function buscarGasto () {
    let idCategoria;
    if (categoriasUser.length === 0) {
        swal("Error","No hay categorías agregadas para buscarla",{icon: "error"});
    }else {
    swal("Ingresa el ID de la categoría que deseas buscar:", {
        content: "input",
      })
      .then((id) => {
        idCategoria = parseInt(id);
        if (!Number(id)) {
            swal("Error","El ID debe ser un número vuelva a intentarlo",{icon: "error"});
        }else {
            buscarCategoriaUser(idCategoria);
        }
      });
    }
}
function buscarCategoriaUser (id) {
    categoriasUser.find( categoria =>{
        if (categoria.id === id) {
            swal("Genial","La categoría que buscas es: " + categoria.nombre + " y el gasto es: " + categoria.gasto, {icon: "success"});
        }else{
            swal("Error","La categoria que vuscas no existe vuelve a intentarlo",{icon: "error"});
        }
    })

}

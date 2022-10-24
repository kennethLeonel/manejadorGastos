
let nombreUsuario;
let categoriasUser = JSON.parse(localStorage.getItem("categoriasUsuario")) || [];
let titulo = document.getElementById("titulo");  

if(JSON.parse(localStorage.getItem("nombreUsuario")) ===""){
    localStorage.clear();
}

// se obtiene el boton de agregar categoría
const botonAgregar = document.getElementById("agregar");
botonAgregar.addEventListener("click", agregarCategoria);

// se obtiene el boton de eliminar categoría
const botonEliminar = document.getElementById("eliminar");
console.log(botonEliminar);
botonEliminar.addEventListener("click", eliminarCategoria);

// se obtiene el div para mostrar las categorías agregadas por el usuario
const apartadoGastos = document.getElementsByClassName("gastosUser")[0];
console.log(apartadoGastos);
// se obtiene el boton de calcular gastos total del usuario
const botonCalcular = document.getElementById("calcular");
botonCalcular.addEventListener("click", calcularGastos);

const botonBuscarGasto = document.getElementById("detallar");
botonBuscarGasto.addEventListener("click", buscarGasto);

const botonCache = document.getElementById("cache");
botonCache.addEventListener("click", borrarCache);


//constructor
function Categoría(nombre, gasto) {
    if (categoriasUser.length === 0) {
        this.id = 1;
    } else {
        let indice = categoriasUser.length - 1;
        this.id = categoriasUser[indice].id + 1;
    }
    this.nombre = nombre;
    this.gasto = gasto;
}

if (JSON.parse(localStorage.getItem("nombreUsuario")) === null || JSON.parse(localStorage.getItem("nombreUsuario")) === "") {
    swal("Bienvenido a tu gestor de gastos", {
        text: "¿Como te llamas?",
        content: "input",
    }).then((value) => {
        nombreUsuario = value;
        nombreUsuario = String(nombreUsuario).charAt(0).toUpperCase() + String(nombreUsuario).slice(1);
        localStorage.setItem("nombreUsuario", JSON.stringify(nombreUsuario));
        console.log(localStorage.getItem("nombreUsuario"));

        if (JSON.parse(localStorage.getItem("nombreUsuario")) === "" || JSON.parse(localStorage.getItem("nombreUsuario")) === null) {
            swal("Entraste en modo incognito", { icon: "info", timer: 3000 });
            titulo.innerHTML = "Gatos del usuario en modo incognito";
            localStorage.clear();
        
        } else {
        
            titulo.innerHTML = "Estos son tus gastos : " + JSON.parse(localStorage.getItem("nombreUsuario") )+ " !";
            swal("Hola " + JSON.parse(localStorage.getItem("nombreUsuario")) + " !", "Disfruta de la mejor forma de saber tus gastos financieros", {
                icon: "success",
                timer: 3000
            });
        
        }

    })
}else{
        titulo.innerHTML = "Estos son tus gastos : " + JSON.parse(localStorage.getItem("nombreUsuario") )+ " !";
        swal("Hola " + JSON.parse(localStorage.getItem("nombreUsuario")) + " !", "Disfruta de la mejor forma de saber tus gastos financieros", {
            icon: "success",
            timer: 3000
        });
       let datos = JSON.parse(localStorage.getItem("categoriasUsuario"));
        mostrarCategoriasUser(datos);  
}





function agregarCategoria() {
    let nombreCategoria;
    let gastoCategoria;
    let hayPuntoOComa = false;

    swal("Ingresa el nombre de la categoría:", {
        content: "input",
    })
        .then((nombre) => {
            nombreCategoria =String(nombre).charAt(0).toUpperCase() + String(nombre).slice(1);
      
            if (nombreCategoria === "" || nombreCategoria === null) {
                swal("Error", "El nombre no puede estar vacío vuelva a intentarlo", { icon: "error" });
            } else {
                let disponible = corroborarNombre(nombreCategoria);
                console.log(disponible);
                if (disponible) {
                    swal("Ingresa el gasto de la categoría:" + nombreCategoria, {
                        content: "input",
                    })
                        .then((gasto) => {
                            for (let i = 0; i < String(gasto).length; i++) {
                                if (gasto[i] === "." || gasto[i] === ",") {
                                    hayPuntoOComa = true;
                                }

                            }
                            if (hayPuntoOComa) {
                                swal("Error", "El gasto debe ser un número sin puntos '.' o comas ',' ", { icon: "error" });
                            } else {
                                gastoCategoria = parseFloat(gasto);
                                if (!Number(gastoCategoria)) {
                                    swal("Error", "El gasto debe ser un número vuelva a intentarlo", { icon: "error" });
                                } else {
                                    console.log(gastoCategoria);
                                    agregarCategoriaUser(nombreCategoria, gastoCategoria);

                                }
                            }
                        });
                }
                else {
                    swal("Error", "El nombre de la categoría ya existe, ingresa una categoría diferente", { icon: "error" });
                }
            }


        });
}

function agregarCategoriaUser(nombre, gasto) {
    let categoria = new Categoría(nombre, gasto);
    swal("Genial", "Categoría agregada correctamente con el nombre: " + nombre + " y el gasto: " + gasto, { icon: "success" });
    categoriasUser.push(categoria);

    localStorage.setItem("categoriasUsuario", JSON.stringify(categoriasUser));
    console.log(categoriasUser);
    mostrarCategoriasUser(JSON.parse(localStorage.getItem("categoriasUsuario")));

}

function mostrarCategoriasUser(categoriasUser) {
     
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

function eliminarCategoria() {
    let arregloStorage =JSON.parse(localStorage.getItem("categoriasUsuario"));
    let idCategoria;
    if (arregloStorage.length === 0) {
        swal("Error", "No hay categorías agregadas para eliminar", { icon: "error" });
    } else {
        swal("Ingresa el ID de la categoría que deseas eliminar:", {
            content: "input",
        })
            .then((id) => {
                idCategoria = parseInt(id);
                if (!Number(id)) {
                    swal("Error", "El ID debe ser un número vuelva a intentarlo", { icon: "error" });
                } else {
                    eliminarCategoriaUser(idCategoria);
                }
            });
    }
}

function eliminarCategoriaUser(id) {
    let categoriasUsuario = JSON.parse(localStorage.getItem("categoriasUsuario"));
    categoriasUsuario.find(categoria => {
        if (categoria.id == id) {
            index = categoriasUsuario.indexOf(categoria);
            console.log(categoriasUsuario.length + " arreglo completo " + categoria.nombre);
            console.log("hey estoy en esta pos", index);

            categoriasUsuario.splice(index, 1);
            // Volvemos a guardar el arreglo en el local storage
            localStorage.setItem("categoriasUsuario", JSON.stringify(categoriasUsuario));

            swal("Genial", "Categoría eliminada correctamente", { icon: "success" });
            mostrarCategoriasUser(categoriasUsuario);
        } else {
            swal("Error", "El ID no existe vuelva a intentarlo", { icon: "error" });
        }
    })

}

function calcularGastos() {
    let gastosTotal = 0;
    let arregloStorage =JSON.parse(localStorage.getItem("categoriasUsuario"));
    if (arregloStorage.length === 0) {
        swal("Error", "No hay categorías agregadas para calcular tu gasto", { icon: "error" });
    } else {

        arregloStorage.forEach(categoria => {

            gastosTotal += categoria.gasto;
        });
        swal("Genial", "El gasto total que tienes es de : " + gastosTotal, { icon: "success" });
    }

}

function buscarGasto() {
    let nombreCategoriaABuscar;
    let arregloStorage = JSON.parse(localStorage.getItem("categoriasUsuario"));
    if (arregloStorage.length === 0) {
        swal("Error", "No hay categorías agregadas para buscarla", { icon: "error" });
    } else {
        swal("Ingresa el nombre de la categoría que deseas buscar:", {
            content: "input",
        })
            .then((valor) => {
                console.log(valor);
                nombreCategoriaABuscar = valor;
                if (nombreCategoriaABuscar === "" || nombreCategoriaABuscar === null) {
                    swal("Error", "El nombre de la categoría no puede ser vacio", { icon: "error" });
                } else {
                    buscarCategoriaUser(nombreCategoriaABuscar);
                }
            });
    }
}
function buscarCategoriaUser(nombre) {
    categoriaBuscada = categoriasUser.find(categoria => {
        if (categoria.nombre.includes(nombre)) {
            return categoria;
        }
    });
    console.log(categoriaBuscada);
    if (categoriaBuscada) {
        swal("Genial", "La categoría que buscas es: " + categoriaBuscada.nombre + " Que tiene un gasto de " + categoriaBuscada.gasto, { icon: "success" });
    } else {
        swal("Error", "La categoría que buscas no existe", { icon: "error" });
    }

}

function corroborarNombre(nom) {

    if (categoriasUser.length === 0) {
        return true;
    } else {
        let disponible = true;
        categoriasUser.forEach(categoria => {
            if (categoria.nombre === nom) {
                disponible = false;
            }
        });
        return disponible;
    }
}

function borrarCache(){ 
    localStorage.clear();
    swal({ 
        title: "Genial",    
        icon: "success" ,
        showConfirmButton: false,
        timer: 4000,
        text: "Se ha borrado el cache correctamente"

    });
    setTimeout(function(){ location.reload(); }, 4000);
  
}

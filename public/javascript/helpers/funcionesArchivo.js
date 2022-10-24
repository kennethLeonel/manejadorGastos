
const fs = require('fs');




const datos = {
    leer : function(){

        let archivo = fs.readFileSync('../../db/db.json', 'utf8'); 
        return JSON.parse(archivo);
    }
}


module.exports = datos;
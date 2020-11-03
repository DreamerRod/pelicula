var mongoose = require("./connect");
var peliculaSchema = new mongoose.Schema({
    titulo : String,
    descripcion : String,
    foto_de_portada : {
		pathfile:String,
		relativepath:String
	},
	foto_principal : {
		pathfilep:String,
		relativepathp:String
	},
    sinopsis : String,
    idioma : String,
    rating: Number,
    lista_servidores:[]
});

var pelicula = mongoose.model("pelicula", peliculaSchema);
module.exports = pelicula;
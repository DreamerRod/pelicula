var mongoose = require("./connect");
var peliculaAdmiSchema = new mongoose.Schema({
    usuario : String,
    pass : String,
    permisos:{
    	method:[],
    	services:[]
    }
});

var usuario = mongoose.model("usuario", peliculaAdmiSchema);
module.exports = usuario;
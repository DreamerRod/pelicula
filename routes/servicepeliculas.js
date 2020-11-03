var express = require('express');
var router = express.Router();
var Pelicula = require("../database/pelicula");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');
var validacion=require('./validarPeliculas');
//var middleware=require('./middleware');


//SERVICIO POST
router.post('/pelicula'/*,midleware*/, async(req, res)  => {
    var params = req.body;
    /*if (Object.keys(params).length<=0) {
            res.status(403).json({
            msn: "se requiere datos"
        });
        return;
    }
    var datos=[];
    console.log(Object.keys(params));
    console.log(Object.keys(params).length);
    datos=Object.keys(params);
    for (var i =0;i< datos.length; i++) {
       if (datos[i]==""||datos[i]==null) {
            res.status(403).json({
            msn: "se requiere datos"
        });
            return;
        }
    }*/
    if (validacion.validarPeli(params,Pelicula.schema.obj)!="true") {
            res.status(403).json(validacion.validarPeli(params,Pelicula.schema.obj));
            return;
    }
    var peliculanueva = new Pelicula(params);
    var result = await peliculanueva.save();

    res.status(200).json(result);
});

//SERVICIO GET

router.get("/pelicula"/*,midleware*/, (req, res) => {
    var params = req.query;
    //console.log(params);
    var limit = 100;
    if (params.limit != null && parseInt(params.limit)>0) {
    limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
    if (params.order == "desc") {
    order = -1;
    } else if (params.order == "asc") {
    order = 1;
    }
    }
    var skip = 0;
    if (params.skip != null&& parseInt(params.skip)>=0) {
    skip = parseInt(params.skip);
    }
    Pelicula.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
    res.status(200).json(docs);
     });
 });

 //SERVICIO PATCH
 router.patch("/pelicula"/*,midleware*/, (req, res) => {
    if (req.query.id == null) {
    res.status(300).json({msn: "El parámetro ID es necesario"});
    return;
    }
    var id = req.query.id;
    var params = req.body;
    Pelicula.findOneAndUpdate({_id: id}, params, (err, docs) => {
    res.status(200).json(docs);
    });
});

//SERVICIO PUT 

router.use(fileUpload({
    fileSize: 5 * 1024 * 1024
}));
router.put("/updatefotoprincipal"/*,midleware*/, (req, res) => {

    var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    console.log(req.files.file);
    var image = req.files.file;
    var path = __dirname.replace(/\/routes/g, "/fotoprincipal");
    console.log(path);
    var date = new Date();
    var foto  = sha1(date.toString()).substr(0, 5);
    //console.log(' datos  ');
    //console.log(req.files);
    //console.log(Object.keys(req.files.file));

    var totalpath = path + "/" + foto + "_" + image.name.replace(/\s/g,"_");
    console.log(totalpath);
    image.mv(totalpath, (err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var obj = {};
        obj["pathfilep"] = totalpath;
        //obj["hash"] = totalpath;
        obj["relativepathp"] = "/getfile/?id=" + totalpath; //obj["hash"];
        //console.log(obj);
        var objhelp={};
        objhelp['foto_principal']=obj;
        Pelicula.update({_id:  params.id}, {$set: objhelp /*updateobjectdata*/}, (err, docs) => {
		if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
        } 
        res.status(200).json(docs);
    	});
    });
});

router.put("/updatefotoportada"/*,midleware*/, (req, res) => {
    var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    var image = req.files.file;
    var path = __dirname.replace(/\/routes/g, "/fotoportada");
    console.log(path);
    var date = new Date();
    var foto  = sha1(date.toString()).substr(0, 5);
    var totalpath = path + "/" + foto + "_" + image.name.replace(/\s/g,"_");
    console.log(totalpath);
    image.mv(totalpath, (err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var obj = {};
        obj["pathfile"] = totalpath;
        //obj["hash"] = totalpath;
        obj["relativepath"] = "/getfilePortada/?id=" + totalpath; //obj["hash"];
        console.log(obj);
        var objhelp2={};
        objhelp2['foto_de_portada']=obj;
        Pelicula.update({_id:  params.id}, {$set: objhelp2 /*updateobjectdata*/}, (err, docs) => {
		if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
        } 
        res.status(200).json(docs);
    	});
    });
});
 //aun en duda
router.put("/peliculaUser"/*,midleware*/, async(req, res) => {
    var params = req.query;
    var datos = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }

    var changed = ["titulo", "sinopsis", "idioma","lista_servidores"];
    var keys = Object.keys(datos);
    var actualizardato = {};
    for (var i = 0; i < keys.length; i++) {
        if (changed.indexOf(keys[i]) > -1) {
            if (datos[keys[i]]=="idiomas") {
                /*for (var j = 0; j < datos[keys[i]].length; j++) {
                    actualizardato[keys[i]]=datos[keys[i]][j];
                }*/
            } else {
                actualizardato[keys[i]] = datos[keys[i]];
            }
        }
    }
    Pelicula.update({_id:  params.id}, {$set: actualizardato}, (err, docs) => {
       if (err) {
           res.status(500).json({msn: "Existen problemas al actualizar en la base de datos"});
            return;
        } 
        res.status(200).json(docs);
    });

});


//SERVICIO DELETE

router.delete("/pelicula"/*,midleware*/, async(req, res) => {
    if (req.query.id == null) {
       res.status(300).json({
      msn:"id no existe"
    });
       return;
    }
    var usuario =  await Pelicula.find({_id: req.query.id});
    if (usuario==0) {
        res.status(500).json({
            msn: "no existe"
        });
        return;
    }
    var r = await Pelicula.remove({_id: req.query.id});
   res.status(300).json(r);
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/getfile"/*,midleware*/, async(req, res, next) => {
    var params = req.query;
    if (params.id == null||params.id=="") {
        res.status(300).json({
            msn: "Error es necesario un ID"
        });
        return;
    }
    var id = params.id;
    var imagenPeli =  await Pelicula.find({_id: id});
    //console.log((usuario [0].logo.pathfilel ));
    if (imagenPeli.length > 0) {
        var path = imagenPeli[0].foto_principal.pathfilep;
        if (path!=null) {
        res.sendFile(path);
        return;
    	}
    	else{
    		res.status(200).json(usuario[0]);
        	return;
    	}
    }
    res.status(300).json({
        msn: "Error en la petición"
    });
    return;
});

router.get("/getfilePortada"/*,midleware*/, async(req, res, next) => {
    var params = req.query;
    if (params.id == null||params.id=="") {
        res.status(300).json({
            msn: "Error es necesario un ID"
        });
        return;
    }
    var id = params.id;
    var imagenPeli =  await Pelicula.find({_id: id});
    //console.log((usuario [0].logo.pathfilel ));
    if (imagenPeli.length > 0) {
        var path = imagenPeli[0].foto_de_portada.pathfile;
        if (path!=null) {
        res.sendFile(path);
        return;
        }
        else{
            res.status(200).json(usuario[0]);
            return;
        }
    }
    res.status(300).json({
        msn: "Error en la petición"
    });
    return;
});

  
module.exports = router;

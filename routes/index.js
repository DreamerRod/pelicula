var express = require('express');
var router = express.Router();
var USER = require("../database/users");
var validacion=require('./validarUser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/usuario'/*,midleware*/, async(req, res)  => {
    var params = req.body;
    if (validacion.validarUsuario(params,USER.schema.obj)!="true") {
            res.status(403).json(validacion.validarUsuario(params,USER.schema.obj));
            return;
    }
    var usuario = new USER(params);
    var result = await usuario.save();

    res.status(200).json(result);
});
router.post("/login", async(req,res)=>{
    var datos = req.body;
    if (datos.usuario == null) {
        res.status(300).json({msn: "El usuario es necesario"});
             return;
    }
    if (datos.pass == null) {
        res.status(300).json({msn: "La contraseña es necesaria"});
        return;
    }
    var results = await USER.find({usuario: datos.usuario, pass: datos.pass});
    if (results.length == 1) {
        //console.log(results);
        var token = JWT.sign({
            exp: Math.floor(Date.now() / 1000)*(60*60),
            data: results[0].id
        },'contraseña');
        console.log(token);
        res.status(200).json({msn: "Bienvenido " + datos.usuario , token:token });
        return;
    }

    res.status(200).json({msn: "credenciales incorrectas"});
});

module.exports = router;

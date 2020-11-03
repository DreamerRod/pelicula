var validarUser ={
	validarUsuario: function(Datos, dbDatos) {
		var msn="";
		for (var i = 0; i < Object.keys(dbDatos).length; i++) {
			var cont=0;
			for (var j = 0; j < Object.keys(Datos).length; j++) {
				if (Object.keys(Datos)[j]==Object.keys(dbDatos)[i]) {
					cont++;
				}
			}
			if (Object.keys(dbDatos)[i]=="permisos") {
				cont++;
			}
			if (cont==0) {
				msn=msn+Object.keys(dbDatos)[i]+" no existe - ";
			}
		}
		if (msn!="") {
			msn="añadir datos: "+msn;
			return msn;
		}
		if (Datos.usuario!=""&&Datos.usuario!=null) {
			if (Datos.pass!=""&&Datos.pass!=null) {
				if (Datos["permisos"]==""||Datos["permisos"]==null) {
                    var acceso={};
                    acceso["method"]=["POST","GET","PATCH","PUT","PUT","PUT","DELETE","GET","GET"]
                    acceso["services"]=["pelicula","pelicula","pelicula","updatefotoprincipal","updatefotoportada","peliculaUser","pelicula","getfile","getfilePortada"]
                    Datos["permisos"]=acceso;
                }else {
                    msn="no puede añadir los permisos sin administracion";
                    return msn;
                }
				if (Datos["permisos"]!=""&&Datos["permisos"]!=null) {
					msn="true";
					return msn;
				} else {
					msn="no se pudo añadir los datos extra";
					return msn;
				}
			} else {
				msn="debe añadir la contraseña";
				return msn;
			}
		} else {
			msn="debe añadir el usuario";
			return msn;
		}
	},
};
module.exports = validarUser;
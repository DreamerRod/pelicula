var validar ={
	validarPeli: function(Datos, dbDatos) {
		var msn="";
		for (var i = 0; i < Object.keys(dbDatos).length; i++) {
			var cont=0;
			for (var j = 0; j < Object.keys(Datos).length; j++) {
				if (Object.keys(Datos)[j]==Object.keys(dbDatos)[i]) {
					cont++;
				}
			}
			if (Object.keys(dbDatos)[i]=="foto_principal") {
				cont++;
			}
			if (Object.keys(dbDatos)[i]=="foto_de_portada") {
				cont++;
			}
			if (Object.keys(dbDatos)[i]=="rating") {
				cont++;
			}
			if (Object.keys(dbDatos)[i]=="lista_servidores") {
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
		if (Datos.titulo!=""&&Datos.titulo!=null) {
			if (Datos.descripcion!=""&&Datos.descripcion!=null) {
				if (Datos.sinopsis!=""&&Datos.sinopsis!=null) {
					if (Datos.idioma!=""&&Datos.idioma!=null) {
						if (Datos.rating!=""&&Datos.rating!=null) {
							/*if (sendDatos.lista_servidores==""||sendDatos.lista_servidores==null) {
								var coordenadas={};
								coordenadas['log']=sendDatos.longitud;
								coordenadas['lat']=sendDatos.latitud;
								sendDatos["lista_servidores"]=coordenadas;
							}*/
							if (Datos.lista_servidores!=""&&Datos.lista_servidores!=null) {
								if (Datos.foto_de_portada!=""||Datos.foto_de_portada!=null) {
									if (Datos.foto_principal!=""||Datos.foto_principal!=null) {
										msn="true";
										return msn;
									} else {
										msn="debe añadir la foto_principal";
										return msn;
									}
								} else {
									msn="debe añadir el foto_de_portada";
									return msn;
								}
							} else {
								msn="debe añadir la ubicacion";
								return msn;
							}
						} else {
							msn="debe añadir el rating";
							return msn;
						}
					} else {
						msn="debe añadir la idioma";
						return msn;
					}
				} else {
					msn="debe añadir el sinopsis";
					return msn;
				}
			} else {
				msn="debe añadir el descripcion";
				return msn;
			}
		} else {
			msn="debe añadir el titulo";
			return msn;
		}
	},
};
module.exports = validar;
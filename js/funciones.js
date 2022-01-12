// Determinar campos vacios
function descripEmpty(id) {
    var descripcion = document.getElementById(id).value;
    if(restriccionPalabras(descripcion)){
        document.getElementById(id).className = 'form-control form-control-lg is-invalid';
        return(false);
    };
    if (descripcion == '') {
        document.getElementById(id).className = 'form-control form-control-lg is-invalid';
        return false;
    }
    else {
        document.getElementById(id).className = 'form-control form-control-lg is-valid';
        return true;
    }
}
// prohibir palabras de origen sql
function restriccionPalabras(palabras){
    var Rev_Palabras= /(\W|^)(SELECT|DELETE|CREATE|ALTER|RENAME|INSERT|LOAD|TRUNCATE|DROP|UPDATE|DO|DESCRIBE|USE|TRANSACTION|ROLLBACK|LOCK|UNLOCK|SET|SHOW|JOIN|INNER|FROM|WHERE|TABLES|INTO)(\W|$)/i;
    if(Rev_Palabras.test(palabras)){
        alertify.dialog('alert').set({transition:'zoom',message: 'No se puede utilizar estas palabras'}).show();
    };
    return (Rev_Palabras.test(palabras));
}

/* Validar run y setear a 11.111.111-1*/

function validarRut(run) {
    // var rutString = document.getElementById(run).value;
    var r = document.getElementById(run).value;
    if (r == '' || r == 0) {
        document.getElementById(run).className = 'form-control form-control-lg is-invalid';
        return false
    };
    r = r.trim();
    r = r.toLowerCase();
    if ((r.indexOf(" ") > -1) || (r.indexOf(".") > -1) || (r.indexOf("-") > -1) || ((r.indexOf(".") > -1) && (r.indexOf("-") > -1)) || ((r.indexOf(".") > -1) && (r.indexOf("-") > -1) && (r.indexOf(" ") > -1))) {
        r = elimPunGui(r);
    }
    rutString = r;
    if (r.length < 9) {
        r = "0" + r;
    }
    if (r.length > 9) {
        document.getElementById(run).className = 'form-control form-control-lg is-invalid';
        return false
    };
    rut = r.substr(0, 8);
    dv = r.charAt(r.length - 1);


    let dvs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'k', 'K'];
    var num = /^([0-9]+|[0-9]+[k])*$/
    if (num.test(r)) {

        if (!isNaN(rut)) {
            if (dvs.includes(dv)) {
                let _dv = calculaDv(rut);
                if (dv == _dv) {
                    document.getElementById(run).className = 'form-control form-control-lg is-valid';

                    if (rutString.length < 9) {
                        document.getElementById(run).value = rutString.substr(0, 1) + "." + rutString.substr(1, 3) + "." + rutString.substr(4, 3) + "-" + dv;
                        return true;
                    } else {
                        document.getElementById(run).value = rutString.substr(0, 2) + "." + rutString.substr(2, 3) + "." + rutString.substr(5, 3) + "-" + dv;
                        return true;
                    }
                } else {
                    document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

                    document.getElementById(run).className = 'form-control form-control-lg is-invalid';
                    return false;
                }
            } else {
                document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

                document.getElementById(run).className = 'form-control form-control-lg is-invalid';
                return false;
            }
        } else {
            document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

            document.getElementById(run).className = 'form-control form-control-lg is-invalid';
            return false;
        }
    }
    else {
        document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

        document.getElementById(run).className = 'form-control form-control-lg is-invalid';
        return false;
    }
}

function calculaDv(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? (S - 1).toString() : 'k';
}

function elimPunGui(n) {


    while (n.toString().indexOf(".") != -1) {
        n = n.toString().replace(".", "");
    }
    while (n.toString().indexOf("-") != -1) {
        n = n.toString().replace("-", "");
    }
    while (n.toString().indexOf(" ") != -1) {
        n = n.toString().replace(" ", "");
    }
    return n;


}


function setRun(run, dv) {
    // console.log(run.length < 8)
    if (run.length < 8) {
        var rut = run.substr(0, 1) + "." + run.substr(1, 3) + "." + run.substr(4, 3) + "-" + dv;
        return rut;
    } else {
        rut = run.substr(0, 2) + "." + run.substr(2, 3) + "." + run.substr(5, 3) + "-" + dv;
        return rut;
    }
}
/* ------------------------------------*/

/* Validar email */
function validarCorreo(correo) {
    var Rev_email = /^(([^<\>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (Rev_email.test(correo));
}

function revisarEmail(id) {
    var correo = document.getElementById(id).value;
    correo = correo.toLowerCase();
    validar = validarCorreo(correo);
    if (validar) {
        document.getElementById(id).className = 'form-control form-control-lg is-valid';
        document.getElementById(id).value = correo;
        return true;

    } else {
        document.getElementById(id).className = 'form-control form-control-lg is-invalid';
        document.getElementById(id).value = correo;

        return false;
    }
}

/* ------------------------------------*/
/* Validar Alias */

function validarAlias(id) {
	var alias = document.getElementById(id).value;
	
	
   //Comprobamos la longitud de caracteres
	if (alias.length>4){
        document.getElementById(id).className = 'form-control form-control-lg is-valid';

		return true;
	}
	else {
        document.getElementById(id).className = 'form-control form-control-lg is-invalid';

		return false;
		
	}
}


/* ------------------------------------*/
/*validar region y comunas*/
var RegionesYcomunas = {

    "regiones": [{
            "NombreRegion": "Arica y Parinacota",
            "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
        {
            "NombreRegion": "Tarapacá",
            "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    },
        {
            "NombreRegion": "Antofagasta",
            "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    },
        {
            "NombreRegion": "Atacama",
            "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    },
        {
            "NombreRegion": "Coquimbo",
            "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
    },
        {
            "NombreRegion": "Valparaíso",
            "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
    },
        {
            "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
            "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
        {
            "NombreRegion": "Región del Maule",
            "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
        {
            "NombreRegion": "Región del Biobío",
            "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
    },
        {
            "NombreRegion": "Región de la Araucanía",
            "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria", ]
    },
        {
            "NombreRegion": "Región de Los Ríos",
            "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
    },
        {
            "NombreRegion": "Región de Los Lagos",
            "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
    },
        {
            "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
            "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
    },
        {
            "NombreRegion": "Región de Magallanes y de la AntárVca Chilena",
            "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    },
        {
            "NombreRegion": "Región Metropolitana de Santiago",
            "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
    }]
}


jQuery(document).ready(function () {

var iRegion = 0;
var htmlRegion = '<option value="sin-region">Seleccione región</option><option value="sin-region">--</option>';
var htmlComunas = '<option value="sin-region">Seleccione comuna</option><option value="sin-region">--</option>';

jQuery.each(RegionesYcomunas.regiones, function () {
    htmlRegion = htmlRegion + '<option value="' + RegionesYcomunas.regiones[iRegion].NombreRegion + '">' + RegionesYcomunas.regiones[iRegion].NombreRegion + '</option>';
    iRegion++;
});

jQuery('#regiones').html(htmlRegion);
jQuery('#comunas').html(htmlComunas);

jQuery('#regiones').change(function () {
    var iRegiones = 0;
    var valorRegion = jQuery(this).val();
    var htmlComuna = '<option value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
    jQuery.each(RegionesYcomunas.regiones, function () {
        if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
            var iComunas = 0;
            jQuery.each(RegionesYcomunas.regiones[iRegiones].comunas, function () {
                htmlComuna = htmlComuna + '<option value="' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '">' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '</option>';
                iComunas++;
            });
        }
        iRegiones++;
    });
    jQuery('#comunas').html(htmlComuna);
});
jQuery('#comunas').change(function () {
    if (jQuery(this).val() == 'sin-region') {
        alert('selecciones Región');
    } else if (jQuery(this).val() == 'sin-comuna') {
        alert('selecciones Comuna');
    }
});
jQuery('#regiones').change(function () {
    if (jQuery(this).val() == 'sin-region') {
        alert('selecciones Región');
    }
});

});
function validarSelectComuna(id){
    if(document.getElementById(id).value == 'sin-comuna'){
        document.getElementById(id).className = 'form-control form-control-lg is-invalid';
    }else{
        document.getElementById(id).className = 'form-control form-control-lg is-valid';
    };
}
function validarSelectRegion(id){
    if(document.getElementById(id).value == 'sin-region'){
        document.getElementById(id).className = 'form-control form-control-lg is-invalid';
    }else{
        document.getElementById(id).className = 'form-control form-control-lg is-valid';
    };
}
/*-----------------------*/
function validarMinimoSelect(){

    


}

function contarChek(id,countCheck){
    console.log(id);
    var idSelect = "#"+id;
    if(document.getElementById(id).checked == true){
        console.log(idSelect);
        countCheck++;
        console.log(idSelect);
    }else{
        console.log(idSelect);
        countCheck--;
        console.log(idSelect);
    }
}



function validarVotacion(){



        datos = $('#form1').serialize();
        console.log(datos);

        $.ajax({
            type: "POST",
            data: datos,
            url: "procesos/registarVoto.php",        
            beforeSend: function(){
                $('#btnVoto').prop({ disabled: true }).text("Trabajando...");
            },
            success: function (r) {
                
            
            }
        });

}
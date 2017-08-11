"use strict";
const render = (root) =>{
   root.empty();
   const section = $('<div class="cont_App"></div>');
   section.append(header( _ => render(root)));

   if (state.page == null) {
    section.append(welcome( _ => render(root)));
  } else if (state.page == 1) {
    section.append(reloj( _ => render(root)));
  } else if (state.page == 2) {
    section.append(asistOk( _ => render(root)));
  } else if (state.page == 3) {
    section.append(Tardanza( _ => render(root)));
  } else if (state.page == 4) {
    section.append(Home( _ => render(root)));
  } else if (state.page == 5) {
    section.append(Falta( _ => render(root)));
  } else if (state.page == 6) {
    section.append(justificacion( _ => render(root)));
  } else if (state.page == 7) {
    section.append(mensaje( _ => render(root)));
  } else if (state.page == 8) {
    section.append(AlePantalla ( _ => render(root)));
  }

  root.append(section);
};

const update = function (){
  render(root);
};

const state = {
  data: null,
  user: null,
  dia: new Date()
};


$( _ => {
    getJSON("https://sheetsu.com/apis/v1.0/8392c0c102f9",(err,json)=> {
        if (err) { return alert(err.message);}
        console.log(json);
        state.data = json;

        const root = $('.root');
        render(root);
    });
});

const header = (update) => {

  const cont_header =$('<header><div class="container"><div class="row">'+
                       '<div class="col s12 center-align"><img src="assets/img/logo.svg" width=220px alt="logo"></div></div></div></header>');
  return cont_header ;
}


const welcome = (update) => {
    const cont_welcome =$('<section class="container center-align cont_welcome"></section>');
    const title =$('<h4 class="center" >Bienvenido a la App de Asistencia <br>Ingresa a tu cuenta </h4>');
    cont_welcome.append(title);
    const cont_form = $('<div class="container"></div>');
    cont_welcome.append(cont_form);
    const form =$('<div  class="row login" id="new_user"></div>');
    cont_form.append(form);
    const forminput =$('<div class="col s10 push-s1"></div>');
    form.append(forminput);
    const var_user =$('<div class="left-align"></div>');
    const label_user =$('<label class="text_label" for="user_code">Usuario</label>');
    const input_user =$('<input class="in_lab" autofocus="autofocus" placeholder="Código Laboratoria" type="text"  id="user_code">');
    forminput.append(var_user);
    var_user.append(label_user);
    var_user.append(input_user);
    const var_pas = $('<div class="left-align"></div>');
    const label_pas = $('<label class="text_label" for="user_password">Contraseña</label>');
    const input_pas = $('<input class="in_lab" autofocus="autofocus" placeholder="Contraseña" type="password"  id="user_password">');
    forminput.append(var_pas);
    var_pas.append(label_pas);
    var_pas.append(input_pas);

    const div_lost =$ ('<div></div>');
    const error =$('<p id="msjErrorR"></p>');
    const lost_pas=$('<a href="#" class="active">Olvide mi contraseña</a>');
    div_lost.append( error,lost_pas);
    forminput.append(div_lost);
    const div_btn =$('<div class="form-actions"></div>');
    const btn_enviar = $('<button id="btnEnviar" class="btn primary disabled btn-amarillo-lab">Ingresar</button>');
    forminput.append(div_btn);
    div_btn.append(btn_enviar);

    var filtrados=[];
    input_user.on('keyup',(e) => {
      if(input_user.val() !=""){
        btn_enviar.removeClass("disabled");
        Verificar(input_pas.val());
      } else {
        btn_enviar.addClass("disabled");
      }
    });
    //
    input_pas.on('keyup',(e) => {
      if(input_pas.val() != "" ){
        btn_enviar.removeClass("disabled");
      } else {
        btn_enviar.addClass("disabled");
      }
    });
    var sup_user = "Alejandra";
    var sup_pas = "1234";
    btn_enviar.on('click',(e) =>{
      e.preventDefault();
      filtrados = filterByEmail(state.data ,input_user.val());

      state.user = filtrados[filtrados.length-1];
      var ActualDay =   Reingreso();
      console.log(Reingreso());
      console.log(state.user);

      if ( input_user.val() == sup_user && input_pas.val() == sup_pas){
        state.page = 8;
        update();
      } else {
          if (filtrados.length!=0  ){
              var password = state.user.Codigo;
              if (input_pas.val() == password) {
                  if(state.user.Dia != ActualDay){
                    ValidHora(update);
                  } else {
                    error.text('Usted ya está registrada el día de Hoy');
                  }
              } else {
                error.text("Contraseña Incorreta");
              }
          } else {
              error.text("Usuario no existe");
          }
      }
});
  return cont_welcome;
}

const reloj = (update) => {

  const cont_reloj =$('<section class="container cont_timer"></section>');
  const cont_title =$('<div class="welcome"></div>') ;
  const title =$('<p>Bienvenida <strong>'+ state.user.Coder +'</strong></p>');
  cont_title.append(title);
  cont_reloj.append(cont_title);

  const cont_timer =$('<div class="cont_clock"></div>');
  const cont_day =$('<div class="day"></div>');

  const cont_clock =$('<h1 class="clock"></h1>');
  const btn_present =$('<button type="button"  class="verde" id="btn_present" name="button" class="verde">Presente</button>');
  const  msjError  =$('<p id="msjError"></p>');
  cont_timer.append(cont_day);
  cont_timer.append(cont_clock);
  cont_timer.append(btn_present ,msjError );
  cont_reloj.append(cont_timer);

  const div_register =$ ('<div class="enlace"></div>');
  const enlace =$('<a href="#" class="active">Registrar ausencia</a>');
  div_register.append(enlace);
  cont_timer.append(div_register);
  var Horas,Fechas;

 function clock() {
   var time = new Date(),
     hours   = time.getHours(),
     minutes = time.getMinutes(),
     seconds = time.getSeconds(),
     dia     = time.getDate(),
     mes     = time.getMonth()+1,
     year    = time.getFullYear();
     Horas = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
     Fechas = harold(dia) + "/" + harold(mes) + "/" + year;
      $('.day').text(harold(dia) + "/" + harold(mes) + "/" + year);
      $('.clock').text(harold(hours) + ":" + harold(minutes) + ":" + harold(seconds));

 };

 var interval = setInterval(clock, 1000);

 btn_present.on('click', (e) =>{
     clearInterval(interval);
    e.preventDefault();
    ValidPuntualidad(update);
 });

  enlace.on('click', (e) =>{
    e.preventDefault();
    console.log(Fechas);
    if (Fechas != undefined && Horas!= undefined){
      clearInterval(interval);
      state.user.Estado ="Ausente";
      // state.user.Dia = Fechas;
      state.user.Hora = Horas;
      state.page = 5;
      update();
    }
  });

  return cont_reloj;
};

const asistOk = (update) => {
  console.log(state.time);

  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$('<div class="title_asis"></div>') ;
  const title =$('<p class="negrita">'+state.user.Coder+'</p><p> Tu asistencia fue registrada a las :</p>');
  const hora = $('<p>'+ state.time +'</p>');
  cont_title.append(title);
  cont_title.append(hora);
  cont_asisOK.append(cont_title);
  const cont_check =$('<div class="cont_asist col s6 push-s3"></div>');
  const cont_radio =$('<div class="radio-check"></div>');
  const cont_img =$('<i class="large material-icons">check</i>');

  cont_asisOK.append(cont_check);
  cont_radio.append(cont_img);
  cont_check.append(cont_radio);

  const div_enlaces =$('<div class="cont_btn col s10 push-s1"></div>');
  const btn_home =$('<button type="button"  id="btn_present" name="button" class="primary">IR AL HOME</button>');
  const div_register =$ ('<div class="enlace"></div>');
  const enlace =$('<a href="#" class="active">Ver asistencias</a>');

  div_enlaces.append(btn_home)
  div_register.append(enlace);
  div_enlaces.append(div_register);
  cont_asisOK.append(div_enlaces);

  btn_home.on('click', (e) =>{
    e.preventDefault();
     state.page = 4;
     update();
  });
  container_OK.append(cont_asisOK);
  return container_OK ;
}

'use strict';

const Tardanza = (update) => {

	const container = $('<div class="container"></div>');
	const row = $('<div class="row "></div>');
	const title = $('<h4 class="center-align">'+ state.user.Coder +'</h4><p>, ¿Cuál es el motivo de tu tardanza?</p>');
	const form = $('<div class="col s12 left-align"></div>');
	const p1 = $('<p></p>');
	const p2 = $('<p></p>');
	const p3 = $('<p></p>');
	const input1 = $('<input type="radio" id="tardanza-1" value="Tráfico" class="with-gap" name="tardanza-justificacion" required checked>');
	const input2 = $('<input type="radio" id="tardanza-2" value="Me quede dormida" class="with-gap" name="tardanza-justificacion">');
	const input3 = $('<input type="radio" id="tardanza-3" value="Otros" class="with-gap" name="tardanza-justificacion">');
	const label1 = $('<label for="tardanza-1">Tráfico</label>');
	const label2 = $('<label for="tardanza-2">Me quedé dormida</label>');
	const label3 = $('<label for="tardanza-3">Ninguna de las anteriores</label>');
	const add = $('<a class="museo-sanse add-message spacing">Agregar mensaje</a>')
	const field = $('<div class="input-field col s12"></div>');
	const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');

	p1.append(input1, label1);
	p2.append(input2, label2);
	p3.append(input3, label3);
	form.append(p1, p2, p3, add, field, button);
	row.append(title, form);
	container.append(row);

	add.on('click', (e) => {
		add.css('display', 'none');
		field.append(message);
	});

	button.on('click', (e) => {
		state.page = 7;
		state.user.Motivo=$('input[name=tardanza-justificacion]:checked').val() +':'+ message.val() ;
		Postregister();
		update();
	});
	return container
}

'use strict';

const Falta = (update) => {
	const container = $('<div class="container"></div>');
	const row = $('<div class="row center-align"></div>');
	const title = $('<h5 class="negrita">'+ state.user.Coder +' </h5><p>Cuéntale a Ale por qué no vendrás</p>');
	const form = $('<div class="col s12"></div>');
	const field = $('<div class="input-field col s12"></div>');
	const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');

	field.append(message);
	form.append(field, button);
	row.append(title, form);
	container.append(row);

	button.on('click', (e) => {
		state.user.Dia = PedirHora();
		state.user.Motivo = message.val() ;
		state.page = 4;
		Postregister();
		update();
	});

	return container
}

const Home = (update) => {
    const container = $('<div class="container"></div>');
    const row = $('<div class="row"></div>');
    const col1 = $('<div class="col s12"></div>');
    const col2 = $('<div class="col s12 bg-white"></div>');
    const col3 = $('<div class="col s12"></div>');
    const welcome = $('<p>Buen día '+ state.user.Coder  +'</p>');
		const salir = $('<a href="#" class="active">Salir</a>');
    const title = $('<p class="title text-center">Agenda</p>');
    let date = $('<div class="date-home text-center"></div>');
    const event = ["Hackathon", "Company Pitch - Rimac", "Hackathon, Coffee time", "Company Pitch - Everis", "Hackathon", "Hackathon, Coffee time", "Company Pitch - BBVA", "Hackathon, Coffee time", " Expo"];
    const schedule = ["00:01", "10:10", "10:20", "13:00", "13:10", "15:00", "16:40", "16:50", "18:00"];

    let ul = $('<ul class="diary"></ul>');

    for(var i = 0; i < schedule.length; i++){
        const li = $('<li><span class="schedule-home">'+schedule[i]+'</span>'+ " | " + event[i] +'</li>');
        ul.append(li);
    }

    function rules(param) {
        if (param < 10) {
            param = '0' + param
        }
        return param;
    }

    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth() +1;
    var year = time.getFullYear();

    date.text("(" + rules(day) + "/" + rules(month) + "/" + rules(year) + ")");

    col2.append(title,date,col3);
    col1.append(welcome ,salir);
    col3.append(ul);
    row.append(col1, col2);
    container.append(row);

		salir.on('click', (e) => {
			e.preventDefault();
			state.page = null;
			update();
		});

    return container
}

const justificacion = (update) => {

    const body_modal=$('<div class="container cont_just"></div>');
    const cont_modal=$('<div class="row"></div>');
    const cont_div =$('<div class="col s12 center-align"></div>');
    const title_name=$('<h4>'+ state.user.Coder+'</h4>') ;
    const msj  = $('<p>Aún no has registrado tu asistencia.<br>Por favor cuéntanos  por qué.</p>') ;
    const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	  const button = $('<a class="btn col s12 montserrat">Enviar</a>');
    cont_div.append(title_name , msj , message,button);
    cont_modal.append(cont_div);

    body_modal.append(cont_modal);

		button.on('click', (e) => {
      e.preventDefault();
      console.log("mensaje enviado");
      state.user.Motivo =message.val();
      state.user.Estado="Ausente";
			state.page = 7;
      Postregister();
			update();
		});

    return body_modal;
};

const mensaje = (update) => {
  const container_msm =$('<section class="container center-align cont_msj"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$('<div class="title_asis"></div>') ;
  const title =$('<p class="negrita">'+ state.user.Coder +'</p><p> Tu mensaje ha sido enviado correctamente</p>');
  cont_title.append(title);
  cont_asisOK.append(cont_title);
  const cont_check =$('<div class="cont_asist col s6 push-s3"></div>');
  const cont_radio =$('<div class="radio-check"></div>');
  const cont_img =$('<i class="large material-icons">email</i>');

  cont_asisOK.append(cont_check);
  cont_radio.append(cont_img);
  cont_check.append(cont_radio);

  const div_enlaces =$('<div class="cont_btn col s10 push-s1"></div>');
  const btn_home =$('<button type="button"  id="btn_present" name="button" class="primary">IR AL HOME</button>');

  div_enlaces.append(btn_home)
  cont_asisOK.append(div_enlaces);

  btn_home.on('click', (e) =>{
    e.preventDefault();
     state.page = 4;
     update();
  });
  container_msm.append(cont_asisOK);
  return container_msm ;
}


const AlePantalla = (update) => {

  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$(`<div class="title_asis left-align"><p>Buen día Alejandra</p><p> Revisa la Asistencia de Hoy : ${harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())}</p> </div>`) ;
  const detalle_squads = $(`<div id="coders"></div>`)
  container_OK.append(cont_asisOK,cont_title,detalle_squads);

  const coderToday = [], squads = [];


  $.get("https://sheetsu.com/apis/v1.0/8392c0c102f9",(data)=> {
    console.log(data);
    state.asistencia = data;

    $.each(state.asistencia,(i,e)=>{
      if(e.Dia === harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())){
        coderToday.push(e);
      }
    });

    $.each(coderToday,(i,e)=>{

      if($.inArray(e.Squad,squads)===-1){
        squads.push(e.Squad);
      }
    })

    let ausentes = 0, puntuales = 0, tarde = 0;

    $.each(squads,(i,e)=>{
      const  divSquad = $(`<ul class="collapsible" data-collapsible="expandable" id =${e}></ul>`);
      const li =$('<li></li>');
      const divHeader =$('<div class="collapsible-header"></div>');
      const divBody =$('<div class="collapsible-body"></div>');
      const title = $(`<div class="title_squad"><h4 class="left-align">${e}</h4></div>`);
      const bodyCase =$('<div class="flex_center"></div>');
      title.append(bodyCase);
        coderToday.forEach(function(coder){
            if(e == coder.Squad){
                switch (coder.Estado) {
                  case 'Ausente' : ausentes++ ;
                    break;
                  case 'Puntual' : puntuales++;
                    break;
                  case 'Tarde' : tarde++;
                   break;
                }

                detalle(coder, divBody);
              }

          });

          detalle_squads.append(divSquad);
          divSquad.prepend(li);
          li.append(divHeader ,divBody);
          divHeader.append(title)
          bodyCase.append(`<div class="sizedetail"><p class="Ausente">Ausente </p><p>${ausentes}</p></div>`);
          bodyCase.append(`<div class="sizedetail"><p class="Puntual">Puntual </p><p> ${puntuales}</p></div>`);
          bodyCase.append(`<div class="sizedetail"><p class="Tarde">Tarde </p><p> ${tarde}</p></div>`);
          ausentes = 0;
          puntuales = 0;
          tarde = 0;
      });
  })

  console.log(squads);


 return container_OK ;
}
// var a=0;
// function Actualiza(){
//   console.log(a++);
//   AlePantalla();
// }
 // setInterval(Actualiza, 1000);
const detalle = (coder, container)=> {
   const divImg =$('<div class="detail_coder"></div>');
   const imgCoder =$(`<img src="assets/img/${coder.Codigo}.jpg"  class="img-responsive" alt="foto">`)
   const spanCoder = $(`<p>${coder.Coder}</p>`);
   const spanEstado = $(`<span class="${coder.Estado}">${coder.Estado}</span>`);
   container.append(divImg);
   divImg.append(imgCoder,spanCoder,spanEstado);
}

'use strict';

const filterByEmail= (stations,query) => {
  const select =stations.filter (function(index) {
    return (index.Email.toLowerCase()==query.toLowerCase());
  })
  console.log(select);
  return select;
}

'use strict';

const getJSON = (url, cb) => {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    if (xhr.status !== 200) {
      return cb(new Error('Error loading JSON from ' + url + '(' + xhr.status + ')'));
    }

    cb(null, xhr.response);

  });

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();

};

'use strict';
const Postregister =(update)=>{

  $.post("https://sheetsu.com/apis/v1.0/8392c0c102f9", {"Coder":state.user.Coder,"Email":state.user.Email,"Codigo":state.user.Codigo,"Squad":state.user.Squad,"Tipo":state.user.Tipo,"Dia":state.user.Dia,"Hora":state.user.Hora,"Estado":state.user.Estado,"Motivo":state.user.Motivo,"Sede":state.user.Sede}, function(result){
      console.log("Enviando Data");
  });
};

const Verificar = (valor ) => {
  if(valor != ""){
    $('#btnEnviar').removeClass("disabled");
  } else {
    $('#btnEnviar').addClass("disabled");
  }
};
const VerificarUbi =(update)=>{
  initMap(update);
}
const ValidHora =(update)=>{
  var punt_r1 ="0000";
  var punt_r2 ="0900";
  var actual = new Date();

  var hours   = actual.getHours();
  var minutes = actual.getMinutes();
  var seconds = actual.getSeconds();
  var dia     = actual.getDate();
  var mes     = actual.getMonth()+1;
  var year    = actual.getFullYear();
  var check = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  var fecha = harold(dia) + "/" + harold(mes) + "/" + year;

  if(parseInt(punt_r1.slice(0, 2))<= hours  && hours <= parseInt(punt_r2.slice(0,2)) ){
      if (hours == parseInt(punt_r2.slice(0, 2)) && minutes > parseInt(punt_r2.slice(2,4))){
        console.log("Ingresa fuera de hora");
        state.user.Dia= fecha;
        state.user.Hora =check;
        state.user.Motivo="";
        state.page = 6;
        update();
      }else{
        console.log("Ingresa normal");
        state.page = 1;
        update();
      }
  } else{
    console.log("Ingresa fuera de hora");
    state.user.Dia= fecha;
    console.log(check);
    state.user.Hora =check;
    state.page = 6;
    update();
  }
}
function harold(standIn) {
   if (standIn < 10) {
     standIn = '0' + standIn
   }
   return standIn;
}
var UbicacionX,checkP,fechaP;

const ValidPuntualidad =(update)=>{
  var punt1 = "0000";
  var punt2 = "0130";
  var actual = new Date();
  var hours   = actual.getHours();
  var minutes = actual.getMinutes();
  var seconds = actual.getSeconds();
  var dia     = actual.getDate();
  var mes     = actual.getMonth()+1;
  var year    = actual.getFullYear();

  checkP = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  fechaP = harold(dia) + "/" + harold(mes) + "/" + year;
  state.time =checkP ;
  if(parseInt(punt1.slice(0, 2))<= hours  && hours <= parseInt(punt2.slice(0, 2)) ){
      if (hours == parseInt(punt2.slice(0, 2)) && minutes > parseInt(punt2.slice(2, 4))){
          state.user.Estado="Tarde";
          state.page = 3;
          VerificarUbi(update);
      }else{
        state.user.Estado="Puntual";
        state.user.Motivo="";
        state.page = 2;
        VerificarUbi(update);
      }
  } else{
      state.user.Estado="Tarde";
      state.page = 3;
      VerificarUbi(update);
  }
}


function initMap(update) {
       var pos;
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };

          console.log(pos);
          var posX = Math.sqrt(Math.pow(pos.lat,2)+ Math.pow(pos.lng,2));
          //   var posLab={
          //    lat: -12.126025,
          //    lng: -77.020663
          //  }

           var posLab={
            lat: -12.050668,//Ubicación de casa de Ana
            lng: -77.045994
          }

           var labX = Math.sqrt(Math.pow(posLab.lat,2)+ Math.pow(posLab.lng,2));
           var distancia= (Math.abs(labX-posX))*1000;
           var RadioWork =0.002429195*1000 ;

           if(distancia >= RadioWork ){
            console.log("Aun no estas en laboratoria");
            $('#msjError').text("Aún no estas en Laboratoria , vuelve a registrarte cuando llegues");
            setTimeout(function(){
              state.page = null;
              update();
            }, 50000);
           } else {
            console.log("Estas cerca de tu ubicacion");
            if (state.user.Estado != "Tarde"){
              state.user.Hora =checkP;
              state.user.Dia= fechaP;
              Postregister();
            }
            state.user.Hora =checkP;
            state.user.Dia= fechaP;
            update();
           }

         });

       } else {
         $('#msjError').text("Tu navegador no soporta la geolocalización");
         setTimeout(function(){
           state.page = null;
           update();
         }, 3000);
       }
}
const Reingreso =()=>{
  var actual = new Date();
  var dia     = actual.getDate();
  var mes     = actual.getMonth()+1;
  var year    = actual.getFullYear();
  var Freingreso = harold(dia) + "/" + harold(mes) + "/" + year;
  return Freingreso;
}
const PedirHora =()=>{
  var time = new Date(),
    dia     = time.getDate(),
    mes     = time.getMonth()+1,
    year    = time.getFullYear();

  var  Fechas = harold(dia) + "/" + harold(mes) + "/" + year;
    return Fechas;
}

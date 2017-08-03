"use strict";
const render = (root)=>{
   root.empty();
   const section = $('<div></div>');
   section.append(header( _ => render(root)));

   if (state.page == null) {
    section.append(welcome( _ => render(root)));
  } else if (state.page == 1) {
    section.append(reloj( _ => render(root)));
  } else if (state.page == 2) {
    section.append(asistOk( _ => render(root)));
  }

   root.append(section);
};

const update = function (){
  render(root);
};

const state = {
  data: null,
  user: null,
  email: null,
  password: null,
  page: null,
  time:null,

};

$( _ => {

  getJSON('/user.json', (err, json) => {

      if (err) { return alert(err.message);}

      state.data = json;
      const root = $('.root');
      render(root);

    });
});

const asistOk = (update) => {
  console.log(state.time);
  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$('<div class="title_asis"></div>') ;
  const title =$('<p class="negrita">'+state.user[0].name+' Tu asistencia fue registrada a las :</p>');
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
    event.preventDefault();

     state.page = 3;
     update();
  });
  container_OK.append(cont_asisOK);
  return container_OK ;
}

const header = (update) => {

  const cont_header =$('<header><div class="container"><div class="row">'+
                       '<img src="assets/img/logo.svg" alt="logo" class="col s10 push-s1  "></div></div></header>');
  return cont_header ;
}

const reloj = (update) => {

  const cont_reloj =$('<section class="container cont_timer"></section>');
  const cont_title =$('<div class="welcome"></div>') ;
  const title =$('<p>Bienvenida <strong>'+state.user[0].name+'</strong></p>');
  cont_title.append(title);
  cont_reloj.append(cont_title);
  const cont_timer =$('<div class="cont_clock"></div>');
  const cont_day =$('<div class="day"></div>');

  const cont_clock =$('<h1 class="clock"></h1>');
  const btn_present =$('<button type="button"  class="verde" id="btn_present" name="button" class="verde">Presente</button>');

  cont_timer.append(cont_day);
  cont_timer.append(cont_clock);
  cont_timer.append(btn_present);
  cont_reloj.append(cont_timer);

  const div_register =$ ('<div class="enlace"></div>');
  const enlace =$('<a href="#" class="active">Registrar ausencia</a>');
  div_register.append(enlace);
  cont_timer.append(div_register);

  console.log(new Date());

  var punt1 = "1135";
  var punt2 = "1140";
  var punt3 = "1145";
  function harold(standIn) {
      if (standIn < 10) {
        standIn = '0' + standIn
      }
      return standIn;
  }
  function clock() {
    var time = new Date(),
      hours   = time.getHours(),
      minutes = time.getMinutes(),
      seconds = time.getSeconds(),
      dia     = time.getDate(),
      mes     = time.getMonth(),
      year    = time.getFullYear();
      console.log(harold(dia) + "/" + harold(mes) + "/" + year);
        //  cont_day.text(harold(dia) + "/" + harold(mes) + "/" + year);
        //  cont_clock.text(harold(hours) + ":" + harold(minutes) + ":" + harold(seconds));
        document.querySelectorAll('.day')[0].innerHTML = harold(dia) + "/" + harold(mes) + "/" + year;
        document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  };
  setInterval(clock, 1000);

  btn_present.on('click', (e) =>{
    event.preventDefault();
    var actual = new Date();
    var hours = actual.getHours();
    var minutes = actual.getMinutes();
    var seconds = actual.getSeconds();
    var check = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
    console.log(harold(hours) + ":" + harold(minutes) + ":" + harold(seconds));
    console.log(punt1.slice(0, 2));
    if( hours >= punt1.slice(0, 2) && hours <= punt2.slice(0, 2) && minutes >= punt1.slice(2, 4) && minutes <= punt2.slice(2, 4)){
        console.log("puntual");
    } else if (hours >= punt2.slice(0, 2) && hours <= punt3.slice(0, 2) && minutes >= punt2.slice(2, 4) && minutes <= punt3.slice(2, 4))
     { console.log("tarde");}

     state.time = check;
     state.page = 2;
     update();
  });

  return cont_reloj;
}


const welcome = (update) => {
    const cont_welcome =$('<section class="container center-align cont_welcome"></section>');
    const title =$('<h5 class="center">Bienvenido al capitán <br>Ingresa a tu cuenta </h5>');
    cont_welcome.append(title);
    const cont_form = $('<div class="container"></div>');
    cont_welcome.append(cont_form);
    const form =$('<form  class="row" id="new_user"></form>');
    cont_form.append(form);
    const forminput =$('<div class="col s10 push-s1"></div>');
    form.append(forminput);
    const var_user =$('<div class="left-align"></div>');
    const label_user =$('<label class="" for="user_code">Usuario</label>');
    const input_user =$('<input class="in_lab" autofocus="autofocus" placeholder="Código Laboratoria" type="text"  id="user_code">');
    forminput.append(var_user);
    var_user.append(label_user);
    var_user.append(input_user);
    const var_pas = $('<div class="left-align"></div>');
    const label_pas = $('<label class="" for="user_password">Contraseña</label>');
    const input_pas = $('<input class="in_lab" autofocus="autofocus" placeholder="Contraseña" type="password"  id="user_password">');
    forminput.append(var_pas);
    var_pas.append(label_pas);
    var_pas.append(input_pas);

    const div_lost =$ ('<div></div>');
    const lost_pas=$('<a href="#" class="active">Olvide mi contraseña</a>');
    div_lost.append(lost_pas);
    forminput.append(div_lost);
    const div_btn =$('<div class="form-actions"></div>');
    const btn_enviar =$('<button id="btnEnviar" class="btn  primary disabled">Ingresar</button>');
    forminput.append(div_btn);
    div_btn.append(btn_enviar);

    var filtrados=null;
    input_user.on('keyup',(e) => {
      if(input_user.val() !=""){
        filtrados = filterByEmail(state.data ,input_user.val());
        btn_enviar.removeClass("disabled");
        Verificar(input_pas.val());
      } else {
        console.log("Aun no se ha ingresado el usuario");
        btn_enviar.addClass("disabled");
      }
    });

    input_pas.on('keyup',(e) => {
      if(input_pas.val() =="1234"){
        btn_enviar.removeClass("disabled");
      } else {
        console.log("La contraseña no coincide");
        btn_enviar.addClass("disabled");
      }
    });

    btn_enviar.on('click',(e) =>{
      event.preventDefault();
      state.user = filtrados;
      state.page=1;
      update();
   });


  return cont_welcome;
}

'use strict';

const filterByEmail= (stations,query) => {

  const select =stations.filter (function(index) {
    return (index.email.indexOf(query)!=-1);
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

const Verificar = (valor ) => {
  if(valor =="1234"){
    $('#btnEnviar').removeClass("disabled");
  } else {
    console.log("La contraseña no coincide");
    $('#btnEnviar').addClass("disabled");
  }
};

'use strict';
const reloj = (update) => {

  const cont_reloj =$('<section class="container cont_timer"></section>');
  const cont_title =$('<div class="welcome"></div>') ;
  const title =$('<p>Bienvenida(o) <strong>'+ state.user.Coder +'</strong></p>');
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
    e.preventDefault();

    clearInterval(interval);
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

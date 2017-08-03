const reloj = (update) => {

  const cont_reloj =$('<section class="container cont_timer"></section>');
  const cont_title =$('<div class="welcome"></div>') ;
  const title =$('<p>Bienvenida <strong>'+ state.user[0].NOMBRE +'</strong></p>');
  postE.name =state.user[0].NOMBRE ;
  postE.email =state.user[0].EMAIL;
  postE.squad =state.user[0].SQUAD;
  postE.type  =state.user[0].TIPO;
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

  var punt1 = "1847";
  var punt2 = "1855";
  var punt3 = "1858";

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
     mes     = time.getMonth()+1,
     year    = time.getFullYear();
    //  var fecha =harold(dia) + "/" + harold(mes) + "/" + year;
      document.querySelectorAll('.day')[0].innerHTML = harold(dia) + "/" + harold(mes) + "/" + year;
      document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
 };

 var interval = setInterval(clock, 1000);

 btn_present.on('click', (e) =>{
    e.preventDefault();
   clearInterval(interval);

   var actual = new Date();
   var hours = actual.getHours();
   var minutes = actual.getMinutes();
   var seconds = actual.getSeconds();
   var dia     = actual.getDate();
   var mes     = actual.getMonth()+1;
   var year    = actual.getFullYear();

   var check = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
   var fecha = harold(dia) + "/" + harold(mes) + "/" + year;
   console.log(harold(hours) + ":" + harold(minutes) + ":" + harold(seconds));
   console.log(punt1.slice(0, 2));
   state.time = check;
   postE.fecha  =check +" "+fecha ;


   if( hours >= punt1.slice(0, 2) && hours <= punt2.slice(0, 2) && minutes >= punt1.slice(2, 4) && minutes <= punt2.slice(2, 4)){
       state.cat ="P";
       postE.state  =state.cat ;
       state.page = 2;

       PostregisterHora(update ,postE.name,postE.email,postE.squad,postE.type,postE.fecha,postE.state);

       update();
   } else if (hours >= punt2.slice(0, 2) && hours <= punt3.slice(0, 2) && minutes >= punt2.slice(2, 4) && minutes <= punt3.slice(2, 4))
    { console.log("tarde");
      state.cat ="T";
      postE.state  =state.cat ;
      state.page = 3;

      PostregisterHora(update ,postE.name,postE.email,postE.squad,postE.type,postE.fecha,postE.state);
      update();
    }

 });

  enlace.on('click', (e) =>{
    e.preventDefault();
    clearInterval(interval);
      state.cat ="A";
      state.page = 5;
      update();
  });

  return cont_reloj;
};

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

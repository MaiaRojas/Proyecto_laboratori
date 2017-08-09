const Verificar = (valor ) => {
  if(valor != ""){
    $('#btnEnviar').removeClass("disabled");
  } else {
    $('#btnEnviar').addClass("disabled");
  }
};

const ValidHora =(update)=>{
  var punt_r1 ="0800";
  var punt_r2 ="1200";
  var actual = new Date();

  var hours   = actual.getHours();
  var minutes = actual.getMinutes();
  var seconds = actual.getSeconds();
  var dia     = actual.getDate();
  var mes     = actual.getMonth()+1;
  var year    = actual.getFullYear();
  var check = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  var fecha = harold(dia) + "/" + harold(mes) + "/" + year;

  if(parseInt(punt_r1.slice(0, 2))<= hours  && hours <= parseInt(punt_r2.slice(0, 2)) ){
      if (hours == parseInt(punt_r2.slice(0, 2)) && minutes > parseInt(punt_r2.slice(2, 4))){
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
const ValidPuntualidad =(update)=>{
  var punt1 = "0800";
  var punt2 = "1109";
  var actual = new Date();
  var hours   = actual.getHours();
  var minutes = actual.getMinutes();
  var seconds = actual.getSeconds();
  var dia     = actual.getDate();
  var mes     = actual.getMonth()+1;
  var year    = actual.getFullYear();

  var check = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  var fecha = harold(dia) + "/" + harold(mes) + "/" + year;
  state.time =check ;
  if(parseInt(punt1.slice(0, 2))<= hours  && hours <= parseInt(punt2.slice(0, 2)) ){
      if (hours == parseInt(punt2.slice(0, 2)) && minutes > parseInt(punt2.slice(2, 4))){
          state.user.Estado="Tarde";
          state.user.Hora =check;
          state.page = 3;
          update();
      }else{
        state.user.Estado="Puntual";
        state.user.Hora =check;
        state.page = 2;
        Postregister();
        update();
      }
  } else{
      state.user.Estado="Tarde";
      state.user.Hora =check;
      state.page = 3;
      update();
  }
}

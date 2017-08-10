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
  var punt_r1 ="0800";
  var punt_r2 ="1800";
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
var UbicacionX;
const ValidPuntualidad =(update)=>{
  var punt1 = "0800";
  var punt2 = "1730";
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
          state.user.Dia= fecha;
          state.page = 3;
          VerificarUbi(update);
      }else{
        state.user.Estado="Puntual";
        state.user.Motivo="";
        state.user.Hora =check;
        state.user.Dia= fecha;
        state.page = 2;
        VerificarUbi(update);
      }
  } else{
      state.user.Estado="Tarde";
      state.user.Hora =check;
      state.user.Dia= fecha;
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
            lat: -12.070698,//Ubicación de casa de Ana
            lng: -77.055306
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
            }, 3000);
           } else {
            console.log("Estas cerca de tu ubicacion");
            if (state.user.Estado != "Tarde"){
              Postregister();
            }

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

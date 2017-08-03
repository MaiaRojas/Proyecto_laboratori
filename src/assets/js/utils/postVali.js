'use strict';
const PostregisterHora =(update ,postEname,postEemail,postEsquad,postEtype,postEfecha ,postEstate)=>{
  var name = postEname;
  var email = postEemail;
  var squad = postEsquad;
  var type = postEtype;
  var fecha = postEfecha;
  var state = postEstate;

  $.post("https://sheetsu.com/apis/v1.0/15e4cdf9e644", {"NOMBRE":name,"EMAIL":email,"SQUAD":squad,"TIPO":type,"FECHA":fecha,"ESTADO":state}, function(result){
      console.log("Enviando Data");
  });
};

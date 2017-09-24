'use strict';
const Postregister =(update)=>{

  $.post("https://sheetsu.com/apis/v1.0/1acf2e7e65e6", {"Coder":state.user.Coder,"Email":state.user.Email,"Codigo":state.user.Codigo,"Squad":state.user.Squad,"Tipo":state.user.Tipo,"Dia":state.user.Dia,"Hora":state.user.Hora,"Estado":state.user.Estado,"Motivo":state.user.Motivo,"Sede":state.user.Sede}, function(result){
      console.log("Enviando Data");
  });
};

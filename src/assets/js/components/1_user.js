'use strict';
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

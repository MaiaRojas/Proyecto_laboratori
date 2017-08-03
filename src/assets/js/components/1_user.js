
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
    const btn_enviar = $('<button id="btnEnviar" class="btn primary disabled" href="#modal1">Ingresar</button>');
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
      if(input_pas.val() == "1234"){
        btn_enviar.removeClass("disabled");
      } else {
        console.log("La contraseña no coincide");
        btn_enviar.addClass("disabled");
      }
    });

    btn_enviar.on('click',(e) =>{
      e.preventDefault();

        var punt_r1 ="1730";
        var actual = new Date();
        var hours = actual.getHours();
        var minutes = actual.getMinutes();
        state.user = filtrados;

        if( hours <= punt_r1.slice(0, 2) && minutes < punt_r1.slice(2, 4) ){

          console.log("Ingresa normal");

          state.page=1;
          update();

        } else{
          console.log("Ingresa fuera de hora");
          state.page = 6;
          update();
        };
   });


  return cont_welcome;
}

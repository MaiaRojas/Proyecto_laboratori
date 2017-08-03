
const welcome = (update) => {
    const cont_welcome =$('<section class="container"></section>');
    const title =$('<h4 class="center">Bienvenido al capitán <br>Ingresa a tu cuenta </h4>');
    cont_welcome.append(title);
    const cont_form = $('<div class="container"></div>');
    cont_welcome.append(cont_form);
    const form =$('<form  class="" id="new_user"></form>');
    cont_form.append(form);
    const forminput =$('<div class="form-inputs"></div>');
    form.append(forminput);
    const var_user =$('<div class="form-group"></div>');
    const label_user =$('<label class="" for="user_code">Usuario</label>');
    const input_user =$('<input class="" autofocus="autofocus" placeholder="Código Laboratoria" type="text"  id="user_code">');
    forminput.append(var_user);
    var_user.append(label_user);
    var_user.append(input_user);
    const var_pas =$('<div class="form-group"></div>');
    const label_pas =$('<label class="" for="user_password">Contraseña</label>');
    const input_pas =$('<input class="" autofocus="autofocus" placeholder="Contraseña" type="password"  id="user_password">');
    forminput.append(var_pas);
    var_pas.append(label_pas);
    var_pas.append(input_pas);

    const div_lost =$ ('<div></div>');
    const lost_pas=$('<a href="#" class="active">Olvide mi contraseña</a>');
    div_lost.append(lost_pas);
    forminput.append(div_lost);
    const div_btn =$('<div class="form-actions"></div>');
    const btn_enviar =$('<input type="submit" name="commit" value="Ingresar" class="btn primary">');
    forminput.append(div_btn);
    div_btn.append(btn_enviar);

  return cont_welcome;
}

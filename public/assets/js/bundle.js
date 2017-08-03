"use strict";
var render = function (root) {
   root.empty();
   var section = $("<div></div>");
   section.append(header(function (_) {
      return render(root);
   }));
   section.append(welcome(function (_) {
      return render(root);
   }));
   root.append(section);
};

var state = {
   user: null,
   email: null,
   password: null,
   screen: null
};

var update = function () {
   render(root);
};

$(function (_) {
   $.getJSON("user.json", function (data) {
      state.user = data;

      console.log(state.user);
   });
   var root = $(".root");
   render(root);
});
"use strict";

var header = function (update) {
  var cont_header = $("<header><div class=\"container\"><div class=\"row\">" + "<img src=\"assets/img/logo.svg\" alt=\"logo\"></div></div></header>");
  return cont_header;
};
"use strict";

var welcome = function (update) {
    var cont_welcome = $("<section class=\"container\"></section>");
    var title = $("<h4 class=\"center\">Bienvenido al capitán <br>Ingresa a tu cuenta </h4>");
    cont_welcome.append(title);
    var cont_form = $("<div class=\"container\"></div>");
    cont_welcome.append(cont_form);
    var form = $("<form  class=\"\" id=\"new_user\"></form>");
    cont_form.append(form);
    var forminput = $("<div class=\"form-inputs\"></div>");
    form.append(forminput);
    var var_user = $("<div class=\"form-group\"></div>");
    var label_user = $("<label class=\"\" for=\"user_code\">Usuario</label>");
    var input_user = $("<input class=\"\" autofocus=\"autofocus\" placeholder=\"Código Laboratoria\" type=\"text\"  id=\"user_code\">");
    forminput.append(var_user);
    var_user.append(label_user);
    var_user.append(input_user);
    var var_pas = $("<div class=\"form-group\"></div>");
    var label_pas = $("<label class=\"\" for=\"user_password\">Contraseña</label>");
    var input_pas = $("<input class=\"\" autofocus=\"autofocus\" placeholder=\"Contraseña\" type=\"password\"  id=\"user_password\">");
    forminput.append(var_pas);
    var_pas.append(label_pas);
    var_pas.append(input_pas);

    var div_lost = $("<div></div>");
    var lost_pas = $("<a href=\"#\" class=\"active\">Olvide mi contraseña</a>");
    div_lost.append(lost_pas);
    forminput.append(div_lost);
    var div_btn = $("<div class=\"form-actions\"></div>");
    var btn_enviar = $("<input type=\"submit\" name=\"commit\" value=\"Ingresar\" class=\"btn primary\">");
    forminput.append(div_btn);
    div_btn.append(btn_enviar);

    return cont_welcome;
};

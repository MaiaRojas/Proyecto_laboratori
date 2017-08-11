'use strict';
const justificacion = (update) => {

    const body_modal=$('<div class="container cont_just"></div>');
    const cont_modal=$('<div class="row"></div>');
    const cont_div =$('<div class="col s12 center-align"></div>');
    const title_name=$('<h4>'+ state.user.Coder+'</h4>') ;
    const msj  = $('<p>Aún no has registrado tu asistencia.<br>Por favor cuéntanos  por qué.</p>') ;
    const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	  const button = $('<a class="btn col s12 montserrat">Enviar</a>');
    cont_div.append(title_name , msj , message,button);
    cont_modal.append(cont_div);

    body_modal.append(cont_modal);

		button.on('click', (e) => {
      e.preventDefault();
      console.log("mensaje enviado");
      state.user.Motivo =message.val();
      state.user.Estado="Ausente";
			state.page = 7;
      Postregister();
			update();
		});

    return body_modal;
};

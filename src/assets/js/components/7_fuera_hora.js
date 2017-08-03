const justificacion = (update) => {
    $('body').css('background-color', '#f7f7f7');
    const body_modal= $('<div class="container cont_just"></div>');
    const cont_modal= $('<div class="row"></div>');
    const cont_div = $('<div class="col s12"></div>');
    const cont_div2 = $('<div class="col s12"></div>');
    const msj  = $('<p class="spacing">'+ state.user[0].NOMBRE +', aún no has registrado tu asistencia.<br><br>Por favor, cuéntanos por qué.</p>') ;
    const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
    const cont_btn = $('<div class="col s12 send_fuera_hora"></div>');
    const button = $('<a class="btn col s12 montserrat">Enviar</a>');
    cont_btn.append(button);
    cont_div2.append(msj, message, cont_btn);
    cont_div.append(cont_div2);
    cont_modal.append(cont_div);
    body_modal.append(cont_modal);

		button.on('click', (e) => {
      e.preventDefault();
      console.log("mensaje enviado");
			state.page = 7;
			update();
		});

    return body_modal;
};

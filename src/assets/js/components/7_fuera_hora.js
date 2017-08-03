const justificacion = (update) => {

    const body_modal=$('<div class="container cont_just"></div>');
    const cont_modal=$('<div class="row"></div>');
    const cont_div =$('<div class="col s10 push-s1"></div>');
    const title_name=$('<h4>Maia</h4>') ;
    const msj  = $('<p>Aún no has registrado tu asistencia.<br>Por favor cuéntanos  por qué.</p>') ;
    const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
    cont_modal.append(title_name , msj , message);
  	const button = $('<a class="btn col s12 montserrat">Enviar</a>');
    cont_modal.append(button);
    body_modal.append(cont_modal);

		button.on('click', (e) => {
      e.preventDefault();
      console.log("mensaje enviado");
			state.page = 7;
			update();
		});

    return body_modal;
};

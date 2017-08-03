const out_sign = (update) => {

    const body_modal=$('<div id="modal1" class="modal"></div>');

    const cont_modal=$('<div class="modal-content"></div>');
    const title_name=$('<h4>Maia</h4>') ;
    const msj  = $('<p>Aún no has registrado tu asistencia.<br>Por favor cuéntanos  por qué.</p>') ;
    const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
    cont_modal.append(title_name,msj,message);
  	const button = $('<a class="btn col s12 montserrat">Enviar</a>');
    cont_modal.append(button);
    body_modal.append(cont_modal);
    // <div class="modal-footer">
    //   <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    // </div>

		button.on('click', (e) => {
			e.preventDefault();
			state.page = 4;
			update();
		});
    return body_modal;
};

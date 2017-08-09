'use strict';

const Falta = (update) => {
	const container = $('<div class="container"></div>');
	const row = $('<div class="row"></div>');
	const title = $('<h4 class="montserrat text-center">'+ state.user.Coder +' Cuéntale a Ale por qué no vendrás</h4>');
	const form = $('<div class="col s12"></div>');
	const field = $('<div class="input-field col s12"></div>');
	const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');

	field.append(message);
	form.append(field, button);
	row.append(title, form);
	container.append(row);

	button.on('click', (e) => {
		state.user.Motivo = message.val() ;

		state.page = 4;
		Postregister();
		update();
	});

	return container
}

'use strict';

const Falta = (update) => {
	$('body').css('background-color', '#f7f7f7');
	const container = $('<div class="container"></div>');
	const row = $('<div class="row"></div>');
	const title = $('<h4 class="montserrat text-center">Cuéntale a Ale por qué no vendrás</h4>');
	const form = $('<div class="col s12"></div>');
	const field = $('<div class="input-field col s12"></div>');
	let message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	message.css('background', 'white');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');

	field.append(message);
	form.append(field, button);
	row.append(title, form);
	container.append(row);

	button.on('click', (e) => {
		state.page = 4;
		update();
	});

	return container
}

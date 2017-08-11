'use strict';

const Falta = (update) => {
	const container = $('<div class="container"></div>');
	const row = $('<div class="row center-align"></div>');
	const title = $('<h5 class="negrita">'+ state.user.Coder +' </h5><p>Cuéntale a Ale por qué no vendrás</p>');
	const form = $('<div class="col s12"></div>');
	const field = $('<div class="input-field col s12"></div>');
	const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');

	field.append(message);
	form.append(field, button);
	row.append(title, form);
	container.append(row);

	button.on('click', (e) => {
		state.user.Dia = PedirHora();
		state.user.Motivo = message.val() ;
		state.page = 4;
		Postregister();
		update();
	});

	return container
}

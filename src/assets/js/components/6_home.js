'use strict';

const Home = (update) => {
	const container = $('<div class="container"></div>');
	const row = $('<div class="row"></div>');
	const col1 = $('<div class="col s12"></div>');
	const col2 = $('<div class="col s12 text-center bg-white"></div>');
	const welcome = $('<p>Buen día Maia</p>');
	const title = $('<p class="title">Agenda</p>');
	let date = $('<div class="date-home"></div>');

	function rules(param) {
		if (param < 10) {
			param = '0' + param
		}

		return param;
	}

	var time = new Date();
	var day = time.getDay();
	var month = time.getMonth();
	var year = time.getFullYear();

	date.text("(" + rules(day) + "/" + rules(month) + "/" + rules(year) + ")");


	col2.append(title,date);
	col1.append(welcome);
	row.append(col1, col2);
	container.append(row);

	return container
}
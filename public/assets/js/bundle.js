"use strict";
const render = (root) =>{
   root.empty();

   const wrapper = $('<div class="wrapper"></div>');

   const update = function (){
    render(root);
  };

  if(state.screen == null) {
    wrapper.append(Home(update))
  }

  root.append(wrapper);
};

const state = {
  data: null,
   user: null,
   email: null,
   password: null,
   screen: null
};

$( _ => {

  getJSON('/user.json', (err, json) => {

      if (err) { return alert(err.message);}

      state.data = json;
      console.log(state.data)

      const root = $('#root');
      render(root);

    });

/*    $.getJSON('/user.json', function(data) {
      console.log(data);
    })*/

});

'use strict';

const Falta = (update) => {
	const container = $('<div class="container"></div>');
	const row = $('<div class="row"></div>');
	const title = $('<h4 class="montserrat text-center">Cuéntale a Ale por qué no vendrás</h4>');
	const form = $('<div class="col s12"></div>');
	const field = $('<div class="input-field col s12"></div>');
	const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');
	
	field.append(message);
	form.append(field, button);
	row.append(title, form);
	container.append(row);

	button.on('click', (e) => {
		state.screen = "home"
	});

	return container
}
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
'use strict';

const Tardanza = (update) => {

	const container = $('<div class="container"></div>');
	const row = $('<div class="row"></div>');
	const title = $('<h4 class="montserrat text-center">Maia, ¿cuál es el motivo de tu tardanza?</h4>');
	const form = $('<div class="col s12"></div>');
	const p1 = $('<p></p>');
	const p2 = $('<p></p>');
	const p3 = $('<p></p>');
	const input1 = $('<input type="radio" id="tardanza-1" class="with-gap" name="tardanza-justificacion">');
	const input2 = $('<input type="radio" id="tardanza-2" class="with-gap" name="tardanza-justificacion">');
	const input3 = $('<input type="radio" id="tardanza-3" class="with-gap" name="tardanza-justificacion">');
	const label1 = $('<label for="tardanza-1">Tráfico</label>');
	const label2 = $('<label for="tardanza-2">Me quedé dormida</label>');
	const label3 = $('<label for="tardanza-3">Ninguna de las anteriores</label>');
	const add = $('<a class="museo-sanse add-message spacing">Agregar mensaje</a>')
	const field = $('<div class="input-field col s12"></div>');
	const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
	const button = $('<a class="waves-effect waves-light btn col s12 montserrat">Enviar</a>');

	p1.append(input1, label1);
	p2.append(input2, label2);
	p3.append(input3, label3);
	form.append(p1, p2, p3, add, field, button);
	row.append(title, form);
	container.append(row);

	add.on('click', (e) => {
		add.css('display', 'none');
		field.append(message);
	});

	button.on('click', (e) => {
		state.screen = "home"
	});

	return container

}
'use strict';

const getJSON = (url, cb) => {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    if (xhr.status !== 200) {
      return cb(new Error('Error loading JSON from ' + url + '(' + xhr.status + ')'));
    }

    cb(null, xhr.response);
    
  });

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();

};

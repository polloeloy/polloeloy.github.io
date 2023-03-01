// JavaScript source code


var dato;
var map;


$.ajax({
	url: 'https://randomuser.me/api/',
	dataType: 'json',
	success: function (data) {
		dato = data;
		map = L.map('map').setView([dato['results'][0]["location"]["coordinates"]["latitude"], dato['results'][0]["location"]["coordinates"]["longitude"]], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);


		var marker = L.marker([dato['results'][0]["location"]["coordinates"]["latitude"], dato['results'][0]["location"]["coordinates"]["longitude"]]).addTo(map);

		document.getElementById("nombre").innerHTML = dato['results'][0]['name']["first"] + " " + dato['results'][0]['name']["last"];
		document.getElementById("fotoCv").setAttribute("src", dato['results'][0]['picture']["large"]);
		if (dato['results'][0]["gender"] == "male") {
			document.getElementById("Genero").innerHTML = "Genero: Masculino";
		} else {
			document.getElementById("Genero").innerHTML = "Genero: Femenino";
		}
		const event = new Date(dato['results'][0]['dob']["date"]);
		const jsonDate = event.toJSON();
		console.log(new Date(jsonDate).toUTCString());

		day = event.getDate();
		month = event.getMonth() + 1;
		year = event.getFullYear();
		email = dato['results'][0]['email'];

		document.getElementById("fechaNac").innerHTML = `fecha nacimiento: ${day}-${month}-${year}`;

		document.getElementById("email").innerHTML = `E-mail: ${dato['results'][0]['email']}`;

		document.getElementById("Pais").innerHTML = `Pais: ${dato['results'][0]['location']['country']}`;
		document.getElementById("Provincia").innerHTML = `Provincia: ${dato['results'][0]['location']['state']}`;
		document.getElementById("Ciudad").innerHTML = `Ciudad: ${dato['results'][0]['location']['city']}`;

	}
});
function muestraContacto() {
	var verMas = document.getElementById("verMasContacto");
	if (verMas.textContent == "ver mas") {
		var liCel = document.createElement("li");
		liCel.innerHTML = `Celular: ${dato['results'][0]['cell']}`;
		var listaContacto = document.getElementById("listaContacto");
		liCel.id = "celular";
		listaContacto.appendChild(liCel);
		var liPhone = document.createElement("li");
		liPhone.innerHTML = `Telefono: ${dato['results'][0]['phone']}`;
		liPhone.id = "phone";
		listaContacto.appendChild(liPhone);
		verMas.innerHTML = "Ver menos"
	}
	else {

		verMas.innerHTML = "ver mas";
		var contactoCelular = document.getElementById("celular");
		contactoCelular.parentNode.removeChild(contactoCelular);
		verMas.innerHTML = "ver mas";
		var contactoPhone = document.getElementById("phone");
		contactoPhone.parentNode.removeChild(contactoPhone);

	}
}

function muestraDireccion() {
	var verMas = document.getElementById("verMasDireccion");
	if (verMas.textContent == "ver mas") {
		var liStreet = document.createElement("li");
		liStreet.innerHTML = `Calle: ${dato['results'][0]["location"]['street']['name']}, ${dato['results'][0]["location"]['street']['number']}`;
		var liDirec = document.getElementById("Direccion");
		liStreet.id = "street";
		liDirec.appendChild(liStreet);
		var liPostCode = document.createElement("li");
		liPostCode.innerHTML = `Codigo Postal: ${dato['results'][0]["location"]["postcode"]}`;
		liPostCode.id = "liPostCode";
		liDirec.appendChild(liPostCode);
		verMas.innerHTML = "Ver menos"
		document.getElementById("verMapa").style.display = "block";

	}
	else {

		verMas.innerHTML = "ver mas";
		var street = document.getElementById("street");
		street.parentNode.removeChild(street);
		var postCode = document.getElementById("liPostCode");
		postCode.parentNode.removeChild(postCode);
		document.getElementById("verMapa").style.display = "none";
		document.getElementById("map").style.display = "none";

	}


}

function muestraMapa() {
	var verMap = document.getElementById("verMapa")
	
	if (verMap.textContent == "Ver Mapa") {
		verMap.innerHTML = "Dejar de ver mapa";
		document.getElementById("map").style.display = "block";
		map.invalidateSize();

	}
	else {

		verMap.innerHTML = "Ver Mapa";
		document.getElementById("map").style.display = "none";
		map.invalidateSize();

	}

	


	
}
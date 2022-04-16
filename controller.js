let table;
let input
window.onload = function () {
 	table = document.getElementById("table");
	input = document.getElementById("input_horario");
	input.addEventListener('input', onChange, false);
}


window.addEventListener("load", function(){
    onInit();
});

function onInit(){
	generate_table();
	
}

function generate_table() {
	for (var turno = 1; turno <= 3; turno++) {
		for (var i = 1; i<=(7-turno); i++) {
                let row = this.table.insertRow(-1);
                  for (var j = 1; j <= 7; j++) {
                    if(j==1){
                       let cell = row.insertCell();
                       cell.setAttribute("class",`hour_description`);
                       let horario = i+6+(turno==2?6:turno==3?11:0);
                       let text = document.createElement("p");
                       text.innerHTML = `${horario}:${turno==3?'30':'00'} - ${horario+1}:${turno==3?'30':'00'}`;
                       
                       cell.appendChild(text);
                    }else{
                    	let cell = row.insertCell();
                    	let div = document.createElement("div");
											div.setAttribute("id",`${j}${turno==1?'M': turno==2?'T':'N'}${i}`)
											div.setAttribute("class",`hour_block`);
											cell.appendChild(div);
                    }  
                  } 
              }
	}
}

let arrayOfHours = [];
var onChange = function(evt) {
	for(let i=0;i<arrayOfHours.length;i++){
			arrayOfHours[i].classList.remove("active");
	}
	arrayOfHours = [];
	let codigoTotal = evt.target.value.split(' ');

	codigoTotal.forEach(codigo => {
		let turnos = ['M','m','T','t','N','n'];
		let turno;
		if(turnos.some(function(turn){
			turno = turn;
			return codigo.includes(turn);
		})){
			let arrayOfDays = codigo.split(turno)[0].split('');
			let hours = codigo.split(turno)[1];
			turno = turno.toUpperCase();
			arrayOfDays = arrayOfDays.map( hour => hour+turno);
			if(hours!=''){
				let arrayOfDaysAndHours = [];
				hours = hours.split('');
				for (var i = 0; i < hours.length; i++) {
					for (var j = 0; j < arrayOfDays.length; j++) {
						arrayOfDaysAndHours.push(arrayOfDays[j]+hours[i]);
					}
				}
				activeFields(arrayOfDaysAndHours);
			}else{
				activeFields(arrayOfDays);
			}
			
		}else{
			let arrayOfDays = codigo.split('');
			activeFields(arrayOfDays);
		}
	});
};

function activeFields(ids){
	for(let i=0;i<ids.length;i++){
			let elements = document.querySelectorAll(`[id^="${ids[i]}"]`);
			for (var j = 0; j< elements.length; j++) {
				arrayOfHours.unshift(elements[j]);
			}
		}
		for(let i=0;i<arrayOfHours.length;i++){
			arrayOfHours[i].classList.add("active");
		}
}

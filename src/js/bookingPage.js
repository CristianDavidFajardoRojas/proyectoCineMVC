let seatsContainer = document.querySelector('.seats');

let times_divs = document.querySelectorAll('.time-selector > div');


const id = new URL(window.location.href).searchParams.get("id");
const idSala = new URL(window.location.href).searchParams.get("idSala");
let uri = `${location.origin}${location.pathname}/v1/${id}/${idSala}`;

let dateSelected = false;
let timeSelected = false;
let selectAsientosEvent = false;

const selectSeat = (reservedSeats) => {

        let rows = document.querySelectorAll('.seats > div');

        rows.forEach(row => {
        let seats = row.querySelectorAll('div');
    
        seats.forEach(seat => {
            if ( seat.className != 'row-label')seat.className = 'seat reserved';
            
            reservedSeats.forEach(reservedSeat => {
                if(reservedSeat.row == row.className && reservedSeat.number == seat.id){
                    if ( seat.className != 'row-label')seat.className = 'seat reserved';
                }else if ( seat.className != 'row-label')seat.className = 'seat';
            })
    
            seat.addEventListener('click', () => {
                if (seat.className != 'seat selected' && seat.className != 'seat reserved' && seat.className != 'row-label') {
                    
                    if(seat.className == 'seat selected'){
                        seat.className = 'seat';}else{seat.className = "seat selected"}
                    
                } else {
                    if(seat.className == 'seat selected')seat.className = "seat";
         
                }
            })
        })
    
    
    
    });
};

const createFilas = (data) => {
    console.log(data);
    let lista = [];
    let filasDivs = '';

    data.forEach(asiento => {
        if(!lista.includes(asiento.fila)){
            lista.push(asiento.fila);
            filasDivs += `<div class = "${asiento.fila}"></div>`;
        }
    })

    seatsContainer.innerHTML = filasDivs;
    let filas = document.querySelectorAll('.seats > div');
    console.log(filas);




    filas.forEach((fila, index) => {
        let plantillaSeat = `<div class="row-label">${fila.className}</div>`;

        data.forEach(asiento => {
            if(fila.className == asiento.fila) {
                plantillaSeat += `<div class="seat reserved" id="${asiento.numero}"></div>`;
            } 
        })

        fila.innerHTML = plantillaSeat;
    })

};


const showDias = (data) => {
    let date_selector = document.querySelector('.date-selector');
    let lista = [];
    let plantilla = '';

    data.forEach(date => {
        const fecha = new Date(date.fecha_hora_inicio);
    
        const options = { month: 'long' };
        const nombreMes = fecha.toLocaleDateString('en-US', options).substring(0, 3).toUpperCase();

        const dia = fecha.getDate();

        let plantillaDiv = /*html*/`
            <div class="date">
                <div>${nombreMes}</div>
                <div>${dia}</div>
            </div>`;

        if(!lista.includes(plantillaDiv)) {
            lista.push(plantillaDiv);
            plantilla += plantillaDiv
        }
        
    date_selector.innerHTML = plantilla;
});
}











addEventListener('DOMContentLoaded', async(e)=>{

    let peticion = await fetch(uri);
    let res = await peticion.json();
    
    createFilas(res.data[0].salas.asientos);

    showDias(res.data[0].funciones);

    let dates_divs = document.querySelectorAll('.date-selector > div');
   
dates_divs.forEach(date => {
    
    date.addEventListener('click', () => {
        if (date.className != 'date selected') {
            dates_divs.forEach(dateDelete => {
                dateDelete.className = 'date';
            })
            date.className = "date selected"
            dateSelected = true;
            
        } else {
            date.className = "date";
            dateSelected = false;
            if(selectAsientosEvent == true){
                selectSeat([])
                selectAsientosEvent = false
            }
        }
        if(dateSelected == true && timeSelected == true){
            selectSeat([{row: 'C', number: 5}])
            selectAsientosEvent = true;
        }
    })
})


times_divs.forEach(time => {
    
    time.addEventListener('click', () => {
        if (time.className != 'time selected') {
            times_divs.forEach(timeDelete => {
                timeDelete.className = 'time';
            })
            time.className = "time selected"
            timeSelected = true;
        } else {
            time.className = "time";
            timeSelected = false;
            if(selectAsientosEvent == true){
                selectSeat([])
                selectAsientosEvent = false
            }
        }
        if(dateSelected == true && timeSelected == true){
            selectSeat([])
            selectAsientosEvent = true;
        }
    })
})



})
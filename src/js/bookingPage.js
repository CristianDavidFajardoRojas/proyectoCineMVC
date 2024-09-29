let seatsContainer = document.querySelector('.seats');
let price = document.querySelectorAll('.price');
let buy_button = document.querySelector('.buy-button');

const id = new URL(window.location.href).searchParams.get("id");
const idSala = new URL(window.location.href).searchParams.get("idSala");
let uri = `${location.origin}${location.pathname}/v1/${id}/${idSala}`;

let dateSelected = false;
let timeSelected = false;
let selectAsientosEvent = false;

let precioAsientos;
let precio;

let asientosSeleccionados = [];


const addEventListenerButton = () => {
    let rows = document.querySelectorAll('.seats > div');
    let seats = rows[0].querySelectorAll('div');
    

    rows.forEach(row => {
    let seats = row.querySelectorAll('div')

    seats.forEach(seat => {


    seat.addEventListener('click', () => {
        if ( seat.className != 'seat reserved' && seat.className != 'row-label') {
        if(seat.className == 'seat selected'){
            seat.className = 'seat';
            asientosSeleccionados = asientosSeleccionados.filter(asiento => 
                !(asiento.fila === row.className && asiento.numero === seat.id)
            );
            precio = precioAsientos * asientosSeleccionados.length;
            price[0].innerHTML = `Price $${precio}`;
            if(asientosSeleccionados.length == 0)buy_button.removeAttribute('id');
        }else{
            seat.className = "seat selected"
            asientosSeleccionados.push({fila: row.className, numero: seat.id})
            buy_button.id = "Buy_Available";
            
            precio = precioAsientos * asientosSeleccionados.length;
            price[0].innerHTML = `Price $${precio}`;
        }}})
    })});

    buy_button.addEventListener('click', (e) => {
        if(asientosSeleccionados.length != 0){
            alert("hola mundo")
        }
    });
    
};




const selectSeat = (reservedSeats) => {
    asientosSeleccionados = [];
    buy_button.removeAttribute('id');
    precio = precioAsientos * asientosSeleccionados.length;
                price[0].innerHTML = `Price $${precio}`;
        let rows = document.querySelectorAll('.seats > div');

        rows.forEach(row => {
        let seats = row.querySelectorAll('div');

        // reservedSeats.forEach(reserved => {
        //     seats.forEach(seat => {
        //         if(reserved.fila == row.className && reserved.numero == seat.id){
        //             if ( seat.className != 'row-label')seat.className = 'seat reserved';
        //         }else if ( seat.className != 'row-label')seat.className = 'seat';

        // })

        seats.forEach(seat => {
            if(timeSelected == true){
                if ( seat.className != 'row-label')seat.className = 'seat';
            }
    
            reservedSeats.forEach(reservedSeat => {
                if(reservedSeat.fila == row.className && reservedSeat.numero == seat.id){
                    if ( seat.className != 'row-label')seat.className = 'seat reserved';
                }
            })
    
            
            if (selectAsientosEvent != true) {
                addEventListenerButton();
                selectAsientosEvent = true
            }
            
                                          
                                      
        })
        seats.forEach(seat => {
            if(timeSelected == false){
                if ( seat.className != 'row-label')seat.className = 'seat reserved';
            }
        })  
    });
};

const createFilas = async(data) => {
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


const showTime = (data) => {
    let dateInfo = document.querySelectorAll('.date.selected > div');
    let date_selector = document.querySelector('.time-selector');
    let lista = [];
    let plantilla = '';
    let fecha;

    //console.log(dateInfo[0].innerHTML);

    data.forEach(date => {  
        fecha = new Date(date.fecha_hora_inicio);   
    
        const options = { month: 'long' };
        const nombreMes = fecha.toLocaleDateString('en-US', options).substring(0, 3).toUpperCase();
        
        const dia = fecha.getDate();

        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();

        const horaFormateada = hora.toString().padStart(2, '0');
        const minutosFormateados = minutos.toString().padStart(2, '0');

        if(dateInfo[0].innerHTML == nombreMes && dateInfo[1].innerHTML == dia){
            plantilla += /*html*/`
            <div class="time" id="${date._id}">${horaFormateada}:${minutosFormateados}</div>`
        }
        
        date_selector.innerHTML = plantilla;
});


let times_divs = document.querySelectorAll('.time-selector > div');
times_divs.forEach(time => {
        

    time.addEventListener('click', () => {
        if (time.className != 'time selected') {
            times_divs.forEach(timeDelete => {
                timeDelete.className = 'time';
            })
            time.className = "time selected"
            timeSelected = true;
            data.forEach(funcion=>{
                if(funcion._id == time.id)selectSeat(funcion.asientos_ocupados);
            });
        } else {
            time.className = "time";
            timeSelected = false;
            data.forEach(funcion=>{
                if(funcion._id == time.id)selectSeat(funcion.asientos_ocupados);
            });
        }
        // if(timeSelected == true){
        //     data.forEach(funcion=>{
        //         if(funcion._id == time.id)selectSeat(funcion.asientos_ocupados);
        //     });
        // }
    })
})

}









addEventListener('DOMContentLoaded', async(e)=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();
    
    precioAsientos = res.data[0].salas.precio;

    createFilas(res.data[0].salas.asientos);

    showDias(res.data[0].funciones);

    let dates_divs = document.querySelectorAll('.date-selector > div');
   
dates_divs.forEach(date => {
    
    date.addEventListener('click', () => {
        if (date.className != 'date selected') {
            dates_divs.forEach(dateDelete => {
                dateDelete.className = 'date';
                timeSelected = false;
                selectSeat([]);
            })
            date.className = "date selected"
            showTime(res.data[0].funciones);
            selectSeat([]);
            
        } else {
            date.className = "date";
            let date_selector = document.querySelector('.time-selector');
            date_selector.innerHTML = "";
            timeSelected = false;
            selectSeat([]);
        }
    })
})


})
//const { ObjectId } = require("bson");

const id = new URL(window.location.href).searchParams.get("idFuncion");
let uri = `${location.origin}${location.pathname}/v1/${id}`;

let movieTitle = document.querySelector('.movie-title');
let movieGenre = document.querySelector('.movie-genre');
let moviePoster = document.querySelector('.movie-poster');
let movieSala = document.querySelector('.movie-location');
let movieDate = document.querySelector('.movie-datetime');
let orderNumber = document.querySelector('.order-number');
let ticketDetails = document.querySelector('.ticket-details');
let totalTicket = document.querySelector('#total');
let paymentCard = document.querySelectorAll('.payment-card');
let buyButton = document.querySelector('.buy-button');



addEventListener('DOMContentLoaded', async()=>{
    let asientos = JSON.parse(localStorage.getItem('asientos'));
    if(!asientos){location.href = "/mainPage"};
    let cantidadAsientos = asientos.length;

    let peticion = await fetch(uri);
    let res = await peticion.json();

    console.log(res.data[0])

    movieTitle.innerHTML = res.data[0].peliculaInfo.titulo;
    movieGenre.innerHTML = res.data[0].peliculaInfo.genero;
    moviePoster.style.backgroundImage = `url('${res.data[0].peliculaInfo.imagen}')`;
    moviePoster.style.backgroundSize = "cover";
    movieSala.innerHTML = res.data[0].salaInfo.nombre;

    const fecha = new Date(res.data[0].fecha_hora_inicio);

    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

    const nombreFecha = fecha.toLocaleDateString('en-US', optionsDate);
    const horaMinutos = fecha.toLocaleTimeString('en-US', optionsTime);

    const fechaCompleta = `${nombreFecha}, ${horaMinutos}`;

    movieDate.innerHTML = fechaCompleta;
    orderNumber.innerHTML = `ORDER NUMBER : ${res.data[0].idTicket}`;

    ticketDetails.innerHTML = `<span>SEATS</span>
    <span>$${res.data[0].salaInfo.precio} x ${cantidadAsientos}</span>`;

    let total = ((res.data[0].salaInfo.precio) * cantidadAsientos) + 1.99;
    totalTicket.innerHTML = `<span>TOTAL</span>
    <span>$${total}</span>`; 

    paymentCard.forEach(card => {
        card.addEventListener('click', () => {
            if(card.id != 'card-selected'){
                paymentCard.forEach(deleteId => {deleteId.id = '';})
                card.id = 'card-selected';
                buyButton.id = 'buy-available'
            } else {
                card.id = '';
                buyButton.id = ''
            }
        })
    })


    let back_button = document.querySelector('.back-button');
    back_button.addEventListener('click', () => {
        window.location.href = `/bookingPage?id=${res.data[0].peliculaInfo._id}&idSala=${res.data[0].salaInfo._id}`;
    })


    buyButton.addEventListener('click', async() => {
        if(buyButton.id == 'buy-available'){
            let ticket = {
                _id: res.data[0].idTicket,
                function_id: id,
                cliente_id: res.data[0].clienteInfo._id,
                asientos: asientos,
                precio: total,
                precio_compra: new Date()
            };
            let peticion = await fetch(`${location.origin}${location.pathname}/v1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticket
                })
            });

            let res1 = await peticion.json();
            console.log(res1);
            alert(res.message);
            localStorage.removeItem('asientos');
            location.href = "/mainPage";
        }
    });




    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                clearInterval(interval);
                location.href = "/mainPage"; 
            }
        }, 1000);
    }
    
    window.onload = function () {
        var fiveMinutes = 60 * 5,
            display = document.querySelector('#timer');
        startTimer(fiveMinutes, display);
    };

})
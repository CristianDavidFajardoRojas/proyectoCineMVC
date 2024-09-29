const id = new URL(window.location.href).searchParams.get("id");
let uri = `${location.origin}${location.pathname}/v1/${id}`;
let ticketInfo = document.querySelector('.ticket-info');

addEventListener('DOMContentLoaded', async()=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();

    console.log(res);

    let moviePoster = document.querySelector('.movie-poster');
    moviePoster.style.backgroundImage = `url('${res.movieInfo.imagen}')`;
    moviePoster.style.backgroundSize = "cover";

    let movieTitle = document.querySelector('.movie-title');
    movieTitle.innerHTML = res.movieInfo.titulo 

    let salaNombre = document.querySelector('#salaNombre');
    salaNombre.innerHTML = res.salaInfo.nombre 

    const fecha_compra = new Date(res.fecha_compra);
    const fecha_funcion = new Date(res.funcionInfo.fecha_hora_inicio);
    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

    let asientosPlantilla = '';
    res.asientos.forEach(asiento => {
        if(res.asientos[res.asientos.length - 1].fila == asiento.fila && res.asientos[res.asientos.length - 1].numero == asiento.numero){
            asientosPlantilla += `${asiento.fila}${asiento.numero}`;
        }else {
            asientosPlantilla += `${asiento.fila}${asiento.numero}, `;
        }
    }) 

    let plantilla = /*html*/`
    <div class="info-item">
        <p class="info-label"> Purchase Date</p>
        <p class="info-value">${fecha_compra.toLocaleDateString('en-US', optionsDate)}</p>
    </div>
    <div class="info-item">
        <p class="info-label">Date</p>
        <p class="info-value">${fecha_funcion.toLocaleDateString('en-US', optionsDate)}</p>
    </div>
    <div class="info-item">
        <p class="info-label">Time</p>
        <p class="info-value">${fecha_funcion.toLocaleTimeString('en-US', optionsTime)}</p>
    </div>
    <div class="info-item">
        <p class="info-label">Seat</p>
        <p class="info-value">${asientosPlantilla}</p>
    </div>
    <div class="info-item">
        <p class="info-label">Cost</p>
        <p class="info-value">$${res.precio}</p>
    </div>
    <div class="info-item">
        <p class="info-label">Order ID</p>
        <div class="info-wrap">
            <p class="info-value">${res._id}</p>
        </div>
    </div>
    `;

    ticketInfo.innerHTML = plantilla;

    let back_button = document.querySelector('.back-button');
    back_button.addEventListener('click', () => {
        window.location.href = `/mainPage`;
    })

    // movieTitle.innerHTML = res.data[0].peliculaInfo.titulo;
    // movieGenre.innerHTML = res.data[0].peliculaInfo.genero;
    // moviePoster.style.backgroundImage = `url('${res.data[0].peliculaInfo.imagen}')`;
    // moviePoster.style.backgroundSize = "cover";
    // movieSala.innerHTML = res.data[0].salaInfo.nombre;

    // const fecha = new Date(res.data[0].fecha_hora_inicio);

    // const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    // const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

    // const nombreFecha = fecha.toLocaleDateString('en-US', optionsDate);
    // const horaMinutos = fecha.toLocaleTimeString('en-US', optionsTime);

    // const fechaCompleta = `${nombreFecha}, ${horaMinutos}`;

    // movieDate.innerHTML = fechaCompleta;
    // orderNumber.innerHTML = `ORDER NUMBER : ${res.data[0].idTicket}`;

    // ticketDetails.innerHTML = `<span>SEATS</span>
    // <span>$${res.data[0].salaInfo.precio} x ${cantidadAsientos}</span>`;

    // let total = ((res.data[0].salaInfo.precio) * cantidadAsientos) + 1.99;
    // totalTicket.innerHTML = `<span>TOTAL</span>
    // <span>$${total}</span>`; 

    // paymentCard.forEach(card => {
    //     card.addEventListener('click', () => {
    //         if(card.id != 'card-selected'){
    //             paymentCard.forEach(deleteId => {deleteId.id = '';})
    //             card.id = 'card-selected';
    //             buyButton.id = 'buy-available'
    //         } else {
    //             card.id = '';
    //             buyButton.id = ''
    //         }
    //     })
    // })


    // let back_button = document.querySelector('.back-button');
    // back_button.addEventListener('click', () => {
    //     window.location.href = `/bookingPage?id=${res.data[0].peliculaInfo._id}&idSala=${res.data[0].salaInfo._id}`;
    // })
});
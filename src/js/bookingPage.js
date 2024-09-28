let rows = document.querySelectorAll('.seats > div');
let dates_divs = document.querySelectorAll('.date-selector > div');
let times_divs = document.querySelectorAll('.time-selector > div');

let dateSelected = false;
let timeSelected = false;
let selectAsientosEvent = false;

const selectSeat = (reservedSeats) => {

        console.log(reservedSeats)

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










addEventListener('DOMContentLoaded', async(e)=>{

    











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
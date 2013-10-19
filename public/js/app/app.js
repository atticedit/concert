'use strict';

var tickets = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createSeats').click(createSeats);
}

// // -------------------------------------------------------------------- //
// // -------------------------click events------------------------------- //
// // -------------------------------------------------------------------- //

function createSeats(){
  var number = parseInt($('#number').val(),10);
  var seatType = $('#select').val();
  var price = parseInt($('#price').val(),10);

  var seatSection = '';
  if(seatType === 'VIP'){
    seatSection = 'VIP';
    seatType = 'vip';
  }else{
    seatSection = 'GA';
    seatType = 'general';
  }
  seatGenerator(number, seatType, price, seatSection);
  ticketGenerator(number, price, seatSection);
}


// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
function seatGenerator(number, seatType, price, seatSection){
  for(var i = 1; i <= number; i++){
    var $seat = $('<div></div>');
    if(seatSection === 'VIP'){
      $seat.addClass('seatVip');
      $seat.text(seatSection + i);
      $('#vip').append($seat);
    }else{
      $seat.addClass('seatGeneral');
      $seat.text(seatSection + i);
      $('#general').append($seat);
    }
  }
}

function ticketGenerator(number, price, seatSection){
  for(var i = 1; i <= number; i++){
    var ticket = {};
    ticket.price = price;
    ticket.seatNumber = seatSection + (i);
    tickets.push(ticket);
  }
}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

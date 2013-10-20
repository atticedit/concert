'use strict';

var tickets = [];
var grids = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createSeats').click(createSeats);//beyond this point happened since the last push
  // $('#wrapper').on('dblclick', '.seatVip', reserveSeat);
  // $('#wrapper').on('dblclick', '.seatGeneral', reserveSeat);
}

// -------------------------------------------------------------------- //
// -------------------------click events------------------------------- //
// -------------------------------------------------------------------- //

function createSeats(){
  var number = parseInt($('#number').val(),10);
  var seatType = $('#select').val();
  var price = parseInt($('#price').val(),10);

  var seatSection = '';
  if(seatType === 'VIP'){
    seatSection = 'VIP';
    seatType = 'vip';
    grids.push('vip');
  }else{
    seatSection = 'GA';
    seatType = 'general';
    grids.push('general');
  }
  seatGenerator(number, seatType, price, seatSection);
  ticketGenerator(number, price, seatSection);
  removeControls();
}

// function reserveSeat(){//works in browser but not unit tested yet
//   var $name = $('#name').val();
//   var $seat = $(this);
//   if($(this).hasClass('reserved')){
//     alert('This seat is already reserved');
//   }else if($name === ''){
//     alert('please input name');
//   }else{
//     $seat.addClass('reserved');
//     var reservedSeatNumber = parseInt($seat.text(), 10);
//     var reservedSeatIndex = reservedSeatNumber - 1;

//     tickets[reservedSeatIndex].name = $name;
//   }
// }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function seatGenerator(number, seatType, price, seatSection){
  for(var i = 1; i <= number; i++){
    var $seat = $('<div></div>');
    if(seatSection === 'VIP'){
      $seat.addClass('seatVip');
      $seat.text(i);
      $('#vip').append($seat);
    }else{
      $seat.addClass('seatGeneral');
      $seat.text(i);
      $('#general').append($seat);
    }
  }
}

function ticketGenerator(number, price, seatSection){
  for(var i = 1; i <= number; i++){
    var ticket = {};
    ticket.price = price;
    ticket.seatNumber = seatSection + (i);
    ticket.name = '';
    tickets.push(ticket);
  }
}

function removeControls(){
  // alert('removeControls just done got called!');
  if(grids.length > 1){
    $('.adminControls').remove();
  }
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

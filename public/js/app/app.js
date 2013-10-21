'use strict';

var tickets = [];
var grids = [];
var reporting = {};
reporting.vipTotal = 0;
reporting.gaTotal = 0;
reporting.vipTickets = 0;
reporting.gaTickets = 0;

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createSeats').click(createSeats);
  $('#wrapper').on('dblclick', '.seatVip', reserveSeat);
  $('#wrapper').on('dblclick', '.seatGeneral', reserveSeat);
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

function reserveSeat(){
  var $name = $('#name').val();
  var $seat = $(this);
  var $seatClass = '';
  if($(this).hasClass('seatVip')){
    $seatClass = 'VIP';
  }else{
    $seatClass = 'GA';
  }
  if($(this).hasClass('reserved')){
    alert('This seat is already reserved.');
  }else if($name === ''){
    alert('Please input a name.');
  }else{
    $seat.addClass('reserved');
    $seat.append('<p>' + $name + '</p>');
    var reservedSeat = $seatClass + parseInt($seat.text(), 10);

    var reservedSeatIndex = _.find(tickets, function(ticket){ return ticket.seatNumber === reservedSeat });
    reservedSeatIndex.name = $name;
    $(this).children().text($name);
    htmlUpdateTable();
    htmlUpdateSeatList($seatClass, reservedSeat, $name);
  }
}

function htmlUpdateTable(){
  var reservedSeats = _.filter(tickets, function(ticket){return ticket.name !== ''});
  $('#totalTickets').text(reservedSeats.length);

  var vipSeats = _.filter(reservedSeats, function(ticket){return ticket.seatNumber.slice(0,1) == 'V'});
  $('#vipTickets').text(vipSeats.length);
  if(vipSeats.length > 0){
    var vipPrice = vipSeats[0].price;
  }else{
    var vipPrice = 0;
  }
  $('#totalVip').text(vipPrice * vipSeats.length);

  var gaSeats = _.filter(reservedSeats, function(ticket){return ticket.seatNumber.slice(0,1) == 'G'});
  $('#gaTickets').text(gaSeats.length);
  if(gaSeats.length > 0){
    var gaPrice = gaSeats[0].price;
  }else{
    var gaPrice = 0;
  }
  $('#totalGa').text(gaPrice * gaSeats.length);

  $('#grandTotal').text((vipPrice * vipSeats.length) + (gaPrice * gaSeats.length));
}

function htmlUpdateSeatList($seatClass, reservedSeat, $name){
  debugger;
  var $listItem = '<li>' + reservedSeat + ' ' + $name + '</li>';
  if($seatClass == 'VIP'){
    $('#vipSeatList').prepend($listItem);
  }else{
    $('#gaSeatList').prepend($listItem);
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function seatGenerator(number, seatType, price, seatSection){
  for(var i = 1; i <= number; i++){
    var $seat = $('<div><p class="hide"></p></div>');
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

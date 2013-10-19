'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Create seat sections', function(){
  expect(12);

  $('#select').val('GA');
  $('#number').val('200');
  $('#price').val('35');
  $('#createSeats').trigger('click');
  deepEqual($('#general > div').length, 200, 'after first click, GA grid should have 200 seats');
  deepEqual($('#wrapper').length, 1, 'after first click, should be one grid in the #wrapper');
  deepEqual($('#general:last-child').text(), 'GA200', 'after first click, p in last GA seat should have value of GA200'); // if fails, try no parens on 200
  deepEqual(tickets.length, 200, 'after first click, should be an array with 200 objects');
  deepEqual(tickets[199].price, 35, 'after first click, price property at array index 199 should be 35');
  deepEqual(tickets[199].seatNumber, 'GA200', 'after first click, seat number property at array index 199 should be GA200');

  $('#select').val('VIP');
  $('#number').val('60');
  $('#price').val('65');
  $('#createSeats').trigger('click');
  deepEqual($('#vip > div').length, 60, 'after second click, VIP grid should have 60 seats');
  deepEqual($('#wrapper').length, 2, 'after second click, should be two grids in the #wrapper');
  deepEqual($('#vip:last-child').text(), 'VIP60', 'after second click, p in last VIP seat should have value of VIP60'); // if fails, try no parens on 200
  deepEqual(tickets.length, 260, 'after second click, should be an array with 260 objects');
  deepEqual(tickets[259].price, 65, 'after second click, price property at array index 259 should be 65');
  deepEqual(tickets[259].seatNumber, 'VIP60', 'after second click, seat number property at array index 259 should be VIP60');
});

// test('Create seat sections, in reverse order', function(){
//   expect(12);

//   $('#select').val('VIP');
//   $('#number').val('60');
//   $('#price').val('65');
//   $('#createSeats').trigger('click');
//   deepEqual($('.seatVip').length, 60, 'after first click, VIP grid should have 60 seats');
//   deepEqual($('#vip > div').length, 1, 'after first click, should be one grids');
//   deepEqual($('.seatVip:last-child > p').text(), '60', 'after first click, p in last VIP seat should have value of 60'); // if fails, try no parens on 200
//   deepEqual($tickets.length, 60, 'after first click, should be an array with 60 objects');
//   deepEqual($tickets[59].price, 65, 'after first click, price property at array index 59 should be 65');
//   deepEqual($tickets[59].seatnumber, 'VIP60', 'after first click, seat number property at array index 59 should be VIP60');

//   $('#select').val('GA');
//   $('#number').val('200');
//   $('#price').val('35');
//   $('#createSeats').trigger('click');
//   deepEqual($('.seatGeneral').length, 200, 'after second click, GA grid should have 200 seats');
//   deepEqual($('#general > div').length, 2, 'after second click, should be two grids');
//   deepEqual($('.seatGeneral:last-child > p').text(), '200', 'after second click, p in last GA seat should have value of 200'); // if fails, try no parens on 200
//   deepEqual($tickets.length, 260, 'after second click, should be an array with 260 objects');
//   deepEqual($tickets[259].price, 35, 'after second click, price property at array index 259 should be 35');
//   deepEqual($tickets[259].seatnumber, 'GA200', 'after second click, seat number property at array index 259 should be GA200');
// });
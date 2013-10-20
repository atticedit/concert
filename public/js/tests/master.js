'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}
function teardownTest(){
  tickets = [];
}

test('Create seat sections', function(){
  expect(10);

  $('#select').val('GA');
  $('#number').val('200');
  $('#price').val('35');
  $('#createSeats').trigger('click');
  deepEqual($('#general > div').length, 200, 'after first click, GA grid should have 200 seats');
  // deepEqual($('#wrapper').length, 1, 'after first click, should be one grid in the #wrapper');//deleting as we know #general is there because we just checked it had 200 seats in it.
  deepEqual($('#general > div:last-child').text(), '200', 'after first click, div in last GA seat should have value of 200');
  deepEqual(tickets.length, 200, 'after first click, should be an array with 200 objects');
  deepEqual(tickets[199].price, 35, 'after first click, price property at array index 199 should be 35');
  deepEqual(tickets[199].seatNumber, 'GA200', 'after first click, seat number property at array index 199 should be GA200');

  $('#select').val('VIP');
  $('#number').val('60');
  $('#price').val('65');
  $('#createSeats').trigger('click');
  deepEqual($('#vip > div').length, 60, 'after second click, VIP grid should have 60 seats');
  // deepEqual($('#wrapper').length, 2, 'after second click, should be two grids in the #wrapper');//same as above. Plus there will be 3 divs in the wrapper from the body, regardless of the click events (#vip, #filler & #general)
  deepEqual($('#vip > div:last-child').text(), '60', 'after second click, div in last VIP seat should have value of 60');
  deepEqual(tickets.length, 260, 'after second click, should be an array with 260 objects');
  deepEqual(tickets[259].price, 65, 'after second click, price property at array index 259 should be 65');
  deepEqual(tickets[259].seatNumber, 'VIP60', 'after second click, seat number property at array index 259 should be VIP60');
  teardownTest();
});



test('Create seat sections, in reverse order', function(){
  expect(10);

  $('#select').val('VIP');
  $('#number').val('60');
  $('#price').val('65');
  $('#createSeats').trigger('click');
  deepEqual($('#vip > div').length, 60, 'after first click, VIP grid should have 60 seats');
  // deepEqual($('#vip > div').length, 1, 'after first click, should be one grids');
  deepEqual($('#vip > div:last-child').text(), '60', 'after first click, div in last VIP seat should have value of 60');
  deepEqual(tickets.length, 60, 'after first click, should be an array with 60 objects');
  deepEqual(tickets[59].price, 65, 'after first click, price property at array index 59 should be 65');
  deepEqual(tickets[59].seatNumber, 'VIP60', 'after first click, seat number property at array index 59 should be VIP60');

  $('#select').val('GA');
  $('#number').val('200');
  $('#price').val('35');
  $('#createSeats').trigger('click');
  deepEqual($('#general > div').length, 200, 'after second click, GA grid should have 200 seats');
//   deepEqual($('#general > div').length, 2, 'after second click, should be two grids');
  deepEqual($('#general > div:last-child').text(), '200', 'after second click, div in last GA seat should have value of 200');
  deepEqual(tickets.length, 260, 'after second click, should be an array with 260 objects');
  deepEqual(tickets[259].price, 35, 'after second click, price property at array index 259 should be 35');
  deepEqual(tickets[259].seatNumber, 'GA200', 'after second click, seat number property at array index 259 should be GA200');
  teardownTest();
});

test('admin controls disappear when both seat grids exist', function(){
  expect(1);

  $('#select').val('VIP');
  $('#number').val('60');
  $('#price').val('65');
  $('#createSeats').trigger('click');//creates first grid of seats

  // deepEqual($('body > div:nth-child(2)').hasClass('.adminControls'), true, 'after first click adminControls are available');
  //(must be still available after first click or second click test couldn't have passed. Still, couldn't get this to work so syntax must be wrong);
  $('#select').val('GA');
  $('#number').val('200');
  $('#price').val('35');
  $('#createSeats').trigger('click');//creates second grid of seats

  deepEqual($('body > .row:nth-child(2)').hasClass('adminControls'), false, 'after second click adminControls are not available');//not confident about the syntax here. When I tried the inverse it also came out false :(
  teardownTest();
});


test('reservation system applies names correctly', function(){
  expect(2);
//does the following commented bit need to be done or does it already exist from previous tests? Uncomment if necessary
  $('#select').val('GA');
  $('#number').val('200');
  $('#price').val('35');
  $('#createSeats').trigger('click');
  $('#name').val('alice');
  $('#general > div:nth-child(10)').trigger('dblclick');//reserves the 10th general admission seat


  deepEqual($('#general > div:nth-child(10)').hasClass('.reserved'), true, 'after GA10 is double clicked it gets the class of "reserved"');
  deepEqual(tickets[9].name, 'alice', 'the index 9 ticket object in the tickets array should have the name property of alice');
  teardownTest();
});

test('Ensure reservations cannot be overwritten', function(){
  expect(2);

  $('#select').val('GA');
  $('#number').val('200');
  $('#price').val('35');
  $('#createSeats').trigger('click');//creates seating grid
  $('#name').val('alice');
  $('#general > div:nth-child(10)').trigger('dblclick');//reserves seat 10 for 'alice'
  $('#name').val('jack');
  $('#general > div:nth-child(10)').trigger('dblclick');//reserves seat 10 for 'jack'

  deepEqual($('#general > div:nth-child(10)').hasClass('.reserved'), true, 'seat GA10 should still be reserved');
  deepEqual(tickets[9].name, 'alice', 'the name at index 9 in the tickets array should still be alice');
});

// test('Start reporting when seats are reserved', function(){
//   $('#select').val('GA');
//   $('#number').val('200');
//   $('#price').val('35');
//   $('#createSeats').trigger('click');//creates seating grid
//   $('#name').val('alice');
// $('#general > div:nth-child(10)').trigger('dblclick');//reserves seat 10 for 'alice'
  // deepEqual($('#'))


// });
const flights = [
  { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
  { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
  { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
  { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
  { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
  { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
  { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
  { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
  { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
  { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
  { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false },
];

function airlinesPro() {
  airlines();

  const user = prompt('What is your role? Please enter user or admin').toLowerCase();

  if (user === 'admin') {
    executeAdmin();
  } else if (user === 'user') {
    executeUser();
  } else {
    alert("Sorry, you can't have access to the flights");
  }

  function executeAdmin() {
    const todo = prompt('Enter 1 to add a flight. Enter 2 to delete a flight');

    if (todo === '1') {
      addFlight();
    } else if (todo === '2') {
      deleteFlight();
    } else {
      const valid = confirm('That input was invalid. Would you like to try again?');
      if (valid) executeAdmin();
      return;
    }
    const repeat = confirm('Admin, would you like to do anything else?');
    if (repeat) executeAdmin();

    function addFlight() {
      const origin = prompt('Enter the origin.');
      const destination = prompt('Enter the destination.');
      const cost = prompt('Enter the cost.');
      const connecting = prompt('Is it a connecting flight? Enter true or false');

      flights.push({
        id: flights.length,
        to: destination,
        from: origin,
        cost: parseInt(cost),
        scale: connecting,
      });
      console.table(flights);
    }

    function deleteFlight() {
      const flightNumber = parseInt(
        prompt('Enter the number (id) of the flight you would like to delete')
      );
      const flightIndex = flights.map((flight) => flight.id).indexOf(flightNumber);
      flights.splice(flightIndex, 1);
      console.table(flights);
    }
  }

  function executeUser() {
    askPrice();
    buyTicket();

    function askPrice() {
      const ascendingPrice = flights.sort((a, b) => a.cost - b.cost);
      const price = parseInt(
        prompt(
          'Enter a price. The console will show you flights above, below and equal to that price tag.'
        )
      );
      ascendingPrice.forEach((flight, i) => {
        if (i === 0 && flight.cost < price) console.log(`CHEAPER THAN ${price}€`);
        if (ascendingPrice[i - 1]?.cost < price && flight.cost === price)
          console.log(`SAME PRICE (${price}€)`);
        if (ascendingPrice[i - 1]?.cost <= price && flight.cost > price)
          console.log(`MORE EXPENSIVE THAN ${price}€`);

        console.log(
          `The ${flight.scale ? 'connecting' : 'direct'} flight number ${flight.id} with origin ${
            flight.from
          } and destination ${flight.to} has a cost of ${flight.cost}€.`
        );
      });
    }

    function buyTicket() {
      const flightID = parseInt(
        prompt('What flight would you like to purchase? Please enter the flight number')
      );
      const flight = flights.filter((flight) => flight.id === flightID)[0];
      alert(`
        Thank you for your purchase.
        
        Your ticket for the ${flight.scale ? 'connecting' : 'direct'} flight number 
        ${flight.id} with origin ${flight.from} and destination ${flight.to}  
        (${flight.cost}€) will be sent to you by email.      
      `);
    }
  }
}
airlinesPro();

function airlines() {
  const username = prompt("Hi! What's your name").trim();

  if (username === null || username === '') {
    alert("Sorry, we couldn't get your name. Please check the available flights in the console");
  } else {
    alert(`Welcome ${username}. Check the available flights in the console.`);
  }

  let totalCost = 0;
  console.log('THESE ARE THE AVAILABLE FLIGHTS');
  flights.forEach((flight) => {
    console.log(
      `The ${flight.scale ? 'connecting' : 'direct'} flight number ${flight.id} with origin ${
        flight.from
      } and destination ${flight.to} has a cost of ${flight.cost}€.`
    );
    totalCost += flight.cost;
  });

  console.log(`The average cost of a flight is ${(totalCost / flights.length).toFixed(2)}€.`);

  const connectingFlights = flights.filter((flight) => flight.scale).length;
  console.log(
    `There are ${connectingFlights} connecting flights and ${
      flights.length - connectingFlights
    } direct flights today.`
  );

  const lastDestinations = [];
  flights.slice(6).forEach((flight) => {
    lastDestinations.push(flight.to);
  });
  console.log(
    `The last destinations of today are ${lastDestinations.toString().replaceAll(',', ', ')}.`
  );
}

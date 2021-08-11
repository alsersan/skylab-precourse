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

function airlines() {
  const username = prompt("Hi! What's your name")?.trim();

  if (username === undefined || username === '') {
    alert("Sorry, we couldn't get your name. Please check the available flights in the console");
  } else {
    alert(`Welcome ${username}. Check the available flights in the console.`);
  }

  let totalCost = 0;
  console.log('THESE ARE THE AVAILABLE FLIGHTS');
  flights.forEach((flight) => {
    console.log(
      `The ${flight.scale ? 'connecting' : 'direct'} flight with origin ${
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
airlines();

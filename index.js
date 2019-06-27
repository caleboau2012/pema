let initialItems = require("./items");
let stops = require("./pickupstop");
let trailers = require("./trailers");

let orders = [];
let unallocated = JSON.parse(JSON.stringify(initialItems));

/**
 * This computes the volume of an item given its dimension
 * It is assumed that all items are boxes (for simplicity)
 * @param {*} dimensions
 */
const computeVolume = dimensions => {
  return dimensions.length * dimensions.breadth * dimensions.height;
};

/**
 * This computes the distance of a location (lat and long) from the current location (stop)
 * It uses the catseian distance of a line formula
 * @param {*} stop
 * @param {*} destination
 */
const computeDistance = (stop, destination) => {
  stop = stops.find(s => s.id === stop);
  destination = stops.find(s => s.id === destination);

  return Math.sqrt(
    Math.pow(stop.lat - destination.lat, 2) +
      Math.pow(stop.long - destination.long, 2)
  );
};

/**
 * This function returns the order for a truck at any stop.
 * The idea here is that the trucks should all head out to the different stops at the beginning of a day
 * when at the stop, the truck runs this function
 * This function is maximised to give the truck all items that are close by so they can complete the close orders while maintaining a full capacity
 * This function can be run at anytime a truck gets to a location and it will always return the most ideal ordering of items
 *
 * @param {*} trailer_id
 * @param {*} stop
 */
const pickUp = (trailer_id, stop) => {
  const trailer = trailers.find(t => t.id === trailer_id);

  const order = {
    trailer,
    items: []
  };

  let space = trailer.capacity;

  const items = unallocated.map(item => {
    item.distance = computeDistance(stop, item.destination);
    item.volume = computeVolume(item.dimensions);

    return item;
  });

  // try to greddily carry heavy things that are close to the current location

  // this sorts things close by, heaviest first
  items.sort((a, b) => {
    if (a.distance - b.distance === 0)
      // maximize volume
      return b.volume - a.volume;
    // minimise distance
    else return a.distance - b.distance;
  });

  // allocate these things to the trailer
  while (items.length > 0 && space - items[0].volume > 0) {
    space -= items[0].volume;
    order.items.push(items.shift());
  }

  // try to greddily carry light things that are close to the current location

  // this sorts things closeby and lightest first
  items.sort((a, b) => {
    if (a.distance - b.distance === 0)
      // minimize volume
      return a.volume - b.volume;
    // minimise distance
    else return a.distance - b.distance;
  });

  while (items.length > 0 && space - items[0].volume > 0) {
    space -= items[0].volume;
    order.items.push(items.shift());
  }

  unallocated = items;

  return order;
};

// assumption that alll orders are located in the first 5 stops
// and are intended to be shipped to the last 10 stops in the stops array
// This means we can send each trailer to the different stops to pick up things based on above sorting order
for (let i = 0; i < trailers.length; i++) {
  const trailer_id = i;
  const stop = i;
  orders.push(pickUp(trailer_id, stop));
}

orders.map(order => {
  console.log("itenerary for truck " + order.trailer.id);
  order.items.map(item => {
    console.log(stops.find(s => s.id === item.destination));
  });
});

// console.log(JSON.stringify(orders), unallocated.length);

// TODO

// find a way to use the current location of items to determine the original dispatch of trailers to make pickup

// compute distance from the warehouse
// unallocated = unallocated.map(item => {
//   item.distance = computeDistance(stops[0], item.location);
//   return item;
// });

// sort by distance from the warehouse
// unallocated.sort((a, b) => a.distance - b.distance);

// for each item, send a different trailer to pick up stuff at the location (greedily)

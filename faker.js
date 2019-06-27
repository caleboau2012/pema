let arr = [];
let chars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P"
];

for (let i = 0; i < 100; i++) {
  arr.push({
    id: i,
    dimensions: {
      length: Math.round(Math.random() * 100),
      breadth: Math.round(Math.random() * 100),
      height: Math.round(Math.random() * 100)
    },
    destination: 5 + Math.round(Math.random() * 10),
    location: 1 + Math.abs(Math.round(Math.random() * 10) - 5)
  });
}

// for (let i = 0; i < 16; i++) {
//   arr.push({
//     id: i,
//     name: chars[i],
//     long: 6 + Math.round(Math.random() * 10),
//     lat: 47 + Math.round(Math.random() * 10)
//   });
// }

// for (let i = 0; i < 10; i++) {
//   arr.push({
//     id: i,
//     capacity: 9000 + Math.round(Math.random() * 100),
//     driver_id: i
//   });
// }

console.log(JSON.stringify(arr));

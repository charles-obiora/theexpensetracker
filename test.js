const myArray = [1, 2, 3, 4, 5];

myArray.map((v) => console.log(v + 10));

function shout(strings, ...values) {
  // strings: ["Hello ", ", you have ", " messages"]
  // values: [name, count]
  return strings[0] + values.map(v => v.toUpperCase()) + strings[2];
}

const names = "Alice";
const count = "5";

console.log(shout`Hello ${names}, you have ${count} messages`);
// Output: "Hello ALICE5 messages"

const mongoose = require('mongoose');

main().catch(err => console.log(err));

//All your code run in the main function
async function main(){
  ////If it doesn't exist, it will create a database
  await mongoose.connect("mongodb://localhost:27017/fruitsDBs",{ useNewUrlParser:true});
  console.log("Connected successfully to server!");

  // Consider schema as a building, and we list all the material we need for this building to create rooms
  const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
  })
  // Consider model is a class, a building's name, it tells us which building and material we should look for.
  const Fruit = mongoose.model("Fruit",fruitSchema);

  // Now, let's create a room called fruit
  const fruit = new Fruit({
    name:"Apple",
    rating: 7,
    review: "Pretty solid as a fruit"
  });

//Save in the database.
  // await fruit.save();

  const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
  });

  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: "John",
    age: 45
  });

  //await person.save();


  const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best Fruit!"
  });

  const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
  });

  const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Weird texture"
  });

  // Fruit.insertMany([kiwi, orange, banana], function(err) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully saved all the fruits to fruitsDB");
  //   }
  // });

  Fruit.find(function(err, fruits){
    if (err) {
      console.log(err);
    } else {
      fruits.forEach(function(fruit){
        console.log(fruit.name);
      })
    }
  });

  mongoose.connection.close()
}

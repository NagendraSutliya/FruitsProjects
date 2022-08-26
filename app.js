//jshint esversion:6

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(url);

async function run () {
  try {
    // Connect the client to the mongodb server
    await client.connect();

    //Establish and verify connection
    await client.db("admin").command({ ping: 1});
    console.log("Connected Successfully to the Server");

    const database = client.db("fruitsDB");
    const fruits = database.collection("fruits");

    //create an array of documents to insert
    const docs = [
      {
        name: "Apple",
        score: 8,
        review: "Great Fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda Sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Great Stuff"
      }
    ];
    // This option prevents additional documents from inserted if one fails
    const options = { ordered: true};
    const result = await fruits.insertMany(docs, options);
    //Final Message
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close()
  }
}
run().catch(console.dir);


async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db(dbName);
    const collection = database.collection("fruits");

    const cursor = collection.find();

    // print a message if no documents were found
    if ((await cursor.countDocuments) === 0) {
      console.log("No documents found!");
    }

    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

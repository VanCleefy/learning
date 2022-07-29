const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://m001-student:m001-student@sandbox.vmxtn.mongodb.net/Sandbox?retryWrites=true&w=majority';

// Database Name
const dbName = 'sample_airbnb';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  //assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  findDocuments(db, function() {
    client.close();
  });
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('listingsAndReviews');
    //
    //console.log("Listing the coins:")
    // Find some documents
    collection.find({"name":"Ribeira Charming Duplex"}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs.forEach(element => {
          
           console.log("Name:" + element.name);
           console.log("ID:" + element._id)
           console.log("===============================================")
       })
       );
      //callback(docs);
    });
  }
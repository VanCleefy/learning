const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://m001-student:m001-student@sandbox.vmxtn.mongodb.net/Sandbox?retryWrites=true&w=majority';

// Database Name
const client = new MongoClient(url);
const dbName = 'sample_airbnb';
const db = client.db(dbName);
const collection = db.collection('listingsAndReviews');
// Create a new MongoClient


// Use connect method to connect to the Server
client.connect(function(err, client) {
  //assert.equal(null, err);
  console.log("-----------------------------");
  console.log("Connected correctly to server");
  console.log("-----------------------------");

  

  findDocuments(db, function() {
    client.close();
  });
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    
    //
    //console.log("Listing the coins:")
    // Find some documents
    collection.find({"accommodates": {"$gt" : 6 }, "number_of_reviews": {"$eq": 50}}).toArray(function(err, docs) {
      console.log("###########################");
      console.log("Found the following records");
      console.log("###########################");
      console.log(docs.forEach(element => {
          
           console.log("Name:" + element.name);
           console.log("ID:" + element._id)
           console.log("===============================================")
       })
       );
      //callback(docs);
    });
  }
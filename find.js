const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const http = require('http')


const hostname = '127.0.0.1'
const port = '8080'

var server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.write('Hello World\n')
    res.end();
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});


// Connection URL
const url = 'mongodb+srv://m001-student:m001-student@sandbox.vmxtn.mongodb.net/Sandbox?retryWrites=true&w=majority';

// Database Name
const dbName = 'coingecko';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  findDocuments(db, function() {
    client.close();
  });
});



const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('another_collection2');
    //
    console.log("Listing the coins:")
    // Find some documents
    collection.find({"accommodates":{"$gr":6},"number_of_reviews":{"$eq":50}}).toArray(function(err, docs) {
      assert.equal(err, null);
      //console.log("Found the following records");
      console.log(docs.forEach(element => {
          
          console.log("Name:" + element.name);
          console.log("ID:" + element._id)
          console.log("===============================================")
      })
      );
      //callback(docs);
    });
  }
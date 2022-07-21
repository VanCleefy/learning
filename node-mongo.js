const http = require('http')
const { MongoClient } = require("mongodb");

const hostname = '127.0.0.1'
const port = '8080'

var server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.write('Hello World\n')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})



async function main() {

	// Connection URI
	const uri ="mongodb+srv://m001-student:m001-student@sandbox.vmxtn.mongodb.net/Sandbox?retryWrites=true&w=majority";

	// Create a new MongoClient
	const client = new MongoClient(uri);

	try{
    	// Connect the client to the server
    	await client.connect();
	    
        await listDatabases(client);
	
    }catch(e) {
	
        console.error(e);
	
    }finally{
	
        await client.close();
	
    }
}

main().catch(console.error);

	async function listDatabases(client){
		const databaseList = await client.db().admin().listDatabases();
		console.log("Databases:");
		databaseList.databases.forEach(db => {
		console.log(` - ${db.name}`);
		})
	}

const express = require ("express");
const app = express(); 
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongoose/node_modules/mongodb");
const uri = "mongodb+srv://xtremeteam:cis350@cis350.1i5jv.mongodb.net/CIS350"
const client = new MongoClient(uri);

// async function main(){
//     try {
//         //Connect to the MongoDB cluster
//         await client.connect(); 
//         await listDatabases(client);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

app.use(cors());
app.use(express.json());

app.listen(3001, function() {
    console.log("express server is running on port 3001");
})

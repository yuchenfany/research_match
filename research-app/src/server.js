// const express = require ("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");

/* eslint-disable */
// Attempt to declare this so visible to all functions here
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://xtremeteam350:xtremeteamcis350@cis350.zp0x3.mongodb.net/cis350?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function main(){
    try {
        //Connect to the MongoDB cluster
        await client.connect(); 
        // await listDatabases(client);
        // await createListing(client, {
        //      username: "", 
        //      password: ""
        //  });
        await findPassword(client, "");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createListing(newListing) {
    const result = await client.db("research-app").collection("user-info").insertOne(newListing);
    console.log(`New Listing created with the following id: ${result.insertedId}`)
}

async function findPassword(usernameOfUser) {
    const result = await client.db("research-app").collection("user-info").findOne({username : usernameOfUser});

    if (result) {
        console.log(`username found with the username of ${usernameOfUser}`);
        console.log(`VERIFY THE PASSWORD WITH THIS ${result.password}`);

        console.log(result);
        return true;
    } else {
        console.log(`NO username found with the username of ${usernameOfUser}`);
        return false;
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// app.use(cors());
// app.use(express.json());

// app.listen(3001, function() {
//     console.log("express server is running on port 3001");
// })
/*
module.exports = {
    createListing, 
    findPassword
}
*/
// export default {createListing, findPassword};


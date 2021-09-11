const express = require("express");
const app = express();
const cors = require('cors');
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const PORT = process.env.PORT || 3000

app.use(cors({
   origin : "*"
}))

app.use(express.json());

let tasks= []
app.get("/", async function(req,res){
    try{
        //connect the database
        let client = await mongoClient.connect(url)

        //select the DB
        let db = client.db("login");

        //select the collection and perform the action
        let data = await db.collection("users").find({}).toArray();

        //close the connection
         client.close();

         res.json(tasks)
    }catch(error){
        res.status(500).json({
            message:"something went wrong"
        })
    }
})

app.post("/", async function(req,res){
    try{
        //connect the database
        let client = await mongoClient.connect(url)

        //select the DB
        let db = client.db("login");

        //select the collection and perform the action
        //delete req.body.confirmPassword;
        let data = await db.collection("tasks").insertOne(req.body)

        //close the connection
        await client.close();

        res.json({
            message: "Item added to Cart",
            id : data._id
        })

    }catch(error){
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

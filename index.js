const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());

//connecting to server
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.djrvmwe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//all works here
async function run(){
  try{
    await client.connect();
    const foodCollection = client.db('foodItems').collection('food');

    //get all food
    app.get('/food', async(req, res) => {
      const query = {};
      const result = await foodCollection.find().toArray();
      res.send(result);
    });
  }
  finally{}
}
run().catch(console.dir);

//home route from server side
app.get('/', (req, res) => {
  res.send('Hello From E-commerce-site');
})

//server side listening page
app.listen(port, () => {
  console.log(`E-Commerce-site is lisening on Port: ${port}`);
})
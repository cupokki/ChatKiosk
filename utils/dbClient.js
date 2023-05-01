//https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/retrieve/
//https://mongodb.github.io/node-mongodb-native/5.3/

const dotenv = require('dotenv')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://testuser:DkXT6bpaupxrGzkU@shop.vbflojj.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbName = "Shop";
let db, collection;

async function initiateMongoClient() {

  await client.connect()
    .then(() => {
      console.log("Connected to MongoDB");
      db = client.db(dbName);
      collection = db.collection('test');
      console.log(collection.find().toArray())
    })
    .catch((err) => {
      console.error(err);
    })

    

}
initiateMongoClient()
  // .then(() => {console.log()})
  .catch(console.error)

module.exports = client//, db, collection}
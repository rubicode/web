const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'tododb';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    
    const users = db.collection('users');
    const data = await users.find({isMarried: true}).toArray();
    console.log(data)
    return db;
  }
  
  main()
    .then(() => {

    })
    .catch(console.error)
    .finally(() => client.close());
import { MongoClient, ServerApiVersion } from "mongodb";

const dbUser = encodeURIComponent( process.env.MONGO_USERNAME || "");
const dbPassword = encodeURIComponent( process.env.MONGO_PWD || "");
const dbProtocol = process.env.MONGO_CLIENT_PROTOCOL || "";
const dbServerAndPort = process.env.MONGO_SERVER_AND_PORT || "";

const URI = `${dbProtocol}://${dbUser}:${dbPassword}@${dbServerAndPort}`;
console.log(`Connecting to MongoDB at ${URI}`);
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(`Pinged your deployment. You successfully connected to ${dbProtocol}://@${dbServerAndPort}`);
} catch (err) {
  console.error(err);
}

let db = client.db("prj_vm");

export default db;

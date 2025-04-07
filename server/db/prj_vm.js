import { MongoClient, ServerApiVersion } from "mongodb";

const dbUser = encodeURIComponent( process.env.DB_USER || "");
const dbPassword = encodeURIComponent( process.env.DB_PASSWORD || "");
const dbProtocol = process.env.MONGO_PROTOCOL || "";
const dbServerAndPort = process.env.SERVER_AND_PORT || "";

const URI = `${dbProtocol}://${dbUser}:${dbPassword}@${dbServerAndPort}`;
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

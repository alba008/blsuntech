import { MongoClient, ServerApiVersion } from "mongodb";

let _client;
let _db;

export async function getDb() {
  if (_db) return _db;

  const uri = process.env.MONGODB_URI;
  const name = process.env.MONGODB_DB || "blsuntech";

  if (!uri) {
    console.warn("[db] MONGODB_URI missing; DB disabled");
    return null;
  }

  _client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });

  await _client.connect();
  _db = _client.db(name);
  console.log("[db] connected to", name);
  return _db;
}

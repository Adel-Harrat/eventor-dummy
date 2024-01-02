import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://A03L:WAmtKcREyefB82cE@cluster0.dectqo7.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("events");

  await db.collection(collection).insertOne(document);
}

export async function getDocumentsBy(client, collection, find, sort) {
  const db = client.db("events");

  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();

  return documents;
}

export default function sendError(res, message, status = 500) {
  res.status(status).json({ message, status: "error" });
  return;
}

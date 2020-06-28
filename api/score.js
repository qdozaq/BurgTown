const url = require("url");
const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}

const sortScores = (a, b) => {
  if (a.score < b.score || (a.score === b.score && a.name > b.name)) {
    return 1;
  }
  return -1;
};

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = await db.collection("scores");

  const { name, score } = req.body;

  if (typeof name !== "string" || typeof score !== "number") {
    res.status(500).send();
  }

  let scores = await collection
    .find({})
    .sort({ score: -1, name: 1 })
    .limit(10)
    .toArray();

  const min = scores[scores.length - 1];

  console.log({ min, len: scores.length });

  if (scores.length >= 10 && score > min.score) {
    collection.update({ _id: min._id }, { score, name });
    scores = [...scores.slice(0, 9), { score, name }].sort(sortScores);
  } else if (scores.length < 10) {
    collection.insertOne({ score, name });
    scores = [...scores, { score, name }].sort(sortScores);
  }

  res.status(200).json({ scores });
};

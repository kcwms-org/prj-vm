import express from "express";

// This will help us connect to the database
import db from "../db/prj_vm.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "testimonials";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /testimonial.
const router = express.Router();

// This section will help you get a list of all the testimonial.
router.get("/", async (req, res) => {
  let collection = await db.collection(COLLECTION_NAME);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single testimonial by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection(COLLECTION_NAME);
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new testimonial.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      email: req.body.email,
      hideEmail: req.body.hideEmail || false,
      rating: req.body.rating,
      text: req.body.text,
    };
    let collection = await db.collection(COLLECTION_NAME);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding testimonial");
  }
});

// This section will help you update a testimonial by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        hideEmail: req.body.hideEmail || false,
        rating: req.body.rating,
        text: req.body.text,
      },
    };

    let collection = await db.collection(COLLECTION_NAME);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating testimonial");
  }
});

// This section will help you delete a testimonial
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection(COLLECTION_NAME);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting testimonial");
  }
});

export default router;

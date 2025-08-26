const express = require("express");
const router = express.Router();
const { Visit, User } = require("./schemas");

router.post("/track", async (req, res) => {
  const { fingerprint, influencer, source } = req.body;
  if (!fingerprint) return res.status(400).send("Fingerprint krävs");

  try {
    const visit = await Visit.findOneAndUpdate(
      { fingerprint },
      { influencer, source, timestamp: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("Tracked visit", visit);
    res.sendStatus(200);
  } catch (error) {
    console.error("Kan ej spara visit", error);
    res.status(500).send("Serverfel");
  }
});
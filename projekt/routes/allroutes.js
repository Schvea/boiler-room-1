const express = require("express");
const router = express.Router();
const { Visit, User } = require("../models/schemas");

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

router.post("/register", async (req, res) => {
  const { email, fingerprint } = req.body;
  if (!email || !fingerprint) {
    return res.status(400).send("Email och fingerprint krävs");
  }

  try {
    const visit = await Visit.findOne({ fingerprint });
    const user = new User({
      email,
      influencer: visit?.influencer || "okänd",
      source: visit?.source || "okänd",
    });
    await user.save();
    console.log("Användare registrerad", user);
    res.json(user);
  } catch (error) {
    console.error("Kunde ej registrera användare", error);
    res.status(500).send("Serverfel");
  }
});

module.exports = router;
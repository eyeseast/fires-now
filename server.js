#!/usr/bin/env node
/*
Serve a page with fire data loaded
*/

const express = require("express");
const fetch = require("node-fetch");
const togeojson = require("@tmcw/togeojson");
const { DOMParser } = require("xmldom");

const app = express();

const { PORT } = process.env;
const ACTIVE_FIRES =
  "https://rmgsc.cr.usgs.gov/outgoing/GeoMAC/ActiveFirePerimeters.kml";

app.use(express.static("./public"));

app.get("/fires.json", async (req, res) => {
  const fires = await getFires()
  res.json(fires);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

async function getFires() {
  const kml = await fetch(ACTIVE_FIRES)
    .then(r => r.text())
    .then(text => new DOMParser().parseFromString(text));

  return togeojson.kml(kml);
}

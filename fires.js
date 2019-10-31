#!/usr/bin/env node

const fetch = require("node-fetch");
const togeojson = require("@tmcw/togeojson");
const { DOMParser } = require("xmldom");

const ACTIVE_FIRES =
  "https://rmgsc.cr.usgs.gov/outgoing/GeoMAC/ActiveFirePerimeters.kml";

async function getFires() {
  const kml = await fetch(ACTIVE_FIRES)
    .then(r => r.text())
    .then(text => new DOMParser().parseFromString(text));

  return togeojson.kml(kml);
}

if (module === require.main) {
  getFires()
    .then(JSON.stringify)
    .then(console.log);
}

module.exports = getFires;
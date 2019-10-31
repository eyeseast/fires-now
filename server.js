#!/usr/bin/env node
/*
Serve a page with fire data loaded
*/

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const ACTIVE_FIRES =
  "https://rmgsc.cr.usgs.gov/outgoing/GeoMAC/ActiveFirePerimeters.kml";

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

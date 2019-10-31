import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const KEY = {};

// return a copy of feature collection with features filtered
function filter(fc, callback) {
  return {
    ...fc,
    features: fc.features.filter(callback)
  };
}

export { mapboxgl, KEY, filter };

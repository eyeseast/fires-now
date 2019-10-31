<script>
  import { onMount, getContext, afterUpdate } from "svelte";
  import { mapboxgl, KEY } from "./mapbox.js";
  import Icon from "./Icon.svelte";

  export let feature;

  let container;
  let marker;

  const { getMap } = getContext(KEY);
  const map = getMap();

  onMount(() => {
    if (feature) {
      marker = new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }

    return () => marker && marker.remove();
  });

  afterUpdate(() => {
    marker.setLngLat(feature.geometry.coordinates);
  });

  export function get() {
    return marker;
  }
</script>

<style>

</style>

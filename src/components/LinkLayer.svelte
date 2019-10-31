<script>
  import { onMount, afterUpdate, getContext } from "svelte";
  import { mapboxgl, KEY, filter } from "./mapbox.js";

  export let links;
  export let link_type;
  export let cpa_icon;
  export let label;
  export let visible = true;

  const { getMap } = getContext(KEY);
  const map = getMap();

  const colors = {
    jal: "#ff0000",
    youngmei: "#009BFF"
  };

  $: id = `links-${cpa_icon}-${link_type}`;

  $: data = filter(
    links,
    f =>
      f.properties.link_type === link_type && f.properties.cpa_icon === cpa_icon
  );

  onMount(() => {
    let paint = {
      "line-color": colors[cpa_icon],
      "line-width": 1,
      "line-opacity": 0.5
    };

    if (link_type === "indirect") {
      paint["line-dasharray"] = [2, 3];
    }

    map.on("load", () => {
      map.addLayer({
        id,
        type: "line",
        source: {
          type: "geojson",
          data
        },

        layout: {
          "line-join": "round",
          "line-cap": "round"
        },

        paint
      });
    });

    return () => {
      map.removeLayer(id);
    };
  });

  afterUpdate(() => {
    // https://github.com/mapbox/mapbox-gl-js/issues/6707
    if (map.loaded()) {
      map.setPaintProperty(id, "line-opacity", visible ? 0.5 : 0);
    } else if (map._loaded) {
      map.setPaintProperty(id, "line-opacity", visible ? 0.5 : 0);
    } else {
      map.on("load", () => {
        // this doesn't always run
        map.setPaintProperty(id, "line-opacity", visible ? 0.5 : 0);
      });
    }
  });
</script>

<svelte:options accessors={true} />

<script>
  import {
    beforeUpdate,
    createEventDispatcher,
    onMount,
    setContext
  } from "svelte";
  import { mapboxgl, KEY } from "./mapbox.js";

  export let style = "mapbox://styles/mapbox/light-v10";
  export let options = {};

  const dispatch = createEventDispatcher();
  const proxyEvents = ["dragstart", "dragend"];

  let map;
  let container;

  export function flyToFeature(feature, opts) {
    if (!map) return;

    map.flyTo({
      center: feature.geometry.coordinates,
      zoom: options.maxZoom || 12,
      ...opts
    });
  }

  export function fitBounds(bounds, opts) {
    if (!map) return;
    map.fitBounds(bounds, opts);
  }

  setContext(KEY, {
    getMap: () => map
  });

  onMount(() => {
    map = new mapboxgl.Map({ ...options, container, style });
    map.addControl(new mapboxgl.NavigationControl());

    if (process.env.NODE_ENV === "development") {
      window.map = map;
    }

    // forward events
    proxyEvents.forEach(event => {
      map.on(event, e => {
        dispatch(event, e);
      });
    });

    // fix for map randomly thinking it's smaller than it is
    requestAnimationFrame(() => map.resize());

    return () => map.remove();
  });
</script>

<style>
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>

<div bind:this={container} class="map">
  {#if map}
    <slot />
  {/if}
</div>

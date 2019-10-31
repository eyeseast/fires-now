<script>
  import { getContext, onMount } from "svelte";
  import { KEY } from "./mapbox.js";
  import Icon from "./Icon.svelte";

  const { getMap } = getContext(KEY);
  const map = getMap();

  let container;
  let show = true;

  export let position = "top-left";

  const control = {
    onAdd() {
      show = true;
      return container;
    },
    onRemove() {
      show = false;
    },

    getDefaultPosition: () => position
  };

  onMount(() => {
    map.addControl(control);

    return () => map.removeControl(control);
  });
</script>

<style>
  .legend {
    padding: 1em;
  }
</style>

{#if show}
  <div class="legend mapboxgl-ctrl mapboxgl-ctrl-group" bind:this={container}>
    <slot />
  </div>
{/if}

<script>
  export let raided = false;
  export let link_type;
  export let cpa_icon;

  const radius = 5;
  const padding = 3;
  const size = radius * 2 + padding;
  const center = size / 2;
  const opacity = 0.5;
</script>

<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  width="{size}px"
  height="{size}px"
  viewBox="0 0 {size}
  {size}"
  enable-background="new 0 0 {size}
  {size}"
  xml:space="preserve">

  <defs>
    <linearGradient id="halves">
      <stop offset="50%" stop-color="#009BFF" />
      <stop offset="50%" stop-color="#ff0000" />
    </linearGradient>
  </defs>

  {#if cpa_icon === 'both'}
    <g>
      <circle
        fill="url('#halves')"
        fill-opacity={opacity}
        cx={center}
        cy={center}
        r={radius - 0.5} />
    </g>
  {:else if cpa_icon === 'jal'}
    <g>
      <circle
        fill="#ff0000"
        fill-opacity={opacity}
        cx={center}
        cy={center}
        r={radius - 0.5} />
    </g>
  {:else if cpa_icon === 'youngmei'}
    <g>
      <circle
        fill="#009BFF"
        fill-opacity={opacity}
        cx={center}
        cy={center}
        r={radius - 0.5} />
    </g>
  {/if}

  {#if raided}
    <g>
      <circle
        fill="none"
        stroke="#404040"
        stroke-width="1.5"
        cx={center}
        cy={center}
        r={radius + 1} />
    </g>
  {/if}
</svg>

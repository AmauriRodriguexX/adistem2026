<script lang="ts">
  import { onMount } from 'svelte'
  import { injectLiquidGlassFilters } from '$lib/injectFilters'

  let container: HTMLDivElement

  onMount(() => {
    injectLiquidGlassFilters(container)
  })
</script>

<div bind:this={container}></div>

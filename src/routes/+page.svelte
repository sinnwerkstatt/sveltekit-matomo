<script lang="ts">
  import Matomo from "$lib/Matomo.svelte"
  import { tracker } from "$lib"
</script>

Matomo test

<Matomo />

{#if $tracker}
  <button on:click={() => $tracker.trackEvent()}>track me</button>
{/if}

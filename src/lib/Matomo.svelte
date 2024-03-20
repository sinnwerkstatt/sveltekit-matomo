<script lang="ts">
  import { onMount } from "svelte"
  import { env } from "$env/dynamic/public"
  import { afterNavigate } from "$app/navigation"
  import { page } from "$app/stores"
  import { tracker } from "$lib/tracker.js"

  export let url: string = env.PUBLIC_MATOMO_URL
  export let siteId: number = +env.PUBLIC_MATOMO_SITE_ID
  export let disableCookies = false
  export let requireConsent = false
  export let doNotTrack = false
  export let heartBeat: number | null = 15

  export let linkTracking: boolean | null = null

  async function initializeMatomo() {
    const matomo = window.Matomo
    if (!matomo) return

    const track = matomo.getTracker(`${url}/matomo.php`, siteId)
    if (!track) return

    if (disableCookies) track.disableCookies()
    if (requireConsent) track.requireConsent()
    if (doNotTrack) track.setDoNotTrack(true)
    if (heartBeat) track.enableHeartBeatTimer(heartBeat)
    if (linkTracking !== null) track.enableLinkTracking(linkTracking)

    tracker.set(track)

    track.setCustomDimension(1, $page.data.user ? "true" : "false")
    track.setCustomUrl($page.url.href)
    track.trackPageView()
  }

  onMount(async () => {
    setTimeout(initializeMatomo, 100)
  })

  afterNavigate(async ({ to }) => {
    if (!$tracker) {
      await initializeMatomo()
      return
    }

    if (to?.url.href && $tracker) {
      $tracker.setCustomDimension(1, $page.data.user ? "true" : "false")
      $tracker.setCustomUrl(to.url.href)
      $tracker.trackPageView()
    }
  })
</script>

<svelte:head>
  {#if url}
    <script async defer src={`${url}/matomo.js`}></script>
  {/if}
</svelte:head>

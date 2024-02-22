# how to use

1. include `<Matomo />` in your `+layout.svelte`.
2. configure it like so:
   ```sveltehtml
   <Matomo url="https://matomo.mysite.com" siteId={13} />
   ```
   or by defining environment variables:
   ```python
   PUBLIC_MATOMO_URL="https://matomo.mysite.com"
   PUBLIC_MATOMO_SITE_ID=13
   ```
   see https://kit.svelte.dev/docs/modules#$env-dynamic-public for more information.
3. optional: track custom events like so:
   ```sveltehtml
   <script lang="ts">
    import { tracker } from "@sinnwerkstatt/sveltekit-matomo"
    function onSomeEvent() {
      if ($tracker) $tracker.trackEvent("my-cateogry", "my-action", "my-name")
    }
   </script>
   ```

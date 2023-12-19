# how to use

1. include `<Matomo />` in your `+layout.svelte`.
2. configure it like so:
   ```sveltehtml
   <Matomo url="https://matomo.mysite.com" siteId={13} />
   ```
   or by defining .env variables:
   ```python
   PUBLIC_MATOMO_URL="https://matomo.mysite.com"
   PUBLIC_MATOMO_SITE_ID=13
   ```
3. use the tracker like so:
   ```sveltehtml
   <script lang="ts">
    import { tracker } from "@sinnwerkstatt/sveltekit-matomo"
    function onSomeEvent() {
      if ($tracker) $tracker.trackEvent("my-cateogry", "my-action", "my-name")
    }
   </script>
   ```

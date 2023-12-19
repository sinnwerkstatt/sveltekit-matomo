import { writable } from "svelte/store"

// https://developer.matomo.org/api-reference/tracking-javascript
export interface Tracker {
  // Using the Tracker Object
  trackPageView: (customTitle?: string) => void // Log a page view
  trackEvent: (category: string, action: string, name?: string, value?: number) => void // Log an event with an event category (Videos, Music, Games...), an event action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional event name and optional numeric value.
  trackSiteSearch: (keyword: string, category?: string, resultsCount?: number) => void // Log an internal site search for a specific keyword, in an optional category, specifying the optional count of search results in the page.
  enableHeartBeatTimer: (activeTimeInSeconds?: number) => void // Install a Heart beat timer that will send additional requests to Matomo in order to better measure the time spent in the visit.
  // Configuration of the Tracker Object
  setCustomUrl: (url: string) => void // Override the page's reported URL
  setDoNotTrack: (bool: boolean) => void // Set to true to not track users who opt out of tracking using Mozilla's (proposed) Do Not Track setting.
  setCustomDimension: (dimensionID: number, value: string) => void // Set a custom dimension. (requires Custom Dimensions plugin)

  // Managing Consent
  requireConsent: () => void // By default the Matomo tracker assumes consent to tracking. To change this behavior so nothing is tracked until a user consents, you must call requireConsent.
  // Configuration of Tracking Cookies
  disableCookies: () => void // Disable all first party cookies. Existing Matomo cookies for this website will be deleted on the next page view. Cookies will be even disabled if the user has given cookie consent using the method
}

export const tracker = writable<Tracker>()

# @live-apps/discord

`@live-apps/discord` is a npm package that provides shared caching, rate limiting, and event de-duplication among multiple instances of an application that may be running on different containers or pods. These features are dependent on Redis. 

This package relies on `discord.js` npm package only for socket events and not for any other data fetching or communication. At its initial stage, this API may not cover all Discord endpoints, but it may do so in the future.

This npm package was developed specifically for the `kitty-chan-events` bot, which can be found at https://github.com/live-apps-in/kitty-chan-events.

# AirbnbCerealVF.woff2 goes here

The reference self-hosts Airbnb's variable font at exactly this path, and
`src/styles/global.css` declares an `@font-face` pointing at it:

    /assets/fonts/AirbnbCerealVF.woff2

The file is not committed — it is Airbnb's proprietary font and was not part
of the saved reference page. Until it is present, the stack in
`src/styles/tokens.css` falls through to DM Sans.

DM Sans is narrower than Cereal at the same size, so text wraps a little
later: a long review renders in 10 lines instead of the reference's 12. Every
other metric already matches. Dropping the real file into this folder is the
only change needed to close that difference — no code edits.

To fetch it, open this URL in a browser that can reach the reference:

    https://airbnb-clone-umber-two.vercel.app/assets/fonts/AirbnbCerealVF.woff2

then save it here as `AirbnbCerealVF.woff2`.

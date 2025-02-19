# Coordinates to Country API

This is a simple Node.js Express server to convert coordinates into ISO 3166 alpha-2 or alpha-3 country codes.

## Credits

- [country-iso](https://github.com/simonepri/country-iso)
- [country-iso-3-to-2](https://github.com/vtex/country-iso-3-to-2)

## Usage

There is only one endpoint:

```txt
GET /:latitude/:longitude
```

## Response structure

Responses are formatted as JSON.

### 200 response

```json
{
  "error": null,
  "iso2": "PL", // can be null
  "iso3": "POL",
}
```

### 429 response (>10 requests in 10s)

```json
{
  "error": "Rate limit exceeded",
  "iso2": null,
  "iso3": null,
}
```

## Copyright

SPDX-License-Identifier: AGPL-3.0-or-later

Coordinates to Country API

Copyright © 2025 Konrad Guzek

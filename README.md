# Coordinates to Country

This is a simple Node.js Express server to convert coordinates into ISO 3166 alpha-2 or alpha-3 country codes.

## Credits

- [country-iso](https://github.com/simonepri/country-iso)
- [country-iso-3-to-2](https://github.com/vtex/country-iso-3-to-2)

## Usage

There is only one endpoint:

```txt
GET /:latitude/:longitude
```

Response format:

```json
{
  "iso2": "PL", // can be null
  "iso3": "POL",
}
```

If the country was not found, it sets both fields to `null` and adds a message in a field called `error`.

## Copyright

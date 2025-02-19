/**
 * Searches for every country which contains the point (lat, lng).
 * @public
 * @param {number} lat  The latitude of the point.
 * @param {number} lng  The longitude of the point.
 * @returns {string[]}  Array of ISO 3166 alpha-3 country code for the geographic
 *  coordinates.
 */
export function get(lat: number, lng: number): string[];

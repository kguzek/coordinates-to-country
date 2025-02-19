/* SPDX-License-Identifier: AGPL-3.0-or-later */
/*         Coordinates to Country API         */
/*       Copyright © 2025 Konrad Guzek        */

import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { get as getIso3166Alpha3 } from "country-iso";
import { iso3To2 } from "./iso3-to-2";

const app = express();
const DEFAULT_RESPONSE = { error: null, iso2: null, iso3: null };

function send(
  req: Request,
  res: Response,
  status: number,
  data: { error: string } | { iso2: string | null } | { iso3: string }
) {
  const result = { ...DEFAULT_RESPONSE, ...data };
  const { error, ...rest } = result;
  console.log(
    `[${status}] ${req.method} ${req.url} ${
      error ? error : JSON.stringify(rest)
    }`
  );
  res.status(status).json(result);
}

app.use(express.json());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 10000,
    max: 10,
    handler: (req, res) =>
      send(req, res, 429, { error: "Rate limit exceeded" }),
  })
);

app.get("/:lat/:lng", (req, res) => {
  const latNum = parseFloat(req.params.lat);
  const lngNum = parseFloat(req.params.lng);
  if (isNaN(latNum) || isNaN(lngNum)) {
    send(req, res, 400, { error: "Invalid coordinates" });
    return;
  }
  const countries = getIso3166Alpha3(latNum, lngNum);
  if (countries.length === 0) {
    send(req, res, 404, { error: "No country found" });
    return;
  }
  const iso3 = countries[0];
  send(req, res, 200, { iso2: iso3To2(iso3), iso3 });
});
app.all("/:lat/:lng", (req, res) =>
  send(req, res, 405, { error: "Allowed methods: GET" })
);
app.all("*", (req, res) =>
  send(req, res, 404, { error: "Usage: GET /:lat/:lng" })
);

const PORT = process.env.NODE_PORT || 3000;

const MESSAGE_WIDTH_HALF = 35;
const log = (msg: string) =>
  console.log(msg.padStart(msg.length / 2 + MESSAGE_WIDTH_HALF));

app.listen(PORT, () => {
  log("Coordinates to Country API");
  log("Copyright © 2025 Konrad Guzek");
  log("https://github.com/kguzek/coordinates-to-country");
  console.log();
  log(`API is listening on port ${PORT}`);
});

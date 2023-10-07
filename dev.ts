#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

type Updations = { [key: string]: string };
export const updations: Updations = {};

dev(import.meta.url, "./main.ts", config);

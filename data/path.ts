import { dirname, fromFileUrl, join } from "std/path/mod.ts";

export const DATA_DIR = dirname(fromFileUrl(import.meta.url));

export const OBJECT_RECORDS_PATH = join(DATA_DIR, "object.records");

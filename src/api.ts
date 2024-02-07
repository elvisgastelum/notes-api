import { Hono } from "hono/mod.ts";
import { logger } from "hono/middleware.ts";
import { NotesRouter } from "@router/notes.ts";

export class NotesApi {
  private hono: Hono;
  private router: NotesRouter;

  constructor() {
    this.router = new NotesRouter();
    this.hono = new Hono();
  }

  getHandler = () => {
    this.hono.use("*", logger());

    this.hono.get("/notes", this.router.getNotes);
    this.hono.get("/notes/:uuid", this.router.getNoteById);
    this.hono.post("/notes/:uuid", this.router.create);

    return this.hono.fetch;
  };
}

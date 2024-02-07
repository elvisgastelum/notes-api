import { Context } from "hono/mod.ts";
import { INote } from "@repository/note.ts";
import { NotesController } from "@controller/notes.ts";
import { ObjectType } from "@data/object.ts";

export class NotesRouter {
  private notesController: NotesController;

  constructor() {
    this.notesController = new NotesController();
  }

  create = async (c: Context) => {
    const id = c.req.param("uuid");

    const input: INote = {
      ...await c.req.json<
        Omit<INote, "Id" | "CreatedAt" | "UpdatedAt" | "Type">
      >(),
      id,
      type: ObjectType.Note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const note = await this.notesController.createNote(input);

    return c.json(note);
  };

  getNotes = async (c: Context) => {
    const notes = await this.notesController.getNotes();

    return c.json(notes);
  };

  getNoteById = async (c: Context) => {
    const id = c.req.param("uuid");

    const note = await this.notesController.getNoteById(id);

    return c.json(note);
  };
}

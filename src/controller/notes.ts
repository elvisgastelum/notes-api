import { INote, NoteEntity } from "@repository/note.ts";

export class NotesController {
  private noteEntity: NoteEntity;

  constructor() {
    this.noteEntity = new NoteEntity();
  }

  createNote = async (
    note: INote,
  ) => {
    const createdNote = await this.noteEntity.create(note);

    return createdNote;
  };

  getNotes = async () => {
    const notes = await this.noteEntity.getNotes();

    return notes;
  };

  getNoteById = async (
    id: string,
  ) => {
    const note = await this.noteEntity.getNoteById(id);

    return note;
  };
}

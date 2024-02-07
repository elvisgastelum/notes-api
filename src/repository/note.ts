import {
  IObjectRecord,
  ObjectReader,
  ObjectType,
  ObjectWritter,
} from "@data/object.ts";

export interface INote {
  id: string;
  title: string;
  tags: string;
  type: ObjectType;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export class NoteEntity {
  private noteToRecord = (note: INote): IObjectRecord => {
    return {
      Id: note.id,
      Title: note.title,
      Tags: note.tags,
      Type: note.type,
      Content: note.content,
      CreatedAt: note.createdAt,
      UpdatedAt: note.updatedAt,
    };
  };

  private recordToNote = (record: IObjectRecord): INote => {
    return {
      id: record.Id,
      title: record.Title,
      tags: record.Tags,
      type: record.Type,
      content: record.Content,
      createdAt: record.CreatedAt,
      updatedAt: record.UpdatedAt,
    };
  };

  create = async (note: INote): Promise<INote | null> => {
    const objectWriter = new ObjectWritter();

    const record = await objectWriter.write(this.noteToRecord(note));
    const noteRecord = record ? this.recordToNote(record) : null;

    return noteRecord;
  };

  getNotes = async (): Promise<INote[]> => {
    const reader = new ObjectReader();
    const records = await reader.getRecordsByType(ObjectType.Note);

    const notes = records.map(this.recordToNote);

    return notes;
  };

  getNoteById = async (id: string): Promise<INote | null> => {
    const reader = new ObjectReader();
    const record = await reader.getRecord(id);
    const note = record ? this.recordToNote(record) : null;

    return note;
  };
}

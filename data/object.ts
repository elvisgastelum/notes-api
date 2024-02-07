import {
  IReader,
  IRecord,
  IValidator,
  IWritter,
  Reader,
  Types,
  Writter,
} from "@db/mod.ts";
import { OBJECT_RECORDS_PATH } from "@data/path.ts";

export const ObjectType = {
  Note: "Note",
} as const;

export type ObjectType = typeof ObjectType[keyof typeof ObjectType];

export interface IObjectRecord extends IRecord {
  Title: string;
  Tags: string;
  Type: ObjectType;
  Content: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export class ObjectReader extends Reader<IObjectRecord>
  implements IReader<IObjectRecord> {
  constructor() {
    super(OBJECT_RECORDS_PATH);
  }

  public async getRecordsByType(type: ObjectType) {
    const objects = await this.getRecordsBy({ Type: type });

    return objects;
  }
}

class ObjectValidator implements IValidator<IObjectRecord> {
  schema = {
    Id: Types.UUID,
    Title: Types.String,
    Tags: Types.String,
    Type: Types.String,
    Content: Types.String,
    CreatedAt: Types["Time.DateTime"],
    UpdatedAt: Types["Time.DateTime"],
  } as const;

  public validate(record: unknown): record is IObjectRecord {
    if (!record) return false;

    return true;
  }
}

export class ObjectWritter extends Writter<IObjectRecord>
  implements IWritter<IObjectRecord> {
  constructor() {
    super(
      OBJECT_RECORDS_PATH,
      new ObjectValidator(),
    );
  }
}

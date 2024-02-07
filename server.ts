import { NotesApi } from "@api";

const notesApi = new NotesApi();

Deno.serve(notesApi.getHandler());

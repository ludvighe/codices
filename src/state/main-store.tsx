import { createStore } from "solid-js/store";
import { CDocument, DataEntry } from "./types";

const INITIAL_FILE: CDocument = {
  name: "Title",
  path: "",
  saved: false,
  entries: [{ id: 1, type: "text", text: "" }],
};

export const [file, setFile] = createStore<CDocument>(INITIAL_FILE);

export const addTextEntry = () => {
  setFile("entries", (prev) => [
    ...prev,
    {
      id: Math.max(...prev.map((e) => e.id), 0) + 1,
      type: "text",
      text: "",
    },
  ]);
};

export const addCheckEntry = () => {
  setFile("entries", (prev) => [
    ...prev,
    {
      id: Math.max(...prev.map((e) => e.id), 0) + 1,
      type: "check",
      checks: [{ id: 0, title: "", checked: false }],
    },
  ]);
};

export const removeEntry = (entry: DataEntry) => {
  setFile("entries", (prev) => prev.filter((e) => e.id !== entry.id));
};

export const importFile = async (file: File) => {
  const data = JSON.parse(await file.text());
  setFile(data);
};

export const clearFile = () => {
  setFile({
    name: "Title",
    path: "",
    saved: false,
    entries: [{ id: 1, type: "text", text: "" }],
  });
};

export const saveFile = async () => {
  const data = new Blob([JSON.stringify(file)], {
    type: "text/json;charset=utf-8",
  });
  const blobUrl = URL.createObjectURL(data);

  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.target = "_blank";
  const parsedName = file.name.replaceAll(" ", "_").replaceAll(".note", "");
  anchor.download = `${parsedName}.note`;

  // Auto click on a element, trigger the file download
  anchor.click();

  // This is required
  URL.revokeObjectURL(blobUrl);
};

export type TextEntry = {
  id: number;
  type: "text";
  text: string;
};
export type CheckEntry = {
  id: number;
  type: "check";
  checks: { id: number; title: string; checked: boolean }[];
};

export type DataEntry = TextEntry | CheckEntry;

export type CDocument = {
  saved: boolean;
  name: string;
  path: string;
  entries: DataEntry[];
};

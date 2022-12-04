import { createEffect, createMemo, createSignal, For } from "solid-js";
import {
  addCheckEntry,
  addTextEntry,
  file,
  removeEntry,
  setFile,
} from "../../state/main-store";
import { DataEntryField } from "../common/entry";
import Header from "./Header";

import { AiOutlineAppstoreAdd } from "solid-icons/ai";
import { BsTextLeft } from "solid-icons/bs";
import { BsCheck2Square } from "solid-icons/bs";
import { AiOutlineCloseSquare } from "solid-icons/ai";

import "./index.scss";
import { IconButton } from "../common/buttons";
import { DataEntry } from "../../state/types";
import { colorscheme } from "../../state/colorscheme";

const MainPage = () => {
  const handleOnChange = (entry: DataEntry) => {
    setFile("entries", (prev) =>
      [...prev.filter((e) => e.id !== entry.id), entry].sort((a, b) =>
        a.id > b.id ? 1 : -1
      )
    );
  };

  const [selectedEntry, setSelectedEntry] = createSignal<number>(-1);
  const handleSelectEntry = (e: MouseEvent, entry: DataEntry) => {
    if (window.innerWidth > 650) e.preventDefault();
    setSelectedEntry(entry.id);
  };
  const handleRemoveEntry = (entry: DataEntry) => {
    removeEntry(entry);
  };

  return (
    <div
      class="main-page"
      onClick={() => setSelectedEntry(-1)}
      style={colorscheme()}
    >
      <Header />
      <input
        class="file-name-input"
        type="text"
        value={file.name.replaceAll(".note", "")}
        onInput={(e: any) => {
          let value: string = e.target.value;
          if (value.slice(-5) !== ".note") value += ".note";
          setFile("name", value);
        }}
      />
      <div class="entry-field-list">
        <For each={file.entries}>
          {(entry) => {
            const isSelected = createMemo(() => selectedEntry() === entry.id);
            return (
              <div
                class={"gesture-wrapper" + (isSelected() ? " selected" : "")}
                onContextMenu={(e) => handleSelectEntry(e, entry)}
              >
                <DataEntryField entry={entry} onChange={handleOnChange} />
                <button
                  class="delete-button"
                  style={{ display: isSelected() ? "initial" : "none" }}
                  onClick={() => handleRemoveEntry(entry)}
                >
                  DELETE
                </button>
              </div>
            );
          }}
        </For>
      </div>
      <AddSegmentComponent />
    </div>
  );
};

const AddSegmentComponent = () => {
  const iconSize = 40;
  const [open, setOpen] = createSignal(false);
  return (
    <div class="add-segment-component" onBlur={() => setOpen(false)}>
      <div class="add-segment-options" style={{ left: open() ? "0" : "-100%" }}>
        <IconButton
          icon={
            <BsTextLeft
              size={iconSize}
              color="white"
              onClick={() => {
                addTextEntry();
                setOpen(false);
              }}
            />
          }
        />
        <IconButton
          icon={
            <BsCheck2Square
              size={iconSize}
              color="white"
              onClick={() => {
                addCheckEntry();
                setOpen(false);
              }}
            />
          }
        />
      </div>
      <button class="add-segment-btn" onClick={() => setOpen(!open())}>
        {open() ? (
          <AiOutlineCloseSquare size={iconSize} color="white" />
        ) : (
          <AiOutlineAppstoreAdd size={iconSize} color="white" />
        )}
      </button>
    </div>
  );
};

export default MainPage;

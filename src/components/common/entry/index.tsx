import { createSignal, Index } from "solid-js";
import { CheckEntry, DataEntry, TextEntry } from "../../../state/types";

import { FaSolidCheck } from "solid-icons/fa";
import { IoAddCircleSharp } from "solid-icons/io";
import { AiOutlineDelete } from "solid-icons/ai";

import "./index.scss";
import { removeEntry } from "../../../state/main-store";

export const DataEntryField = ({
  entry,
  onChange,
}: {
  entry: DataEntry;
  onChange: (entry: DataEntry) => void;
}) => {
  switch (entry.type) {
    case "text":
      return <TextEntryField entry={entry as TextEntry} onChange={onChange} />;

    case "check":
      return (
        <CheckEntryField entry={entry as CheckEntry} onChange={onChange} />
      );

    default:
      return <div></div>;
  }
};

const TextEntryField = ({
  entry,
  onChange,
}: {
  entry: TextEntry;
  onChange: (entry: TextEntry) => void;
}) => {
  const [value, setValue] = createSignal(entry.text);
  return (
    <textarea
      class="ctextarea"
      value={value()}
      rows={value().split("\n").length}
      onFocusOut={(e: any) => onChange({ ...entry, text: value() })}
      onInput={(e: any) => setValue(e.target.value)}
    />
  );
};

const CheckEntryField = ({
  entry,
  onChange,
}: {
  entry: CheckEntry;
  onChange: (entry: CheckEntry) => void;
}) => {
  const handleAddCheck = () => {
    onChange({
      ...entry,
      checks: [
        ...entry.checks,
        {
          id: Math.max(...entry.checks.map((e) => e.id), 0) + 1,
          title: "",
          checked: false,
        },
      ],
    });
  };
  const handleUpdateTitle = (check: any, value: string) => {
    onChange({
      ...entry,
      checks: [
        ...entry.checks.filter((e) => e.id !== check.id),
        { ...check, title: value },
      ].sort((a, b) => (a.id > b.id ? 1 : -1)),
    });
  };
  const handleCheck = (check: any) => {
    onChange({
      ...entry,
      checks: [
        ...entry.checks.filter((e) => e.id !== check.id),
        { ...check, checked: !check.checked },
      ].sort((a, b) => (a.id > b.id ? 1 : -1)),
    });
  };
  const handleRemoveCheck = (check: any) => {
    const newChecks = entry.checks.filter((e) => e.id !== check.id);
    if (newChecks.length === 0) {
      removeEntry(entry);
    } else {
      onChange({
        ...entry,
        checks: newChecks,
      });
    }
  };

  return (
    <div class="check-entry-field">
      <Index each={entry.checks}>
        {(check) => {
          const [focus, setFocus] = createSignal(false);
          return (
            <div class="check">
              <label
                onClick={() => handleCheck(check())}
                style={{
                  "background-color": check().checked
                    ? "var(--clr-primary)"
                    : "initial",
                }}
              >
                {check().checked && <FaSolidCheck color="white" />}
              </label>
              <input
                type="text"
                value={check().title}
                onChange={(e: any) =>
                  handleUpdateTitle(check(), e.target.value)
                }
                onFocus={() => setFocus(true)}
                onFocusOut={() => setTimeout(() => setFocus(false), 200)}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                  }
                }}
              />
              {focus() && (
                <button
                  class="delete-check-button"
                  onClick={() => handleRemoveCheck(check())}
                >
                  <AiOutlineDelete size={20} color="var(--clr-error)" />
                </button>
              )}
            </div>
          );
        }}
      </Index>
      <button class="add-check-btn" onClick={() => handleAddCheck()}>
        <IoAddCircleSharp size={40} color="var(--clr-primary)" />
      </button>
    </div>
  );
};

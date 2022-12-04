import { IconButton } from "../../common/buttons";

import { toggleFullscreen } from "../../../services/fullscreen";
import {
  clearFile,
  file,
  importFile,
  saveFile as saveFile,
} from "../../../state/main-store";

import { VsSave } from "solid-icons/vs";
import { VsNewFile } from "solid-icons/vs";
import { RiMediaFullscreenFill } from "solid-icons/ri";
import { VsGoToFile } from "solid-icons/vs";

import "./index.scss";
import { colorscheme, setColorscheme } from "../../../state/colorscheme";
import { preview } from "vite";
import { createEffect, onMount } from "solid-js";

const Header = () => {
  let inputRef: HTMLInputElement | undefined;
  const handleNewFile = () => {
    if (inputRef) {
      inputRef.value = "";
    }
    clearFile();
  };

  onMount(() => {
    const data = window.localStorage.getItem("colorscheme");
    if (data) {
      console.log("mount", JSON.parse(data));
      setColorscheme(JSON.parse(data));
    }
  });

  createEffect(() => {
    const data = JSON.stringify(colorscheme());
    window.localStorage.setItem("colorscheme", data);
  });

  return (
    <header class="cheader">
      <div class="file-input">
        <input
          ref={inputRef}
          type="file"
          name="file"
          id="file"
          onInput={(e: any) => importFile(e.target.files[0])}
        />
        <label for="file">
          <IconButton icon={<VsGoToFile color="white" />} />
        </label>
      </div>
      <IconButton icon={<VsNewFile color="white" />} onClick={handleNewFile} />

      <div class="primary-clr-picker">
        <input
          type="color"
          value={colorscheme()["--clr-primary"]}
          onInput={(e: any) => {
            setColorscheme((prev) => ({
              ...prev,
              "--clr-primary": e.target.value,
            }));
          }}
        />
      </div>

      <IconButton icon={<VsSave color="white" />} onClick={() => saveFile()} />
      <IconButton
        icon={<RiMediaFullscreenFill color="white" />}
        onClick={() => toggleFullscreen()}
      />
    </header>
  );
};

export default Header;

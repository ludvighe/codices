import { JSX } from "solid-js";

import "./index.scss";

export const IconButton = ({
  icon,
  ...props
}: { icon: JSX.Element } & JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} class="icon-button">
      {icon}
    </button>
  );
};

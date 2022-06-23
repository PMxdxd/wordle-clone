import { ReactNode } from "react";
import { CharStatus } from "../../lib/statuses";
import classnames from "classnames";

type Props = {
  value: string;
  onClick: (value: string) => void;
  children?: ReactNode;
  status?: CharStatus;
};

export const Key = ({ children, value, onClick, status }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  const classes = classnames(
    "key-button",
    { "absent": status === "absent" },
    { "present": status === "present" },
    { "correct": status === "correct" }
  );

  return (
    <button className={classes} onClick={handleClick}>
      {children || value}
    </button>
  );
};

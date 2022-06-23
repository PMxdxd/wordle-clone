import classNames from "classnames";
import { CharStatus } from "../../lib/statuses";

type Props = {
    value?: string;
    status?: CharStatus;
};

export const Tile = ({ value,status }: Props) => {
  const classes = classNames(
    "tile",
    { "absent": status === "absent" },
    { "present": status === "present" },
    { "correct": status === "correct" }
  );
  return <div className={classes}>{value}</div>;
};

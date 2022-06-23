import classNames from "classnames";

type Props = {
    value?: string;
};

export const Tile = ({ value }: Props) => {
  const classes = classNames(
    "tile",
    // { absent: status === "absent" },
    // { present: status === "present" },
    // { correct: status === "correct" }
  );
  return <div className={classes}>{value}</div>;
};

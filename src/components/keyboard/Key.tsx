import { ReactNode } from "react";

type Props = {
  value: string;
  onClick: (value: string) => void;
  children?: ReactNode;
};

export const Key = ({ children, value, onClick }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button className="key-button" onClick={handleClick}>
      {children || value}
    </button>
  );
};

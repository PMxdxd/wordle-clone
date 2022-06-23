import { Key } from "./Key";

type Props = {
  onChar: (value: string) => void;
};

export const Keyboard = ({ onChar }: Props) => {
  const onClick = (value: string) => {
    onChar(value);
  };
  return (
    <div className="keyboard">
      <div className="row">
        {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
          <Key onClick={onClick} value={key} />
        ))}
      </div>
      <div className="row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key onClick={onClick} value={key} />
        ))}
      </div>
      <div className="row">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key onClick={onClick} value={key} />
        ))}
      </div>

      <div className="row">
        <Key onClick={onClick} value="ENTER">
          {"ENTER"}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key onClick={onClick} value={key} />
        ))}
        <Key onClick={onClick} value="DELETE">
          {"←"}
        </Key>
      </div>
      <div>
          
      </div>
    </div>
  );
};

import React, { useCallback } from "react";
import { CELL_COLOR } from "../../constants";

export const GameField = ({ fields, onButtonClick, selectedMode }) => {
  const buttonColor = useCallback((color) => {
    if (color === CELL_COLOR.BLUE) {
      return "btn-field-blue";
    }
    if (color === CELL_COLOR.GREEN) {
      return "btn-field-green";
    }
    if (color === CELL_COLOR.RED) {
      return "btn-field-red";
    }
    return "btn-field";
  }, []);

  const gridShape = {
    gridTemplateColumns: `repeat(${selectedMode}, 1fr)`,
    gridTemplateRows: `repeat(${selectedMode}, 1fr)`,
    display: "grid",
  };

  return (
    <div style={gridShape}>
      {fields.map((item, i) => (
        <div key={i}>
          <button
            className={buttonColor(item.isHiglight)}
            onClick={() => onButtonClick(item.ID)}
          ></button>
        </div>
      ))}
    </div>
  );
};

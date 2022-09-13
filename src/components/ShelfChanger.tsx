import React from "react";
import { Shelf, ShelfText } from "../types/consts";

interface Props {
  selectedShelf: Shelf;
  onShelfChange: (shelf: Shelf) => void;
}

const ShelfChanger: React.FC<Props> = ({ selectedShelf, onShelfChange }) => {
  const x: boolean = selectedShelf === Shelf.None;

  return (
    <div className="book-shelf-changer">
      <select
        value={selectedShelf ?? Shelf.None}
        onChange={(e) => {
          onShelfChange(e.target.value as Shelf);
        }}
      >
        <option disabled>Move to...</option>
        {Object.entries(ShelfText).map(([name, text]) => {
          return (
            <option key={name} value={name}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ShelfChanger;

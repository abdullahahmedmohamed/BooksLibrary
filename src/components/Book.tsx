import React from "react";
import { Shelf } from "../types/consts";
import IBook from "../types/IBook";
import ShelfChanger from "./ShelfChanger";

import { useBooksContext } from "../utils/BooksContext";
interface Props {
  book: IBook;
  onUpdateBookShelf: NonNullable<
    ReturnType<typeof useBooksContext>
  >["switchBookShelf"];
}
const Book: React.FC<Props> = ({ book, onUpdateBookShelf }) => {
  const backgroundImage = book.imageLinks?.thumbnail
    ? `url(${book.imageLinks.thumbnail})`
    : "";
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage,
          }}
        ></div>
        <ShelfChanger
          selectedShelf={book.shelf}
          onShelfChange={(shelf: Shelf) => onUpdateBookShelf(book, shelf)}
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
};

export default Book;

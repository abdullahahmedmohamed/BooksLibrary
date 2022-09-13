import React from "react";
import IBook from "../types/IBook";
import { useBooksContext } from "../utils/BooksContext";
import Book from "./Book";

type BookShelfProps = {
  title: string;
  books: IBook[];
};
const BookShelf: React.FC<BookShelfProps> = ({ title, books }) => {
  const { switchBookShelf: updateBookShelf } = useBooksContext()!;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((b) => (
            <li key={b.id}>
              <Book book={b} onUpdateBookShelf={updateBookShelf}></Book>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;

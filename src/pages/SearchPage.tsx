import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";
import IBook from "../types/IBook";
import { useBooksContext } from "../utils/BooksContext";
import { Shelf } from "../types/consts";

const SearchPage = () => {
  // const { data, isLoading } = useQuery(Queries.Books, getBooksData);

  const [books, setBooks] = useState<IBook[]>([]);
  const [query, setQuery] = useState("");
  const { bookById, switchBookShelf } = useBooksContext()!;
  useEffect(() => {
    if (query == "") {
      setBooks([]);
      return;
    }
    let isCanceled = false;
    BooksAPI.search(query, 20)
      .then((result) => {
        if (!isCanceled) {
          result.forEach(
            (b) => (b.shelf = bookById[b.id]?.shelf ?? Shelf.None)
          );
          setBooks(result);
        }
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });

    return () => {
      isCanceled = true;
    };
  }, [query]);

  function updateSelectedBookShelf(book: IBook, shelf: Shelf) {
    switchBookShelf(book, shelf);
    const newBooks = [...books];
    newBooks[books.indexOf(book)] = { ...book, shelf };
    setBooks(newBooks);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or ISBN"
            autoFocus
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((b) => (
            <li key={b.id}>
              <Book book={b} onUpdateBookShelf={updateSelectedBookShelf}></Book>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default React.memo(SearchPage);

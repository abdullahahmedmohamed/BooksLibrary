import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as BooksAPI from "../BooksAPI";
import { Shelf } from "../types/consts";
import IBook from "../types/IBook";

type BooksByShelf = Omit<Record<Shelf, IBook[]>, "None">;

const BooksContext = createContext<{
  isLoading: boolean;
  booksByShelf: BooksByShelf;
  bookById: Record<string, IBook>;
  switchBookShelf(book: IBook, shelf: Shelf): void;
} | null>(null);

export function useBooksContext() {
  return useContext(BooksContext);
}

export function BooksContextProvider({ children }: { children: ReactElement }) {
  // useState
  const [{ isLoading, books: data }, setResult] = useState<{
    isLoading: boolean;
    books: IBook[];
  }>({ isLoading: true, books: [] });

  useEffect(() => {
    let isCanceled = false;
    BooksAPI.getAll().then((data) => {
      if (!isCanceled) setResult({ isLoading: false, books: data });
    });

    return () => {
      isCanceled = true;
    };
  }, []);

  const switchBookShelf = useCallback(
    (book: IBook, shelf: Shelf) => {
      if (!data) return;
      const oldData = data;
      let newData = [...data];
      const itemIndex = newData.findIndex((b) => b.id === book.id);
      if (itemIndex > -1) newData[itemIndex] = { ...book, shelf };
      else {
        book.shelf = shelf;
        newData.push(book);
      }
      setResult({
        isLoading,
        books: newData,
      });
      BooksAPI.update(book, shelf).catch((err) => {
        alert("UnExpected Error Occurred: " + err);
        console.error(err);
        setResult({ isLoading: false, books: oldData });
      });
    },
    [data]
  );
  const [booksByShelf, bookById] = useMemo(
    () => [getBooksByShelf(data), getBookById(data)],
    [data]
  );
  return (
    <BooksContext.Provider
      value={{
        isLoading,
        booksByShelf,
        bookById,
        switchBookShelf,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function getBooksByShelf(books: IBook[]) {
  const booksByShelf = {} as BooksByShelf;

  books.reduce((obj, item) => {
    if (item.shelf !== Shelf.None) {
      obj[item.shelf]?.push(item) ?? (obj[item.shelf] = [item]);
    }

    return obj;
  }, booksByShelf);

  return booksByShelf;
}

function getBookById(books: IBook[]) {
  const bookById = {} as Record<string, IBook>;

  for (const book of books) {
    bookById[book.id] = book;
  }

  return bookById;
}

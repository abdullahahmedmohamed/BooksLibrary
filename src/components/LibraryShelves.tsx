import BookShelf from "./BookShelf";
import { ShelfList, ShelfText } from "../types/consts";
import Loading from "./Loading";
import { useBooksContext } from "../utils/BooksContext";

const LibraryShelves: React.FC = () => {
  const { booksByShelf, isLoading } = useBooksContext()!;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {ShelfList.map((name) => {
        return (
          <BookShelf
            key={name}
            books={booksByShelf![name]}
            title={ShelfText[name]}
          />
        );
      })}
    </div>
  );
};

export default LibraryShelves;

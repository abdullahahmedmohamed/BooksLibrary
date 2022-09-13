import { Link } from "react-router-dom";
import LibraryShelves from "../components/LibraryShelves";

const HomePage = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Books Library</h1>
      </div>
      <div className="list-books-content">
        <LibraryShelves />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
export default HomePage;

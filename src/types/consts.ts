export const enum Shelf {
  CurrentlyReading = "currentlyReading",
  WantToRead = "wantToRead",
  Read = "read",
  None = "none",
}

export const ShelfText: Record<Shelf, string> = {
  currentlyReading: "Currently Reading",
  none: "None",
  read: "Read",
  wantToRead: "Want to Read",
};

export const ShelfList = Object.keys(ShelfText).filter(
  (k) => k !== "none"
) as Array<Shelf>;

export const enum Queries {
  Books = "Books",
}

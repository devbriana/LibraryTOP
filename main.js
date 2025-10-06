const newBookButton = document.getElementById('new-book-button')

const myLibrary = [];

function Book (title, author, pages, read) {
    this.id = crypto.randomUUID();  // unique ID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`; 
    }
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook);
}


addBookToLibrary("Goosebumps: Welcome to Dead House", "R.L. Stine", 123, false);
addBookToLibrary("Junie B. Jones and the Stupid Smelly Bus", "Barbara Park", 96, true);
addBookToLibrary("Diary of a Wimpy Kid", "Jeff Kinney", 221, false);
addBookToLibrary("Captain Underpants and the Attack of the Talking Toilets", "Dav Pilkey", 144, true);
addBookToLibrary("Goosebumps: Welcome to Dead House", "R.L. Stine", 123, false);
addBookToLibrary("Junie B. Jones and the Stupid Smelly Bus", "Barbara Park", 96, true);
addBookToLibrary("Diary of a Wimpy Kid", "Jeff Kinney", 221, false);
addBookToLibrary("Captain Underpants and the Attack of the Talking Toilets", "Dav Pilkey", 144, true);

console.log(myLibrary);

function displayBooks() {
  const bookshelf = document.getElementById("bookshelf");
 
  myLibrary.forEach((book) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("book-card")

  cardDiv.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages Read:</strong> ${book.pages}</p>
    <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
  `

  bookshelf.appendChild(cardDiv);
  })
}

displayBooks();

// New book button functionality

newBookButton.addEventListener("click", displayForm())

function displayForm() {
  
}

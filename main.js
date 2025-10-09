const newBookButton = document.getElementById('new-book-button');
const bookDialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');

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


addBookToLibrary("Goosebumps: Welcome to Dead House", "R.L. Stine", 123, "In Progress");
addBookToLibrary("Junie B. Jones and the Stupid Smelly Bus", "Barbara Park", 96, "Completed");
addBookToLibrary("Diary of a Wimpy Kid", "Jeff Kinney", 221, "In Progress");
addBookToLibrary("Captain Underpants and the Attack of the Talking Toilets", "Dav Pilkey", 144, "Completed");
addBookToLibrary("Goosebumps: Welcome to Dead House", "R.L. Stine", 123, "In Progress");
addBookToLibrary("Junie B. Jones and the Stupid Smelly Bus", "Barbara Park", 96, "To Read");
addBookToLibrary("Diary of a Wimpy Kid", "Jeff Kinney", 221, "In Progress");
addBookToLibrary("Captain Underpants and the Attack of the Talking Toilets", "Dav Pilkey", 144, "To Read");

console.log(myLibrary);





function displayBooks() {
  const bookshelf = document.getElementById("bookshelf");
  // Refresh displayed books
  bookshelf.innerHTML = ""; // clear old cards

  // sorting books based on read status 
  const statusOrder = {
    "Completed": 1,
    "In Progress": 2,
    "To Read": 3
  };

  const sortedLibrary = myLibrary.slice().sort((a, b) => {
    return statusOrder[a.read] - statusOrder[b.read];
  });
 
  // FOR EACH BOOK
  sortedLibrary.forEach((book) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("book-card")

       // Sorting background color based on read status
       if (book.read === "Completed") {
        cardDiv.style.backgroundColor = "#1e5d2f";
      } else if (book.read === "In Progress") {
        cardDiv.style.backgroundColor = "#b17e07"; 
      } else if (book.read === "To Read") {
        cardDiv.style.backgroundColor = "#8b0000";
      }
  
  // card content
    cardDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages Read:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read}</p>

      <div class="card-actions">
        <button class="edit" aria-label="Edit Book"><img src="icons/edit.svg" alt="Edit Book"></button>
        <button class="trash" aria-label="Delete Book"><img src="icons/trash.svg" alt="Delete Book"></button>
      </div>

  `
    // add card to bookshelf
    bookshelf.appendChild(cardDiv);

     // Delete listener
    cardDiv.querySelector(".trash").addEventListener("click", () => {
      const index = myLibrary.findIndex(item => item.id === book.id);
      myLibrary.splice(index, 1);
      document.getElementById("bookshelf").innerHTML = "";
      displayBooks();
    });







    // Edit listener
    cardDiv.querySelector(".edit").addEventListener("click", () => {
      // Prefill the form with the current book data
      document.getElementById("title").value = book.title;
      document.getElementById("author").value = book.author;
      document.getElementById("pages").value = book.pages;
      document.querySelector(`input[value="${book.read.toLowerCase().replace(' ', '-')}"]`).checked = true;

      // Show the dialog
      bookDialog.showModal();


      // Temporarily disable the default "add" submit listener
      bookForm.removeEventListener("submit", addSubmitHandler);

      // Temporary submit handler to update this book
      const editSubmitHandler = (event) => {
        event.preventDefault();

        // Update the book object directly
        book.title = document.getElementById("title").value.trim();
        book.author = document.getElementById("author").value.trim();
        book.pages = document.getElementById("pages").value.trim();
        const readVal = document.querySelector('input[name="readStatus"]:checked').value;
        book.read = readVal === "completed" ? "Completed" : readVal === "in-progress" ? "In Progress" : "To Read";

        // Refresh display
        displayBooks();

        // Close dialog and reset form
        bookDialog.close();
        bookForm.reset();

        // Remove this temporary listener
        bookForm.removeEventListener("submit", editSubmitHandler);
        // Add back original listener
        bookForm.addEventListener("submit", addSubmitHandler);

      };

      // Attach temporary listener
      bookForm.addEventListener("submit", editSubmitHandler);
    });
  });
}

displayBooks();






// New book button functionality

newBookButton.addEventListener("click", () => {
  bookDialog.showModal();
})

// submit form functionality 

function addSubmitHandler(event) {
  event.preventDefault(); // stops dialog from submitting to a server

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.querySelector('input[name="readStatus"]:checked').value;


  let readFormatted = "";
  if (read === "completed") readFormatted = "Completed";
  else if (read === "in-progress") readFormatted = "In Progress";
  else if (read === "to-read") readFormatted = "To Read";

  addBookToLibrary(title, author, pages, readFormatted);
  displayBooks();

  // Close dialog and reset form
  bookDialog.close();
  bookForm.reset();
  
}
bookForm.addEventListener("submit", addSubmitHandler);


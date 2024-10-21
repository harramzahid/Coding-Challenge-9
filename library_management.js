//Task 1: Create a Book Class
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = true; // By setting the default is true, it means that the book is available
    }

    // Now, to get the detailed information about the book we use the "Methd"
    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.ISBN}`;
    }

    // Now, we are going to use a getter to get the availability status
    get isAvailable() {
        return this._isAvailable;
    }

    // Now, we must update the availability status so we are using setters
    set isAvailable(status) {
        if (typeof status === "boolean") {
            this._isAvailable = status;
        } else {
            console.error("Invalid value. Availability should be true or false.");
        }
    }
}

//Task 2: Create a Section Class
class Section {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    // Now, we are using method to add a book to the section of books
    addBook(book) {
        this.books.push(book);
    }

    // then we are using the filter method to get the full number of available books filtered in the section
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    }

    // Now, we use map to list all books in the section by showing their titles and availabilies
    listBooks() {
        return this.books.map(book => {
            return `${book.title} - ${book.isAvailable ? 'Available' : 'Borrowed'}`;
        }).join('\n');
    }
}

//Task 3: Create a Patron Class
class Patron {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }

    // Now, we are going to show if it possible to borrow a book depending on its availability
    borrowBook(book) {
        if (book.isAvailable) {
            book.isAvailable = false;
            this.borrowedBooks.push(book);
            console.log(`${this.name} borrowed "${book.title}"`);
        } else {
            console.log(`"${book.title}" is not available.`);
        }
    }

    // Then we are creating a fucntion to return the borrowed book
    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.isAvailable = true;
            this.borrowedBooks.splice(index, 1);
            console.log(`${this.name} returned "${book.title}"`);
        } else {
            console.log(`${this.name} has not borrowed "${book.title}"`);
        }
    }
}

//Task 4: Create a VIPPatron Class that Inherits from Patron
// Here we are extending the class
class VIPPatron extends Patron {
    constructor(name) {
        super(name);
        this.priority = true; 
    }

    borrowBook(book) {
        if (this.priority && book.isAvailable) {
            super.borrowBook(book);
        } else {
            console.log(`No priority for "${book.title}".`);
        }
    }
}

//Task 5: Handle Books Borrowing and ReturningLinks to an external site
// here we are calculating how mamy books available for borrowing
Section.prototype.calculateTotalBooksAvailable = function() {
    return this.books.reduce((total, book) => total + (book.isAvailable ? 1 : 0), 0);
};

//Task 6 Create and Manage Sections and Patrons
/ Create two sections
const fictionSection = new Section('Fiction');
const scienceSection = new Section('Science');

// Create multiple books
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890');
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', '0987654321');
const book3 = new Book('A Brief History of Time', 'Stephen Hawking', '1122334455');
const book4 = new Book('The Selfish Gene', 'Richard Dawkins', '2233445566');

// Add books to sections
fictionSection.addBook(book1);
fictionSection.addBook(book2);
scienceSection.addBook(book3);
scienceSection.addBook(book4);

// Create multiple patrons, including a VIP patron
const patron1 = new Patron('John Doe');
const vipPatron = new VIPPatron('Jane Smith');

// Patrons borrowing books
patron1.borrowBook(book1); // John borrows "The Great Gatsby"
vipPatron.borrowBook(book2); // Jane (VIP) borrows "To Kill a Mockingbird"
vipPatron.borrowBook(book3); // Jane (VIP) borrows "A Brief History of Time"

// Returning books
patron1.returnBook(book1); // John returns "The Great Gatsby"

// List books in sections
console.log('Fiction Section Books:');
console.log(fictionSection.listBooks());
console.log('Science Section Books:');
console.log(scienceSection.listBooks());

// Calculate total available books in each section
console.log(`Total available books in Fiction: ${fictionSection.calculateTotalBooksAvailable()}`);
console.log(`Total available books in Science: ${scienceSection.calculateTotalBooksAvailable()}`);

// Commit: "Create and manage library sections and patrons"

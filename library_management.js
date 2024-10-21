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
"
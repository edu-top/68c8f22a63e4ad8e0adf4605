// Функция-конструктор Book
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.isAvailable = true; // по умолчанию книга доступна
  }
  
  // Метод getSummary в прототипе
  Book.prototype.getSummary = function() {
    return `«${this.title}» написана ${this.author} в ${this.year} году.`;
  };
  
  // Статическое свойство и метод
  Book.libraryName = "Городская библиотека";
  
  Book.changeLibraryName = function(newName) {
    this.libraryName = newName;
  };
  
  // Класс Library
  class Library {
    #books; // приватное поле для хранения книг
  
    constructor() {
      this.#books = [];
    }
  
    addBook(book) {
      if (book instanceof Book) {
        this.#books.push(book);
      } else {
        console.error("Можно добавлять только экземпляры Book");
      }
    }
  
    removeBook(title) {
      this.#books = this.#books.filter(book => book.title !== title);
    }
  
    findBooksByAuthor(author) {
      return this.#books.filter(book => book.author === author);
    }
  
    lendBook(title) {
      const book = this.#books.find(book => book.title === title);
      if (book && book.isAvailable) {
        book.isAvailable = false;
        return true; // успешно выдана
      }
      return false; // нет в наличии или отсутствует
    }
  
    returnBook(title) {
      const book = this.#books.find(book => book.title === title);
      if (book && !book.isAvailable) {
        book.isAvailable = true;
        return true;
      }
      return false;
    }
  
    getAvailableBooks() {
      return this.#books.filter(book => book.isAvailable);
    }
  }
  
  // Пример использования
  
  const book1 = new Book("Война и мир", "Лев Толстой", 1869);
  const book2 = new Book("Преступление и наказание", "Фёдор Достоевский", 1866);
  
  console.log(book1.getSummary()); // «Война и мир» написана Лев Толстой в 1869 году.
  console.log(book2.getSummary()); // «Преступление и наказание» написана Фёдор Достоевский в 1866 году.
  
  console.log(Book.libraryName); // Городская библиотека
  Book.changeLibraryName("Библиотека №1");
  console.log(Book.libraryName); // Библиотека №1
  
  const library = new Library();
  library.addBook(book1);
  library.addBook(book2);
  
  console.log(library.findBooksByAuthor("Лев Толстой")); // [book1]
  
  library.lendBook("Война и мир");
  console.log(library.getAvailableBooks()); // [book2]
  
  library.returnBook("Война и мир");
  console.log(library.getAvailableBooks()); // [book1, book2]
  
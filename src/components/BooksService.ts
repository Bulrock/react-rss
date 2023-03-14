import fetch from 'node-fetch';

export default class BooksService {
  apiUrl = 'https://api.itbook.store/1.0/';

  async getBooks(query: string) {
    const searchBooksRequest = this.apiUrl + 'search/' + query;
    const response = await fetch(searchBooksRequest);
    const data = await response.json();
    console.log(data.books);
    return data.books;
  }

  async getBook(query: string) {
    const searchIsbn13Book = this.apiUrl + 'books/' + query;
    const response = await fetch(searchIsbn13Book);
    const data = await response.json();
    return data;
  }
}

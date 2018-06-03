import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../model/book.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class BookService {

    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:8000/api/books';

    getBooks() {
        return this.http.get<Book[]>(this.baseUrl);
    }

    getBookById(id: number) {
        return this.http.get<Book>(this.baseUrl + '/' + id);
    }

    createBook(book:Book) {
        return this.http.post(this.baseUrl, book);
    }

    updateBook(book: Book) {
        return this.http.put(this.baseUrl + '/' + book.id, book);
    }

    deleteBook(id:number) {
        return this.http.delete(this.baseUrl + '/' + id);
    }

    getBooksByIds(ids: number[]) {
        return this.http.post(this.baseUrl + '/bookId',ids);
    }

    getBooksByDateCreated(from:string, to:string) {
        return this.http.get<Book[]>(this.baseUrl + '/dateCreated/from/' + from + '/to/' + to);
    }

    getAvailableBooks() {
        return this.http.get<Book[]>(this.baseUrl + '/availableBooks');
    }
}

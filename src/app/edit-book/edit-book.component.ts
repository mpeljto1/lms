import { Component, OnInit } from '@angular/core';
import { BookService } from "../service/book.service";
import { Router } from "@angular/router";
import { Book } from "../model/book.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book;
  editForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private bookService: BookService) { }

  ngOnInit() {
    let bookId = localStorage.getItem("editBookId");
    if (!bookId) {
      alert("Invalid action.")
      this.router.navigate(['admin-panel/list-book']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^(?:[A-ZŠĐČĆŽa-zšđčćž]+)(?:[A-ZŠĐČĆŽa-zšđčćž0-9 _]*)$')]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      publisher: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      edition: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      branch: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      createdAt: [],
      updatedAt: []
    });
    this.bookService.getBookById(+bookId)
    .subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.editForm.invalid) {
      return;
    }
    this.bookService.updateBook(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['admin-panel/list-book']);
        },
        error => {
          alert(error);
        });
  }

}

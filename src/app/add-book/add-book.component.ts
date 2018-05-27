import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../service/book.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      publisher: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      edition: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      branch: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zšđčćžA-ZŠĐČĆŽ ]+$')]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.invalid) {
      return;
    }
    this.bookService.createBook(this.addForm.value)
    .subscribe(data => {
      this.router.navigate(['list-book']);
    });
  }

}

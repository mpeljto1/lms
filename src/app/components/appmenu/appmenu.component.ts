import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TokenStorage } from '../../service/token.storage';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  searchForm: FormGroup;
  submitted: boolean = false;
  role : string;
  loggedUser: string;

  constructor(private formBuilder: FormBuilder, private token:TokenStorage, private dataService: DataService) {
    this.role = this.token.getRole();
   }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
    this.dataService.currentMessage.subscribe(message => this.loggedUser = message);
  }

}

import { Component, OnInit } from '@angular/core';
import { Globals } from '../../model/Globals';

@Component({
  selector: 'app-appcontent',
  templateUrl: './appcontent.component.html',
  styleUrls: ['./appcontent.component.css']
})
export class AppcontentComponent implements OnInit {

  constructor(private globals:Globals) { }

  ngOnInit() {
  }

}

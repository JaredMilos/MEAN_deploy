import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  name_input;
  constructor(private router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  }

  submitAuthor() {
    let observable = this._httpService.addAuthor(this.name_input);
    this.router.navigate(['home']);
  }
}

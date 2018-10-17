import { Component } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  updatedAuthor;
  title = 'Authors';
  home_flag = true;
  authors;
  constructor(private _httpService: HttpService){
  }
}

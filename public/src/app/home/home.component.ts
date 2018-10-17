import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors_array;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthorsFromService();
  }

  getAuthorsFromService(){
    let observable = this._httpService.getAuthors()
    observable.subscribe(data => {
      this.authors_array = data['authors'];
    })
  }

  deleteAuthor(_id) {
    this._httpService.deleteAuthor(_id);
    this.getAuthorsFromService();
  }
}

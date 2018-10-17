import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  sub: any;
  updatedAuthor;
  blank_flag = false;
  constructor(private router: Router, private route: ActivatedRoute, private _httpService: HttpService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getAuthorsByID()
  }
  getAuthorsByID() { 
    let observable = this._httpService.getAuthorsByID(this.id);
    observable.subscribe(data => {
      this.updatedAuthor = { name: data.author[0].name, _id: data.author[0]._id }
    })
  }
  updateAuthor() {
    if (this.updatedAuthor == '') {
      this.blank_flag = true;
    } else {
      this.blank_flag = false;
      this._httpService.updateAuthor(this.updatedAuthor);
      this.router.navigate(['home']);
    }
  };
}

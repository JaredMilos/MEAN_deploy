import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getAuthors(){
    return this._http.get('/authors')
  }
  getAuthorsByID(id){
    return this._http.get('/authors/'+id);
  }
  addAuthor(newAuthor){
    let tempObservable = this._http.post('/authors', {author_name: newAuthor});
    tempObservable.subscribe(data => 
      console.log(data)
    );
  }
  deleteAuthor(id) {
    let tempObservable = this._http.delete('/authors/'+id);
    tempObservable.subscribe(data => 
      console.log(data)
    )
  }
  updateAuthor(updatedAuthor) {
    let tempObservable = this._http.put('/authors/'+updatedAuthor._id, {updatedAuthor: updatedAuthor});
    tempObservable.subscribe(data => 
      {console.log(data);}
    );
  }
}


//You're basically done except for validations.  
//Check in with the homies in the morning on how they did their flash messages
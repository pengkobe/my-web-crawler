import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(public http: Http) {
  }


  /**
   * [toggleReadState 切换阅读状态]
   * @param  {[Object]} state [状态]
   */
  toggleReadState(from, state) {
    let creds = 'state=' + state + '&from=' + from;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://localhost:3001/updateReadState', creds, {
      headers: headers
    }).map(res => res.json());
  }

}
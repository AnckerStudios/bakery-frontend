import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonI } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
private url =  `${environment.apiUrl}/api/person`;
  persons:string[] = [];
  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<PersonI[]> {
    return this.http.get<PersonI[]>(this.url);
  }
  save(body: PersonI): Observable<PersonI> {
    return this.http.post<PersonI>(this.url, body);
  }
  update(body: PersonI): Observable<PersonI> {
    return this.http.put<PersonI>(this.url, body);
  }
  delete(data: PersonI): Observable<PersonI> {
    return this.http.delete<PersonI>(`${this.url}/${data.id}`);
  }
}

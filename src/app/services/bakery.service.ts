import { Injectable } from '@angular/core';
import { IBakery } from '../model/bakery';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SelectBakeryService } from './select-bakery.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BakeryService {
  private bakerysUrl = `${environment.apiUrl}/api/bakery`;
  bakerys : string[] = []
  constructor(private http: HttpClient,private sb:SelectBakeryService) { }

  saveBakery(newBakery: IBakery): Observable<IBakery> {
    return this.http.post<IBakery>(this.bakerysUrl, newBakery);
  }
  deleteBakery(bakery: IBakery): Observable<IBakery> {
    return this.http.delete<IBakery>(`${this.bakerysUrl}/${bakery.id}`);
  }

  getBakerys(): Observable<IBakery[]> {
    return this.http.get<IBakery[]>(this.bakerysUrl);
  }
}

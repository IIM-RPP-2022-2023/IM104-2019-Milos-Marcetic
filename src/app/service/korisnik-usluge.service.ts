import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { KorisnikUsluge } from "../model/korisnik-usluge.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class KorisnikUslugeService{

  private readonly API_URL = 'http://localhost:8082/korisnik_usluge/';

  dataChange: BehaviorSubject<KorisnikUsluge[]> = new BehaviorSubject<KorisnikUsluge[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllKorisnikUsluge(): Observable<KorisnikUsluge[]> {
    this.httpClient.get<KorisnikUsluge[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
}
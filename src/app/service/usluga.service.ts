import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Usluga } from "../model/usluga.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UslugaService{
    private readonly API_URL = 'http://localhost:8082/usluga/';

    dataChange: BehaviorSubject<Usluga[]> = new BehaviorSubject<Usluga[]>([]);
  
    constructor(private httpClient: HttpClient) {}
  
    public getAllUsluga(): Observable<Usluga[]> {
      this.httpClient.get<Usluga[]>(this.API_URL).subscribe(
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
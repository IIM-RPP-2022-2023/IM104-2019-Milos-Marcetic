import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Banka } from "../model/banka.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class BankaService{

  private readonly API_URL = 'http://localhost:8082/banka/';

  dataChange: BehaviorSubject<Banka[]> = new BehaviorSubject<Banka[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllBanka(): Observable<Banka[]> {
    this.httpClient.get<Banka[]>(this.API_URL).subscribe(
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
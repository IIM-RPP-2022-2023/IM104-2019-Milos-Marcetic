import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Filijala } from "../model/filijala.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class FilijalaService{

    private readonly API_URL = 'http://localhost:8082/filijala/';

  dataChange: BehaviorSubject<Filijala[]> = new BehaviorSubject<Filijala[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllFilijala(): Observable<Filijala[]> {
    this.httpClient.get<Filijala[]>(this.API_URL).subscribe(
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
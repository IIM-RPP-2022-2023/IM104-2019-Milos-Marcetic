
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

  public addFilijala(filijala: Filijala): void {
    this.httpClient.post(this.API_URL, filijala).subscribe();
  }

  public updateFilijala(filijala: Filijala): void {
    this.httpClient.put(this.API_URL + filijala.id, filijala).subscribe();
  }

  public deleteFilijala(filijala: Filijala): void {
    this.httpClient.delete(this.API_URL + filijala.id).subscribe();
  }
}
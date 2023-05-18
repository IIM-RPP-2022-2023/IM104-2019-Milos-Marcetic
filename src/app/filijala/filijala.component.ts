import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Filijala} from '../model/filijala.model'
import {FilijalaService} from '../service/filijala.service';

@Component({
  selector: 'app-filijala',
  templateUrl: './filijala.component.html',
  styleUrls: ['./filijala.component.css']
})
export class FilijalaComponent implements OnInit{
  displayedColumns = ['id', 'adresa', 'broj_pultova', 'poseduje_sef', 'banka', 'actions'];

  dataSource!: Observable<Filijala[]>;

  constructor(public filijalaService: FilijalaService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.filijalaService.getAllFilijala();
  }
}

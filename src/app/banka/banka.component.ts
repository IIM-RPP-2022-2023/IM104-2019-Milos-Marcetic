import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Banka} from '../model/banka.model';
import {BankaService} from '../service/banka.service';

@Component({
  selector: 'app-banka',
  templateUrl: './banka.component.html',
  styleUrls: ['./banka.component.css']
})
export class BankaComponent implements OnInit{
  displayedColumns = ['id', 'naziv', 'kontakt', 'pib', 'actions'];

  dataSource!: Observable<Banka[]>;

  constructor(public bankaService: BankaService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.bankaService.getAllBanka();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usluga } from '../model/usluga.model';
import { UslugaService } from '../service/usluga.service';

@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.css']
})
  export class UslugaComponent implements OnInit{
    displayedColumns = ['id', 'naziv', 'opis_usluge', 'datum_ugovora', 'provizija', 'filijala', 'korisnik', 'actions'];
  
    dataSource!: Observable<Usluga[]>;
  
    constructor(public uslugaService: UslugaService) { }
  
    ngOnInit(): void {
      this.loadData();
    }
  
    public loadData(){
      this.dataSource = this.uslugaService.getAllUsluga();
    }
  }


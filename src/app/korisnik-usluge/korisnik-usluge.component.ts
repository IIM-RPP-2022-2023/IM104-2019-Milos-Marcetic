import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KorisnikUsluge } from '../model/korisnik-usluge.model';
import { KorisnikUslugeService } from '../service/korisnik-usluge.service';

@Component({
  selector: 'app-korisnik-usluge',
  templateUrl: './korisnik-usluge.component.html',
  styleUrls: ['./korisnik-usluge.component.css']
})

export class KorisnikUslugeComponent implements OnInit{
  displayedColumns = ['id', 'ime', 'prezime', 'maticni_broj', 'actions'];

  dataSource!: Observable<KorisnikUsluge[]>;

  constructor(public korisnikUslugeService: KorisnikUslugeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.korisnikUslugeService.getAllKorisnikUsluge();
  }
}

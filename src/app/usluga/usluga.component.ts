import { Filijala } from './../model/filijala.model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usluga } from '../model/usluga.model';
import { UslugaService } from '../service/usluga.service';
import { MatDialog } from '@angular/material/dialog';
import { UslugaDialogComponent } from '../dialog/usluga-dialog/usluga-dialog.component';
import { DatePipe } from '@angular/common';
import { KorisnikUsluge } from '../model/korisnik-usluge.model';
@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.css']
})
  export class UslugaComponent implements OnInit{
    displayedColumns = ['id', 'naziv', 'opis_usluge', 'datum_ugovora', 'provizija', 'filijala', 'korisnik', 'actions'];
  
    today: Date = new Date();

    filijala!: Filijala;

    korisnik!: KorisnikUsluge;

    @Input()
    selektovaniKorisnik!: KorisnikUsluge;

    dataSource!: Observable<Usluga[]>;
  
    constructor(public uslugaService: UslugaService,
                public dialog:MatDialog) { }
  
    ngOnInit(): void {
      this.loadData();
    }

    ngOnChanges(): void {
      if(this.selektovaniKorisnik.id){
        this.loadData();
      }
    }
  
    public loadData(){
      //this.dataSource = this.uslugaService.getAllUsluga();
      this.dataSource=this.uslugaService.getUslugeZaKorisnika(this.selektovaniKorisnik.id)
    }

    public openDialog(flag: number, id: number, naziv: string, opis_usluge: string, datum_ugovora: Date, provizija:number, filijala: Filijala, korisnik: KorisnikUsluge) {

   
      const dialog = this.dialog.open(UslugaDialogComponent, {data: {id: id, naziv:naziv, opis_usluge:opis_usluge, datum_ugovora:datum_ugovora, provizija:provizija, filijala:filijala, korisnik:korisnik}});
  
      //dijalogu prosleđujemo flag obeležje
      dialog.componentInstance.flag = flag;
      dialog.afterClosed().subscribe(result => {
        if (result === 1) {
          this.loadData();
        }
      })
    }
    
  }


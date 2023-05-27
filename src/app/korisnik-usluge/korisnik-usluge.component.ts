import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KorisnikUsluge } from '../model/korisnik-usluge.model';
import { KorisnikUslugeService } from '../service/korisnik-usluge.service';
import { KorisnikUslugeDialogComponent } from '../dialog/korisnik-usluge-dialog/korisnik-usluge-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-korisnik-usluge',
  templateUrl: './korisnik-usluge.component.html',
  styleUrls: ['./korisnik-usluge.component.css']
})

export class KorisnikUslugeComponent implements OnInit{
  displayedColumns = ['id', 'ime', 'prezime', 'maticni_broj', 'actions'];

  dataSource!: Observable<KorisnikUsluge[]>;

  constructor(public korisnikUslugeService: KorisnikUslugeService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.korisnikUslugeService.getAllKorisnikUsluge();
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, maticni_broj: number) {

   
    const dialog = this.dialog.open(KorisnikUslugeDialogComponent, {data: {id: id, ime:ime, prezime:prezime, maticni_broj:maticni_broj}});

    //dijalogu prosleđujemo flag obeležje
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }
}

import { KorisnikUslugeService } from './../../service/korisnik-usluge.service';
import { FilijalaService } from './../../service/filijala.service';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilijalaDialogComponent } from '../filijala-dialog/filijala-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usluga } from 'src/app/model/usluga.model';
import { UslugaService } from 'src/app/service/usluga.service';
import { KorisnikUsluge } from 'src/app/model/korisnik-usluge.model';
import { Filijala } from 'src/app/model/filijala.model';

@Component({
  selector: 'app-usluga-dialog',
  templateUrl: './usluga-dialog.component.html',
  styleUrls: ['./usluga-dialog.component.css']
})
export class UslugaDialogComponent {
  public flag!: number;

  filijale!: Filijala[];
  korisnici!: KorisnikUsluge[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UslugaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Usluga,
    public uslugaService: UslugaService,
    public filijalaService: FilijalaService,
    public korisnikUslugeService: KorisnikUslugeService ) { }

  ngOnInit(): void {
    this.filijalaService.getAllFilijala().subscribe(filijale=>
     this.filijale=filijale);
     this.korisnikUslugeService.getAllKorisnikUsluge().subscribe(korisnici=>
      this.korisnici=korisnici);
  }

  public add(): void {
    this.uslugaService.addUsluga(this.data);
    this.snackBar.open('Uspešno dodata banka ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.uslugaService.updateUsluga(this.data);
    this.snackBar.open('Uspešno izmenjena banka ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.uslugaService.deleteUsluga(this.data);
    this.snackBar.open('Uspešno obrisana banka ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b:any){
    return a.id===b.id;
  }
}

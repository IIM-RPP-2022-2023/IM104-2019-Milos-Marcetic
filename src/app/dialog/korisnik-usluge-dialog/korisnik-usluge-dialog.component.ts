import { KorisnikUsluge } from './../../model/korisnik-usluge.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KorisnikUslugeService } from 'src/app/service/korisnik-usluge.service';
@Component({
  selector: 'app-korisnik-usluge-dialog',
  templateUrl: './korisnik-usluge-dialog.component.html',
  styleUrls: ['./korisnik-usluge-dialog.component.css']
})
export class KorisnikUslugeDialogComponent {
  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KorisnikUslugeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: KorisnikUsluge,
    public korisnikUslugeService: KorisnikUslugeService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.korisnikUslugeService.addKorisnikUsluge(this.data);
    this.snackBar.open('Uspešno dodat korisnik ' + this.data.ime, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.korisnikUslugeService.updateKorisnikUsluge(this.data);
    this.snackBar.open('Uspešno izmenjeni podaci o korisniku ' + this.data.ime, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.korisnikUslugeService.deleteKorisnikUsluge(this.data);
    this.snackBar.open('Uspešno obrisan korisnik ' + this.data.ime, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }
}

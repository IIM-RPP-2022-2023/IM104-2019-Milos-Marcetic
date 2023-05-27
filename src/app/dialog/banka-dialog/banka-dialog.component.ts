import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Banka } from 'src/app/model/banka.model';
import { BankaService } from 'src/app/service/banka.service';

@Component({
  selector: 'app-banka-dialog',
  templateUrl: './banka-dialog.component.html',
  styleUrls: ['./banka-dialog.component.css']
})
export class BankaDialogComponent {
  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BankaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Banka,
    public bankaService: BankaService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.bankaService.addBanka(this.data);
    this.snackBar.open('Uspešno dodata banka ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.bankaService.updateBanka(this.data);
    this.snackBar.open('Uspešno izmenjena banka ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.bankaService.deleteBanka(this.data);
    this.snackBar.open('Uspešno obrisana banka ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }
}

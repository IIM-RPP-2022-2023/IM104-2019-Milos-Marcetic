import { BankaService } from 'src/app/service/banka.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filijala } from 'src/app/model/filijala.model';
import { FilijalaService } from 'src/app/service/filijala.service';
import { Banka } from 'src/app/model/banka.model';

@Component({
  selector: 'app-filijala-dialog',
  templateUrl: './filijala-dialog.component.html',
  styleUrls: ['./filijala-dialog.component.css']
})
export class FilijalaDialogComponent {
  public flag!: number;

  banke!: Banka[];
  
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FilijalaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Filijala,
    public filijalaService: FilijalaService,
    public bankaService: BankaService ) { }

  ngOnInit(): void {
    this.bankaService.getAllBanka().subscribe(banke =>
      this.banke = banke)
  }

  public add(): void {
    this.filijalaService.addFilijala(this.data);
    this.snackBar.open('Uspešno dodata banka ' + this.data.adresa, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.filijalaService.updateFilijala(this.data);
    this.snackBar.open('Uspešno izmenjena banka ' + this.data.adresa, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.filijalaService.deleteFilijala(this.data);
    this.snackBar.open('Uspešno obrisana banka ' + this.data.adresa, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b:any){
    return a.id===b.id;
  }
}

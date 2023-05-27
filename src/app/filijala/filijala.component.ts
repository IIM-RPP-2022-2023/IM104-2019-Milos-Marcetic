import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Filijala} from '../model/filijala.model'
import {FilijalaService} from '../service/filijala.service';
import { MatDialog } from '@angular/material/dialog';
import { FilijalaDialogComponent } from '../dialog/filijala-dialog/filijala-dialog.component';
import { Banka } from '../model/banka.model';

@Component({
  selector: 'app-filijala',
  templateUrl: './filijala.component.html',
  styleUrls: ['./filijala.component.css']
})
export class FilijalaComponent implements OnInit{
  displayedColumns = ['id', 'adresa', 'broj_pultova', 'poseduje_sef', 'banka', 'actions'];

  dataSource!: Observable<Filijala[]>;

  banka!: Banka;

  constructor(public filijalaService: FilijalaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.filijalaService.getAllFilijala();
  }
  public openDialog(flag: number, id: number, adresa: string, broj_pultova: number, poseduje_sef: boolean, banka: Banka) {

   
    const dialog = this.dialog.open(FilijalaDialogComponent, {data: {id: id, adresa: adresa, broj_pultova: broj_pultova, poseduje_sef:poseduje_sef, banka:banka}});

    //dijalogu prosleđujemo flag obeležje
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }
}

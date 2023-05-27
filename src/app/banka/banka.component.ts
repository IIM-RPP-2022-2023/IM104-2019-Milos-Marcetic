import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Banka} from '../model/banka.model';
import {BankaService} from '../service/banka.service';
import { MatDialog } from '@angular/material/dialog';
import { BankaDialogComponent } from '../dialog/banka-dialog/banka-dialog.component';

@Component({
  selector: 'app-banka',
  templateUrl: './banka.component.html',
  styleUrls: ['./banka.component.css']
})
export class BankaComponent implements OnInit{
  displayedColumns = ['id', 'naziv', 'kontakt', 'pib', 'actions'];

  dataSource!: Observable<Banka[]>;

  constructor(public bankaService: BankaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.bankaService.getAllBanka();
  }

  public openDialog(flag: number, id: number, naziv: string, kontakt: string, pib: number) {

   
    const dialog = this.dialog.open(BankaDialogComponent, {data: {id: id, naziv: naziv, kontakt: kontakt, pib:pib}});

    //dijalogu prosleđujemo flag obeležje
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }
}

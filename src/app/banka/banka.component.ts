import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {Banka} from '../model/banka.model';
import {BankaService} from '../service/banka.service';
import { MatDialog } from '@angular/material/dialog';
import { BankaDialogComponent } from '../dialog/banka-dialog/banka-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-banka',
  templateUrl: './banka.component.html',
  styleUrls: ['./banka.component.css']
})
export class BankaComponent implements OnInit{
  displayedColumns = ['id', 'naziv', 'kontakt', 'pib', 'actions'];

  //dataSource!: Observable<Banka[]>;
  dataSource!: MatTableDataSource<Banka>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public bankaService: BankaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.bankaService.getAllBanka();
    this.bankaService.getAllBanka().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor=(data: any, property)=>{
        switch(property){
          case 'id' : return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
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

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {Filijala} from '../model/filijala.model'
import {FilijalaService} from '../service/filijala.service';
import { MatDialog } from '@angular/material/dialog';
import { FilijalaDialogComponent } from '../dialog/filijala-dialog/filijala-dialog.component';
import { Banka } from '../model/banka.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-filijala',
  templateUrl: './filijala.component.html',
  styleUrls: ['./filijala.component.css']
})
export class FilijalaComponent implements OnInit{
  displayedColumns = ['id', 'adresa', 'broj_pultova', 'poseduje_sef', 'banka', 'actions'];

  //dataSource!: Observable<Filijala[]>;
  dataSource!: MatTableDataSource<Filijala>;
  banka!: Banka;

  @ViewChild (MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!:MatSort;

  constructor(public filijalaService: FilijalaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.filijalaService.getAllFilijala();
    this.filijalaService.getAllFilijala().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'banka' ? currentTerm + data.banka.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'adresa': return data[property];
          case 'broj_pultova': return data[property];
          case 'banka': return data.banka.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }
}

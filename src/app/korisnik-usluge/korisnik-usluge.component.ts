import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { KorisnikUsluge } from '../model/korisnik-usluge.model';
import { KorisnikUslugeService } from '../service/korisnik-usluge.service';
import { KorisnikUslugeDialogComponent } from '../dialog/korisnik-usluge-dialog/korisnik-usluge-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-korisnik-usluge',
  templateUrl: './korisnik-usluge.component.html',
  styleUrls: ['./korisnik-usluge.component.css']
})

export class KorisnikUslugeComponent implements OnInit{
  displayedColumns = ['id', 'ime', 'prezime', 'maticni_broj', 'actions'];

  //dataSource!: Observable<KorisnikUsluge[]>;
  dataSource!: MatTableDataSource<KorisnikUsluge>;

  @ViewChild (MatSort)
  sort!:MatSort;

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  selektovaniKorisnik!: KorisnikUsluge;

  constructor(public korisnikUslugeService: KorisnikUslugeService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.korisnikUslugeService.getAllKorisnikUsluge();
    this.korisnikUslugeService.getAllKorisnikUsluge().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
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

  public selectedRow(row: KorisnikUsluge): void {
    this.selektovaniKorisnik=row;
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }
}

import { Filijala } from './../model/filijala.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Usluga } from '../model/usluga.model';
import { UslugaService } from '../service/usluga.service';
import { MatDialog } from '@angular/material/dialog';
import { UslugaDialogComponent } from '../dialog/usluga-dialog/usluga-dialog.component';
import { DatePipe } from '@angular/common';
import { KorisnikUsluge } from '../model/korisnik-usluge.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.css']
})
  export class UslugaComponent implements OnInit{
    displayedColumns = ['id', 'naziv', 'opis_usluge', 'datum_ugovora', 'provizija', 'filijala', 'korisnik', 'actions'];
  
    today: Date = new Date();

    filijala!: Filijala;

    korisnik!: KorisnikUsluge;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
  
    @ViewChild(MatSort)
    sort!: MatSort;

    @Input()
    selektovaniKorisnik!: KorisnikUsluge;

    //dataSource!: Observable<Usluga[]>;
    dataSource!: MatTableDataSource<Usluga>;

    constructor(public uslugaService: UslugaService,
                public dialog:MatDialog) { }
  
    ngOnInit(): void {
      this.loadData();
    }

    ngOnChanges(): void {
      if(this.selektovaniKorisnik.id){
        this.loadData();
      }
    }
  
    public loadData(){
      //this.dataSource = this.uslugaService.getAllUsluga();
      //this.dataSource=this.uslugaService.getUslugeZaKorisnika(this.selektovaniKorisnik.id)
      this.uslugaService.getUslugeZaKorisnika(this.selektovaniKorisnik.id).subscribe( data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: string, key: string) => {
            return key === 'filijala' ? currentTerm + data.filijala.adresa : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data:any, property) =>{
          switch(property){
            case 'id': return data[property];
            case 'naziv': return data[property];
            case 'opis_usluge': return data[property];
            case 'provizija': return data[property];
            case 'filijala': return data.filijala.adresa.toLocaleLowerCase();
            default: return data[property].toLocaleLowerCase();
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

    public openDialog(flag: number, id: number, naziv: string, opis_usluge: string, datum_ugovora: Date, provizija:number, filijala: Filijala, korisnik: KorisnikUsluge) {

   
      const dialog = this.dialog.open(UslugaDialogComponent, {data: {id: id, naziv:naziv, opis_usluge:opis_usluge, datum_ugovora:datum_ugovora, provizija:provizija, filijala:filijala, korisnik:korisnik}});
  
      
      dialog.componentInstance.flag = flag;
      dialog.afterClosed().subscribe(result => {
        if (result === 1) {
          this.loadData();
        }
      })
    }

    applyFilter(filterValue: string) {
      filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
    
  }


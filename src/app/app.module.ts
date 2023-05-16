import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BankaComponent } from './banka/banka.component';
import { FilijalaComponent } from './filijala/filijala.component';
import { KorisnikUslugeComponent } from './korisnik-usluge/korisnik-usluge.component';
import { UslugaComponent } from './usluga/usluga.component';
import {HomeComponent} from './core/home/home.component';
import {AuthorComponent} from './core/author/author.component';
import {AboutComponent} from './core/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { BankaService } from './service/banka.service';


const routes: Routes = [{path: '', redirectTo: 'home', pathMatch: 'full'},
                {path: 'banka', component: BankaComponent},
                {path: 'korisnikUsluge', component: KorisnikUslugeComponent},
                {path: 'filijala', component: FilijalaComponent},
                {path: 'usluga', component: UslugaComponent},
                {path: 'home', component: HomeComponent},
                {path: 'author', component: AuthorComponent},
                {path: 'about', component: AboutComponent}];
@NgModule({
  declarations: [
    AppComponent,
    BankaComponent,
    FilijalaComponent,
    KorisnikUslugeComponent,
    UslugaComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    BankaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BankaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

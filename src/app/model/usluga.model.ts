import { Filijala } from "./filijala.model";
import { KorisnikUsluge } from "./korisnik-usluge.model";

export class Usluga{
    id!:number;
    naziv!:string;
    opis_usluge!:string;
    datum_ugovora!:Date;
    provizija!:number;
    filijala!:Filijala;
    korisnik!:KorisnikUsluge;
}
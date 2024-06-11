import { Reservation } from "./reservation";

export class Terrain {
    constructor(public idTer:number,public largeur:number,public longeur:number,public type:string,public prix:number,
        public reservations:Reservation[],public dispo:boolean,public url:string

    ){}
}

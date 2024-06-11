import { Client } from "./client";
import { Terrain } from "./terrain";

export class Reservation {
    constructor(public idRes:number,public date_res:Date,public temps:string,public tarif:number,public nbjoueurs:number,
        public rate:number,public feedback:string,public eau:boolean,public done:boolean,
        public terrain:Terrain,public client:Client,public annule:boolean,public date_annulation:Date
     ){ }
}

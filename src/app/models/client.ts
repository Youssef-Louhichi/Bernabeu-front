import { Reservation } from "./reservation";

export class Client {

    constructor(
        public idCl:number,public nom:string,public prenom:string,public email:string,
        public tel:string,public date_naissance:Date,public mdp:string,
        public reservations:Reservation[]
    ){}
}

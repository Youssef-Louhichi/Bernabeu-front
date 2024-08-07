import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private fb: FormBuilder, private clientservice: ClientService,private dialog:MatDialog) { }

  AlertMdp1: boolean = false
  AlertMdp2: boolean = false
  client!: Client
  isLoading=true;


  clientForm: FormGroup = this.fb.group({
    idCl: [, Validators.required],
    nom: [, Validators.required],
    prenom: [, Validators.required],
    email: [, [Validators.required, Validators.email]],
    tel: [, Validators.required],
    date_naissance: [, Validators.required],
    mdp: [, Validators.required],
    reservations: this.fb.array([])
  });

  mdpForm: FormGroup = this.fb.group({
    nouveauMdp: [, Validators.required],
    confirmerMdp: [, Validators.required],
    ancienMdp: [, Validators.required]
  })





  ngOnInit(): void {
    this.initializeClient()
  }

  initializeClient(){
    this.clientservice.getClientById(Number(localStorage.getItem("idCl"))).subscribe(res => {
      this.isLoading=false;

      this.client = res
      this.clientForm.setValue({
        idCl: this.client.idCl,
        nom: this.client.nom,
        prenom: this.client.prenom,
        email: this.client.email,
        tel: this.client.tel,
        date_naissance: this.client.date_naissance,
        mdp: this.client.mdp,
        reservations: this.client.reservations || []
      });
    })
  }



  modifier() {
    this.clientservice.updateClient(Number(localStorage.getItem("idCl")), this.clientForm.value).subscribe(res => {

      if(res)
        {

        this.client = res


      this.dialog.open(AlertComponent, {
        data: {message:"Les informations modifiées avec succés",index:2},
        position: { top: '1%',left:'40%' },
        hasBackdrop: false
      })}
      else{
        this.dialog.open(AlertComponent, {
          data: {message:"Une erreur survient lors de la modification",index:1},
          position: { top: '1%',left:'40%' },
          hasBackdrop: false
        })
        
      }
    })
  }

  changerPwd() {

    let pwd1 = this.mdpForm.get("nouveauMdp")?.value;
    let pwd2 = this.mdpForm.get("confirmerMdp")?.value;
    let pwd3 = this.mdpForm.get("ancienMdp")?.value;


    if (pwd1 != pwd2)
      this.AlertMdp1 = true
    else if (pwd3 != this.client.mdp) {
      this.AlertMdp1 = false
      this.AlertMdp2 = true
    }
    else {
      this.AlertMdp1 = false
      this.AlertMdp2 = false
      this.clientservice.changePassword(Number(localStorage.getItem("idCl")), pwd1).subscribe(res => 
        {
        if(res){
          this.client = res

          this.dialog.open(AlertComponent, {
            data: {message:"Mot de passe changé avec succés",index:2},
            position: { top: '1%',left:'40%' },
            hasBackdrop: false
          })}
          else{
            this.dialog.open(AlertComponent, {
              data: {message:"Une erreur survient lors de la modification",index:1},
              position: { top: '1%',left:'40%' },
              hasBackdrop: false
            })
            
          }
        }
          
      )
      this.mdpForm.reset()
    }
  }

}

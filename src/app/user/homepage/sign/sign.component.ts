import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent  implements OnInit {
  constructor(private fb: FormBuilder,private route: Router,private clientservice:ClientService) { }

  clientForm!: FormGroup
  isLoading=false
  log!: FormGroup
  isSignIn: boolean = true
  AlertMdp:boolean=false



  ngOnInit(): void {
    this.initializeLoginForm()
    this.initializeClientForm()
  }

  initializeLoginForm(){
    this.log = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required]
       
    });
  }

  initializeClientForm(){
    this.clientForm = this.fb.group({
      idCl: [],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[259][0-9]{7}$')]],
      date_naissance: [, Validators.required],
      mdp: ['', [Validators.required , Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z]).*$')]],
      reservations: this.fb.array([])  
    });
  }


  


  isValidMail() {
    return this.clientForm.get("email")?.errors?.["email"] && this.clientForm.get("email")?.touched;
  }

  isValidNum() {
    return this.clientForm.get("tel")?.errors?.["pattern"] && this.clientForm.get("tel")?.touched;
  }

  isValidpwd2() {
    return this.clientForm.get("mdp")?.errors?.["pattern"] && this.clientForm.get("mdp")?.touched;
  }
  isValidpwd1() {
    return this.clientForm.get("mdp")?.errors?.["minlength"]  && this.clientForm.get("mdp")?.touched;
  }

  

  toggle(): void {
    this.isSignIn = !this.isSignIn;
  }

  login(){
    this.isLoading=true


    this.clientservice.login(this.log.get("login")?.value,this.log.get("pwd")?.value).subscribe(res =>{
      if (res){
        localStorage.setItem("idCl",res.idCl)
        localStorage.setItem("state","connectedUser")
        this.route.navigate(["/main"])
      }
      else{
        this.isLoading=false

      }


    })



  }

  signup(cpwd:string){
    this.isLoading=true;

    let pwd=this.clientForm.get("mdp")?.value;


    if(pwd!=cpwd )
      this.AlertMdp=true
    else{
    this.clientservice.addClient(this.clientForm.value).subscribe(
      res =>{
        if (res){
          localStorage.setItem("idCl",res.idCl)
          localStorage.setItem("state","connectedUser")
          this.route.navigate(["/main"])
        }
        else{
          this.isLoading=false
        }
      }
    )
  }
}
}



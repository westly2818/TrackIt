import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  auth:boolean=false
  user:any
  pw:any
  cred:any=[
    {'id':'test','pw':1234},
    {'id':'sanjay','pw':1234},
  ]

  constructor(private toastController: ToastController,private Routingdashboard:Router) {}
  async presentToast(data:any) {
    let toast
    if(data==true){
       toast = await this.toastController.create({
        message: 'Login Successhully!',
        duration: 2000,
        cssClass: 'custom-toast',
        buttons: [
          // {
          //   text: 'Dismiss',
          //   role: 'cancel'
          // }
        ],
      });
      await toast.present();

    }else{
      toast = await this.toastController.create({
        message: 'wrong credentials',
        duration: 2000,
        cssClass: 'custom-toast',
        buttons: [
          // {
          //   text: 'Dismiss',
          //   role: 'cancel'
          // }
        ],
      });
      await toast.present();

    }
    

   
  }

 password(){
    let filter=this.cred.filter((ele:any)=>{
      return ele.id==this.user && ele.pw==this.pw
    })

    if(filter.length>0){
    this.auth=true
    this.Routingdashboard.navigate(['dashboard'])
    this.presentToast(true)
    }
    else{
    this.auth=false
    this.presentToast(false)


    }
  }
  }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UtislService } from '../utisl.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  auth:boolean=true
  user:any
  pw:any
  cred:any=[
    {'id':'drsfarm','pw':1234},
    {'id':'wesy','pw':1234},
  ]
id:any;
pass:any;
  constructor(private toastController: ToastController,private Routingdashboard:Router,private home:UtislService) {}

  
  async ngOnInit() {

 const authToken = localStorage.getItem('authToken');
if (authToken) {
  // Perform automatic login using the stored authentication token
   this.Routingdashboard.navigate(['dashboard'])
}


  }
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
    let userSession=filter[0]

    if(filter.length>0){
   localStorage.setItem('authToken', 'abc123');
    this.Routingdashboard.navigate(['dashboard'])
    
    this.presentToast(true)
    }
    else{
    this.auth=false
    this.presentToast(false)


    }
    
  }
  }
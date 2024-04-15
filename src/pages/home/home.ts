import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogueServiceProvider } from '../../providers/input-dialogue-service/input-dialogue-service';
import {SocialSharing} from '@ionic-native/social-sharing';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "Grocery"


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogueService: InputDialogueServiceProvider, private socialSharing: SocialSharing) {

  }

  loadItems(){
    return this.dataService.getItems()
  }

  removeItem (item, i) {
    console.log("Removing item - ", item, i)
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + i, 
      duration: 3000,
    });
    toast.present();
    this.dataService.removeItem(i);
  }


  shareItem (item, i) {
    console.log("Sharing Item  - ", item, i)
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + i, 
      duration: 3000,
    });
    toast.present();
    let message = "Grocery Item - Name: " + item.name + " Qty: " + item.quantity;
    let subject = "Shared via Groceries App";
    this.socialSharing.share(message, subject).then(() => {
      console.log("Sharing Item: " + item.name);

    }).catch(() => {
      // Sharing via email is not possible
      console.log("Not sure");
  });
    }
    
    
  
  editItem (item, i) {
    console.log("Edit item - ", item, i)
    const toast = this.toastCtrl.create({
      message: 'Editting Item - ' + i, 
      duration: 3000,
    });
    toast.present();
    this.inputDialogueService.showPrompt(item, i);
  }

  addItem() {
    console.log("Adding item item ");
    this.inputDialogueService.showPrompt();
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  note = {id:null, title: null, description:null};
  id = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public notesService: NotesService,
              public toastCtrl: ToastController) {
    this.id = navParams.get('id');
    if(this.id != 0){
      // this.note = notesService.getNote(this.id);
      notesService.getNote(this.id)
      .subscribe(note => {
        this.note = note;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  addNote(){
    if (this.id != 0) {
      this.notesService.editNote(this.note);
      this.presentToast("Nota editada");
    }else{
      this.note.id = Date.now();
      this.notesService.createNote(this.note);
      this.presentToast("Nota creada con éxito!");
    }
    this.navCtrl.pop();
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    this.presentToast("Nota eliminada!");
    this.navCtrl.pop();
  }

  presentToast(text) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}

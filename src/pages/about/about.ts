import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  notes = [];
    @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, public notesService: NotesService) {
    notesService.getNotes()
    .subscribe( notas => {
      this.notes = notas;
    });

    //this.notes = notesService.getNotes();    
  }

  public goToDetail(id){
    this.navCtrl.push(DetailPage, {id:id});
  }

  public createNote(){
    this.navCtrl.push(DetailPage, {id:0});
  }

}

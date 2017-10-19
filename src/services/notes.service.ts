import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database/database";
import * as firebase from 'firebase/app';

@Injectable()
export class NotesService{
    constructor (public afDB: AngularFireDatabase){};
    notes = [];    
    // notes = [
    //     {id:1, title: 'Nota 1', description: 'Descripcion de nota 1'},
    //     {id:2, title: 'Nota 2', description: 'Descripcion de nota 2'},
    //     {id:3, title: 'Nota 3', description: 'Descripcion de nota 3'},
    // ];
    public getNotes(){
        // return this.notes;
        return this.afDB.list('notas/').valueChanges();
    }
    public getNote(id){
        // return this.notes.filter(function(e, i){return e.id == id})[0] || {id:null, title: null, description:null};
        return this.afDB.object('notas/'+ id).snapshotChanges()
            .map(action => {
                const $key = action.payload.key;
                const data = { $key, ...action.payload.val() };
                return data;
            });
    }
    public createNote(note){
        this.afDB.database.ref('notas/'+note.id).set(note);
        // this.notes.push(note);
    }
    public editNote(note){
        // for(let i=0; i < this.notes.length; i++){
        //     if (this.notes[i].id == note.id) {
        //         this.notes[i] = note;
        //     }
        // }
        
        let key:string = String(note.id);
        console.log(key);
        this.afDB.database.ref('notas/'+ note.id).update(key, note);
        
    }
    public deleteNote(note){
        // for(let i=0; i < this.notes.length; i++){
        //     if (this.notes[i].id == note.id) {
        //         this.notes.splice(i, 1);
        //     }
        // }

        this.afDB.database.ref('notas/'+note.id).remove();

    }

}
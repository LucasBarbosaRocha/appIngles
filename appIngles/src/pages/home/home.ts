import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Word } from '../../model/word/word';
import { WordDao, wordList } from '../../model/word/wordDao';
import { EditWordPage } from '../../pages/edit-word/edit-word';

import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public word: Word;
  public qtdWords: number;
  public teste: Word[];
  public words: wordList[];

  constructor(
    public navCtrl: NavController,
    private _dao: WordDao,
    private toast: ToastController) {
      this.word = new Word(null, null, null);
      this.qtdWords = 0;
  }

  ngOnInit() {
    this._dao.lista()
      .then(results => {
        this.words = results.sort();
        console.log("TESTES");
        console.log(this.words);
      })
  }

  // ionViewDidEnter um carregamento 
  ionViewDidEnter() {
    //console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumeros(5, 10);
    this._dao.lista()
      .then(results => {
        this.words = results.sort();
        console.log("TESTES");
        console.log(this.words);
      })
  }

  addWord() {
    this.navCtrl.push(EditWordPage);
    console.log("TESTARAETSETA");
  }

  editWord(item: wordList) {
    this.navCtrl.push(EditWordPage, {key: item.key, word: item.word});

  }

  removeWord(item: wordList) {
    this._dao.remove(item.key)
      .then(() => {
        let index = this.words.indexOf(item); // Removendo do array
        this.words.splice(index, 1);

        this.toast.create({ message: 'Contato removido', duration: 3000, position: 'botton'}).present();
      })
  }



}

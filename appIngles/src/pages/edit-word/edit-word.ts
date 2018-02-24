import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Word } from '../../model/word/word';
import { WordDao, wordList } from '../../model/word/wordDao';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditWordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-word',
  templateUrl: 'edit-word.html',
})
export class EditWordPage {

  model: Word;
  key: string;
  val: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _dao: WordDao,
    private toast: ToastController) {

    if (this.navParams.data.word && this.navParams.data.key) {
      this.model = this.navParams.data.word;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Word(null, null, null);
    }
  }

  save() {
    console.log("DUplicada");
    console.log("Resultado ");

    // Consultando se a palavra já existe no banco
    this._dao.ehPalavraDuplicada(this.model)
      .then((result) => {
        console.log("Val 2 " + result);
        if (result == false) {
          this.saveWord()
            .then(() => {
              this.toast.create({ message: 'Palavra salva', duration: 3000, position: 'botton' }).present();
              this.navCtrl.pop();
            })
            .catch((error) => {
              this.toast.create({ message: 'erro ao salvar palavra', duration: 3000, position: 'botton' }).present();
            })
        } else {
          this.toast.create({ message: 'Palavra já existente', duration: 3000, position: 'botton' }).present();
        }

      })
  }

  private saveWord() {
    if (this.key) {
      return this._dao.update(this.key, this.model);
    } else {
      return this._dao.insert(this.model);
    }
  }
}

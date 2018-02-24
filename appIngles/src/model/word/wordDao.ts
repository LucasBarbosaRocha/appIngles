import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Word } from './word';
import { DatePipe } from '@angular/common';




@Injectable()
export class WordDao {

    constructor(private _storage: Storage, private datepipe: DatePipe) { }

    //retorna a chave para amazenar no banco de dados
    private _getKey(word: Word) {

        return this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    }

    public insert(word: Word) {
        return this.save(this._getKey(word), word);
    }

    public update(key: string, word: Word) {
        return this.save(key, word);
    }

    //salva a informação no banco de dados
    private save(key: string, word: Word) {
        return this._storage.set(key, word);
    }

    public remove(key: string) {
        return this._storage.remove(key);
    }

    ehPalavraDuplicada(word: Word) {
        //Verifica se a palavra é duplicada
        //Pega as chaves 
        //let key = word.key;
        //Executa uma query no banco de dados para verificar se já existe a informação no banco de dados

        /* return this._storage.forEach((value: any, Key: string, iterationNumber: number) => {
             console.log(word.palavra, value.palavra);
             if (word.palavra == value.palavra && word.traducao == value.traducao
                 || word.palavra == value.traducao) 
                 return true;
             else
                 return false;
         }) */
         console.log("Estou dentro");
        var val = false;
        return this._storage.forEach((value: any, Key: string, iterationNumber: number) => {
            console.log(word.palavra, value.palavra, value.traducao);
            if (word.palavra == value.palavra && word.traducao == value.traducao
                || word.palavra == value.traducao)
                val = true;
        }).then(() => {
            console.log("val " + val);
            return val;
        })


        /*return this._storage
            .get(key)
            .then(dado => {
                return dado ? true : false;
            });*/
    }

    lista() {

        let words: wordList[] = [];

        return this._storage.forEach((value: any, Key: string, iterationNumber: number) => {
            let wordAux = new wordList;
            wordAux.key = Key;
            wordAux.word = value;
            words.push(wordAux);
        })
            .then(() => {
                return Promise.resolve(words);
            })
            .catch((error) => {
                return Promise.reject(error);
            })


    }

    listAll() {
        //Lista todos os pedidos
        //Cria uma array para amazenar os dados
        let words = [];
        // executa um storage.forEach para pegar todos os dados e armazenar no array de pedidos
        // utilizando uma promise o valor e retorando com todas as informações dos pedidos
        return this._storage.forEach(dado => {
            let word = new Word(
                dado.word.id,
                dado.word.nome,
                dado.word.traducao);

            words.push(word);
        })
            .then(() => words);
    }

}

export class wordList {

    key: string;
    word: Word;
}
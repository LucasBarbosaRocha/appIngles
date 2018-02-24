import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { WordsPage } from '../words/words';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WordsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}

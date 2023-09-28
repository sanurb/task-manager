import { Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { locale as jpLang } from './modules/i18n/vocabs/jp';

@Component({
  selector: 'task-manager-client-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {
    this.modeService.init();
  }
}

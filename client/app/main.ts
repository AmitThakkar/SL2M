/**
 * Created by amitthakkar on 15/07/16.
 */
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from "@angular/http";
import {MusicBasketComponent} from './music-basket/music.basket.component';
import './rxjs.operators';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser/index';

bootstrap(<any>MusicBasketComponent, [
    HTTP_PROVIDERS,
    ...MODAL_BROWSER_PROVIDERS
]).catch(err => console.error(err));
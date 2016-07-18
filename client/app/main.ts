/**
 * Created by amitthakkar on 15/07/16.
 */
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from "@angular/http";
import {MusicBasketComponent} from './music-basket/music.basket.component';
import './rxjs.operators'

bootstrap(<any>MusicBasketComponent, [HTTP_PROVIDERS]);
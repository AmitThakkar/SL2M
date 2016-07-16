/**
 * Created by amitthakkar on 15/07/16.
 */
import {Component} from '@angular/core';
import {MusicBasketService} from "./music.basket.service";

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: './music.basket.html',
    providers: [MusicBasketService]
})
export class MusicBasketComponent {
    private requestWaitTime:number = 200;
    private artistName:string = '';
    private refreshTimer:any = undefined;
    private searchInProgress:any = undefined;
    private nextSearchRequired:any = undefined;

    constructor(private _musicBasketService:MusicBasketService) {
    }

    public keyup(event:any) {
        this.artistName = event.target.value;
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }
        this.refreshTimer = setTimeout(() => {
            if (!this.searchInProgress) {
                this.listArtist();
            } else {
                this.nextSearchRequired = true;
            }
        }, this.requestWaitTime);
    }

    public listArtist() {
        this.searchInProgress = true;
        this._musicBasketService.listArtist(this.artistName)
        this.searchInProgress = false;
        if (this.nextSearchRequired) {
            this.listArtist();
        }
    }
}
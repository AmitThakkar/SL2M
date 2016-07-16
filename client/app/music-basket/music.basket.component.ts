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
    private requestWaitTime:number = 500;
    private artistName:string = '';
    private refreshTimer:any = undefined;
    private searchInProgress:any = undefined;
    private nextSearchRequired:any = undefined;

    public artists:Artist[] = undefined;
    public albums:Album[] = undefined;

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
            .subscribe((artists:Artist[]) => {
                this.artists = artists;
            }, (error) => {
                // TODO show error here.
            });
        this.searchInProgress = false;
        if (this.nextSearchRequired) {
            this.listArtist();
        }
    }

    public listAlbum(artistId) {
        this.artists = undefined;
        this._musicBasketService.listAlbum(artistId)
            .subscribe((albums:Album[]) => {
                this.albums = albums;
            }, (error) => {
                // TODO show error here.
            });
        this.searchInProgress = false;
        if (this.nextSearchRequired) {
            this.listArtist();
        }
    }
}
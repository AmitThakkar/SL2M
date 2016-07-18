/**
 * Created by amitthakkar on 15/07/16.
 */
import {Component, ViewChild} from '@angular/core';
import {MusicBasketService} from "./music.basket.service";
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: './music.basket.html',
    providers: [MusicBasketService],
    directives: [MODAL_DIRECTIVES]
})
export class MusicBasketComponent {
    private requestWaitTime:number = 500;
    private artistName:string = '';
    private refreshTimer:any = undefined;
    private searchInProgress:any = undefined;
    private nextSearchRequired:any = undefined;

    public artists:Artist[] = undefined;
    public albums:Album[] = undefined;
    public trackAlbum:Track[] = undefined;

    @ViewChild('trackList') trackList:ModalComponent;

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
        this.albums = undefined;
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

    public listTrack(collectionId) {
        this._musicBasketService.listTrack(collectionId)
            .subscribe((trackList) => {
                this.trackAlbum = trackList;
                this.trackList.open();
            }, (error) => {
                // TODO show error here.
            });
    }
}
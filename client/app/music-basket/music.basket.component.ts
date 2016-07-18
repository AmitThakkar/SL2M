/**
 * Created by amitthakkar on 15/07/16.
 */
import {Component, ViewContainerRef} from '@angular/core';
import {MusicBasketService} from "./music.basket.service";
import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap/index';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: './music.basket.html',
    providers: [MusicBasketService],
    viewProviders: [...BS_MODAL_PROVIDERS]
})
export class MusicBasketComponent {
    private requestWaitTime:number = 500;
    private artistName:string = '';
    private refreshTimer:any = undefined;
    private searchInProgress:any = undefined;
    private nextSearchRequired:any = undefined;

    public artists:Artist[] = undefined;
    public albums:Album[] = undefined;
    public tracks:Track[] = undefined;

    constructor(private _musicBasketService:MusicBasketService, public modal:Modal, viewContainer:ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
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
                this.tracks = trackList.tracks;
                console.log(this.tracks);
                // this.trackAlbum = trackList.album;
                this.modal.alert()
                    .size('lg')
                    .showClose(true)
                    .title('A simple Alert style modal window')
                    .open();
            }, (error) => {
                // TODO show error here.
            });
    }
}
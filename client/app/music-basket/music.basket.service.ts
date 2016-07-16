/**
 * Created by amitthakkar on 16/07/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MusicBasketService {
    private SERVER_URL = 'http://localhost:8081/';
    private RETRIEVE_ARTIST_URL = this.SERVER_URL + 'api/artistList?artistName={artistName}';
    private RETRIEVE_ALBUM_LIST_URL = this.SERVER_URL + 'api/albumList?artistName={artistId}';
    private RETRIEVE_TRACK_LIST_URL = this.SERVER_URL + 'api/trackList?artistName={collectionId}';

    constructor(private http:Http) {
    }

    public listArtist(artistName:string, successHandler, errorHandler):Observable<Artist[]> {
        return this.http.get(this.RETRIEVE_ARTIST_URL.replace('{artistName}', artistName))
            .map(successHandler)
            .catch(errorHandler);
    }

    public listAlbum(artistName:string, successHandler, errorHandler):Observable<Album[]> {
        return this.http.get(this.RETRIEVE_ALBUM_LIST_URL.replace('{artistId}', artistName))
            .map(successHandler)
            .catch(errorHandler);
    }

    public listTrack(artistName:string, successHandler, errorHandler) {
        return this.http.get(this.RETRIEVE_TRACK_LIST_URL.replace('{collectionId}', artistName))
            .map(successHandler)
            .catch(errorHandler);
    }
}
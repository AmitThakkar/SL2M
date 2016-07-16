/**
 * Created by amitthakkar on 16/07/16.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MusicBasketService {
    private SERVER_URL = 'http://localhost:8081/';
    private RETRIEVE_ARTIST_LIST_URL = this.SERVER_URL + 'api/artistList?artistName={artistName}';
    private RETRIEVE_ALBUM_LIST_URL = this.SERVER_URL + 'api/albumList?artistId={artistId}';
    private RETRIEVE_TRACK_LIST_URL = this.SERVER_URL + 'api/trackList?collectionId={collectionId}';

    constructor(private http:Http) {
    }


    private extractData(response:Response) {
        let body = response.json();
        return body || [];
    }

    private handleError(error:any) {
        let errorMessage = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }

    public listArtist(artistName:string):Observable<Artist[]> {
        return this.http.get(this.RETRIEVE_ARTIST_LIST_URL.replace('{artistName}', artistName))
            .map(this.extractData)
            .catch(this.handleError);
    }

    public listAlbum(artistId:string):Observable<Album[]> {
        return this.http.get(this.RETRIEVE_ALBUM_LIST_URL.replace('{artistId}', artistId))
            .map(this.extractData)
            .catch(this.handleError);
    }

    public listTrack(collectionId:string):Observable<any> {
        return this.http.get(this.RETRIEVE_TRACK_LIST_URL.replace('{collectionId}', collectionId))
            .map(this.extractData)
            .catch(this.handleError);
    }
}
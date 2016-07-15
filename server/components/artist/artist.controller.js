/**
 * Created by amitthakkar on 15/07/16.
 */
'use strict';
// Dependencies
const REQUEST = require('request');
const HTTP_STATUS = require('http-status');

// Constants
const API_URL = 'https://itunes.apple.com/';
const RETRIEVE_ARTIST_URL = API_URL + 'search?term={artistName}';
const RETRIEVE_ALBUM_LIST_URL = API_URL + 'lookup?id={artistId}&entity=album';
const RETRIEVE_TRACK_LIST_URL = API_URL + 'lookup?id={collectionId}&entity=song ';

// API Handler
exports.listArtist = (request, response) => {
    let artistName = request.query.artistName;
    if (!artistName) {
        return response.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({message: "Please provide artist Name"});
    }
    REQUEST(RETRIEVE_ARTIST_URL.replace('{artistName}', artistName), function (error, artistResponse) {
        if (error) {
            return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error: error});
        } else if (artistResponse.statusCode == HTTP_STATUS.OK) {
            let result = JSON.parse(artistResponse.body);
            const ARTIST_NAME_REGEX = new RegExp(artistName, 'i');
            if (result && result.resultCount > 0) {
                let artistArray = [];
                result.results.forEach((artist) => {
                    if (ARTIST_NAME_REGEX.test(artist.artistName)) {
                        artistArray.push({
                            artistId: artist.artistId,
                            artistName: artist.artistName
                        });
                    }
                });
                response.status(HTTP_STATUS.OK).json(artistArray);
            } else {
                return response.status(HTTP_STATUS.NOT_FOUND).json({message: "No Artist Fount with name " + artistName});
            }
        }
    })
};
exports.listAlbum = (request, response) => {
    let artistId = request.query.artistId;
    if (!artistId) {
        return response.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({message: "Please provide artist Id"});
    }
    REQUEST(RETRIEVE_ALBUM_LIST_URL.replace('{artistId}', artistId), function (error, albumResponse) {
        if (error) {
            return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error: error});
        } else if (albumResponse.statusCode == HTTP_STATUS.OK) {
            let result = JSON.parse(albumResponse.body);
            if (result && result.resultCount > 0) {
                let albumArray = [];
                result.results.forEach((album, index) => {
                    if (index === 0) {
                        return;
                    }
                    albumArray.push({
                        artistName: album.artistName,
                        artworkUrl100: album.artworkUrl100,
                        collectionId: album.collectionId,
                        collectionName: album.collectionName
                    });
                });
                response.status(HTTP_STATUS.OK).json(albumArray);
            } else {
                return response.status(HTTP_STATUS.NOT_FOUND).json({message: "No Album Fount with artistId " + artistId});
            }
        }
    })
};
exports.listTrack = (request, response) => {
    let collectionId = request.query.collectionId;
    if (!collectionId) {
        return response.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({message: "Please provide artist Id"});
    }
    REQUEST(RETRIEVE_TRACK_LIST_URL.replace('{collectionId}', collectionId), function (error, trackResponse) {
        if (error) {
            return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error: error});
        } else if (trackResponse.statusCode == HTTP_STATUS.OK) {
            let result = JSON.parse(trackResponse.body);
            if (result && result.resultCount > 0) {
                let trackArray = [], collection;
                result.results.forEach((track, index) => {
                    if (index === 0) {
                        collection = result.results[0];
                        return;
                    }
                    trackArray.push({
                        trackNumber: track.trackNumber,
                        trackName: track.trackName,
                        collectionArtistName: track.collectionArtistName,
                        trackTimeMillis: track.trackTimeMillis,
                        primaryGenreName: track.primaryGenreName,
                        releaseDate: track.releaseDate

                    });
                });
                response.status(HTTP_STATUS.OK).json({
                    tracks: trackArray,
                    album: {
                        collectionName: collection.collectionName,
                        artistName: collection.artistName,
                        trackCount: collection.trackCount
                    }
                });
            } else {
                return response.status(HTTP_STATUS.NOT_FOUND).json({message: "No Track Fount with collectionId " + collectionId});
            }
        }
    })
};
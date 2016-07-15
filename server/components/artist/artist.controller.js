/**
 * Created by amitthakkar on 15/07/16.
 */
'use strict';
// Dependencies
const REQUEST = require('request');
const HTTP_STATUS = require('http-status');

// Constants
const API_URL = 'https://itunes.apple.com/';
const RETRIEVE_ARTIST_URL = API_URL + 'search?term=';

// API Handler
exports.listAlbum = (request, response) => {
    let artistName = request.query.artistName;
    if (!artistName) {
        return response.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({message: "Please provide artist Name"});
    }
    REQUEST(RETRIEVE_ARTIST_URL + artistName, function (error, artistResponse, body) {
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
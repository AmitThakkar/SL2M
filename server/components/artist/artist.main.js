/**
 * Created by amitthakkar on 15/07/16.
 */
'use strict';
// Route Mappings
module.exports = (app) => {
    const ArtistController = require('./artist.controller');
    app.get('/api/artistList', ArtistController.listArtist);
    app.get('/api/albumList', ArtistController.listAlbum);
    app.get('/api/trackList', ArtistController.listTrack);
};
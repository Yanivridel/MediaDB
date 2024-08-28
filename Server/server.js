const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');

const songSchema = new mongoose.Schema({
    name:'string',
    album:'string',
    artist:'string'
});

// song.find()
// .then(songs => {
//     console.log('All songs:', songs);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });

const bookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    categories: [String],
    language: String,
    publishedDate: Date,
    img: String,
    link: String
}); //pushed to default books collection
const Book = mongoose.model('Book', bookSchema);

const data = bkHandle.searchData();
data.then(data => {
    console.log("------------------------------------------------------------------------------------");
    
    console.log(data);
    

    data.forEach(book => {
        console.log(book.volumeInfo.title);
        console.log(book.volumeInfo.authors);
        console.log(book.volumeInfo.categories);
        console.log(book.volumeInfo.language);
        console.log(book.volumeInfo.publishedDate);
        console.log(book.volumeInfo.imageLinks?.thumbnail);
        console.log(book.volumeInfo.previewLink);

        // const newBook = new Book({
        //     title: book.volumeInfo.title,
        //     authors: book.volumeInfo.authors,
        //     categories: book.volumeInfo.categories,
        //     language: book.volumeInfo.language,
        //     publishedDate: book.volumeInfo.publishedDate,
        //     img: book.volumeInfo.imageLinks?.thumbnail,
        //     link: book.volumeInfo.previewLink
        // });

        // newBook.save()
        // .then(() => console.log('Book added successfully'))
        // .catch(error => console.error('Error adding book:', error));

    });

    console.log("------------------------------------------------------------------------------------");

});


const Song = mongoose.model('Song', songSchema);
const songs = spHandle.searchData();
function insertSong(song){
    const newSong = new Song({
        name: song.name,
        album: song.album.name,
        artist: song.artists[0].name
    });
    newSong.save();
}


connectDB();
songs.then(songs=> {
    songs.forEach(song =>{
        insertSong(song);
    })
});
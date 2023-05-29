var express = require('express');
var router = express.Router();

const Book = require('../models/Book')





router.get('/', (req, res, next) => {
    Book.find()
        .populate('usersWhoFavorited')
        .populate('usersCurrentlyReading')
        .sort({createdAt: -1})
        .then((foundBooks) => {
            res.json(foundBooks)
        })
        .catch((err) => {
            console.log(err)
        })
})





router.post('/add-book/:userId', (req, res, next) => {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    })
    .then((final) => {
        res.json(final)
    })
    .catch((err) => {
        console.log(err)
    })
})





router.get('book-detail/:id', (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .populate('usersWhoFavorited')
        .populate('usersCurrentlyReading')
        .then((foundBook) => {
            res.json(foundPost)
        })
        .catch((err) => {
            console.log(err)
        })
})





router.post('/edit-book/:bookId', (req, res, next) => {
    Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    }, {new: true})
    .then((editedBook) => {
        res.json(editedBook)
    })
    .catch((err) => {
        console.log(err)
    })
})





router.get('/delete-book/:bookId', (req, res, next) => {
    Book.findByIdAndDelete(req.params.postId)
        .then((deletedBook) => {
            res.json(deletedBook)
        })
        .catch((err) => {
            console.log(err)
        })
})





module.exports = router;
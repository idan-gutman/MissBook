'use strict';

import { DbService } from './db-service.js';

const KEY = 'books';

export default {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview
};

async function query() {
    var books = await DbService.query(KEY);
    // console.log(books);
    if (!books || !books.length) {
        books = _createDefaultBooks();
        await DbService.postMany(KEY, books);
    }
    return books;
}

function get(id) {
    return DbService.get(KEY, id);
}

function remove(id) {
    return DbService.delete(KEY, id);
}

function save(book) {
    if (book.id) return DbService.put(KEY, book);
    else return DbService.post(KEY, book);
}

function getEmptyBook() {
    return {
        vendor: '',
        speed: 0
    };
}

function _createDefaultBooks() {
    return [
        _createBook('Audu', 50),
        _createBook('Fiak', 73),
        _createBook('Subali', 100),
        _createBook('Susika', 120),
    ];
}

function _createBook(vendor, speed) {
    return {
        vendor,
        speed,
    };
}

async function addReview(bookId, review) {
    const book = await get(bookId);
    book.reviews.push(review);
    return save(book);
}
async function removeReview(id, idx) {
    const book = await get(id);
    book.reviews.splice(idx, 1)
    return save(book);
}
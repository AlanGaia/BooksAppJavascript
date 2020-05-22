import BookService from './services/BookService.js';
const bookService = new BookService();

import {format}  from 'timeago.js';

class UI {

    async renderBooks(){
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = ``;
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card mb-5" >
                    <img class="book-img img-fluid" src="${book.imagePath}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete Book</a>
                    </div>
                    <div class="card-footer col-md-12">
                        ${format(book.created_at)}
                    </div>
                </div>
            `
            booksCardContainer.appendChild(div);
        });
    }

    async addANewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`

        div.appendChild(document.createTextNode(message));


        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div,bookForm);

        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);

    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }
}

export default UI;
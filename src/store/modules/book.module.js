import bookService from '@/services/book.service.js';

export const bookStore = {
    state: {
        books: null,
        filterBy: null
    },
    getters: {
        books(state) {
            return state.books
        },
        booksToShow(state) {
            if (!state.filterBy) return state.books;
            let { byName, fromPrice, toPrice } = state.filterBy;
            toPrice = toPrice ? toPrice : Infinity;
            fromPrice = fromPrice ? fromPrice : -Infinity;
            const regex = new RegExp(byName, "i");
            const booksToShow = state.books.filter(
                (book) =>
                    regex.test(book.title) &&
                    book.listPrice.amount >= fromPrice &&
                    book.listPrice.amount <= toPrice
            );
            return booksToShow;
        },
    },
    mutations: {
        setBooks(state, { books }) {
            state.books = books;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        removeBook(state, { bookId }) {
            const idx = state.books.findIndex(book => book.id === bookId);
            state.books.splice(idx, 1);
        }
    },
    actions: {
        async loadBooks(context) {
            const books = await bookService.query();
            context.commit({ type: 'setBooks', books });
        },
        async removeBook(context, { bookId }) {
            try {
                await bookService.remove(bookId);
                context.commit({ type: 'removeBook', bookId });
                // context.dispatch({ type: 'showMsg', msg: { txt: 'Removed successfuly...', class: 'success' } });
            } catch (err) {
                console.log(err);
                // context.dispatch({ type: 'showMsg', msg: { txt: 'Error, please try again later', class: 'error' } });
            }
        },
    },
}
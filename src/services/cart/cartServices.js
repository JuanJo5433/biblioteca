import { getConstants } from "@/utils/constans";

const { cart } = getConstants();

export class Cart {
    // TODO:  AGREGAR, EDITAR CANTIDAD, ELIMINAR UNO, ELIMINAR TODO

    add(idBook) {
        const books = this.getAll();
        const objIndex = books.findIndex((book) => book.id == idBook);

        if (objIndex < 0) {
            books.push({ id: idBook, quantity: 1 });
        } else {
            const book = books[objIndex];
            books[objIndex].quantity = book.quantity + 1;
        }
        localStorage.setItem(cart, JSON.stringify(books));
    }

    getAll() {
        const response = localStorage.getItem(cart);

        if (!response) {
            return [];
        } else {
            return JSON.parse(response);
        }
    }

    deleteItem(idItem) {
        const books = this.getAll();

        const result = books.filter((item) => item.id !== idItem);

        localStorage.setItem(cart, JSON.stringify(result));
    }

    changeQuantityItems(idItem, newQuantity) {
        const books = this.getAll();
        const objIndex = books.findIndex((book) => book.id == idItem);

        books[objIndex].quantity = newQuantity;
        localStorage.setItem(cart, JSON.stringify(books));
    }
}

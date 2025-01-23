import { fetchBooks } from "@/services/books/bookServices";
import { BookCard } from "./BookCard";
import { useEffect, useState } from "react";

export function BookList(props) {
    const { title, category } = props;
    const [books, setBooks] = useState([]);
   
    useEffect(() => {
        const getBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();
                setBooks(fetchedBooks.data);
            } catch (err) {
                console.error(err)();
            }
        };

        getBooks();
    }, []);
    return (
        <div>
            <section className="p-8 bg-background-main">
                <h2 className="text-3xl font-bold text-espresso-brown text-center mb-8">
                    {title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    <BookCard books={books} category={category} />
                </div>
            </section>
        </div>
    );
}

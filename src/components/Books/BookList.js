import { BookCard } from "./BookCard";

const books = [
    {
        id: 1,
        title: "El Principito",
        author: "Antoine de Saint-Exupéry",
        cover: "https://www.laesferaazul.com/wp-content/uploads/2022/09/Descubrir-el-Principito-scaled.jpg",
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrq2RIC2cWWHMnrvruHzvyMepMNCGRau8PA&s",
    },
    {
        id: 3,
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
        cover: "https://m.media-amazon.com/images/I/81rEWmLXliL._AC_UF1000,1000_QL80_.jpg",
    },
    {
        id: 4,
        title: "Orgullo y Prejuicio",
        author: "Jane Austen",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROtKp1LWmb2XG4zSkgZXwpYFljvXqXFPNIg&s",
    },
    {
        id: 5,
        title: "1984",
        author: "George Orwell",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrq2RIC2cWWHMnrvruHzvyMepMNCGRau8PA&s",
    },
    {
        id: 6,
        title: "Orgullo y Prejuicio",
        author: "Jane Austen",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROtKp1LWmb2XG4zSkgZXwpYFljvXqXFPNIg&s",
    },
];

export function BookList() {
    return (
        <div>
            <section className="p-8 bg-background-main">
                <h2 className="text-3xl font-bold text-espresso-brown text-center mb-8">
                    Nuestra Colección
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    <BookCard books={books} />
                </div>
            </section>
        </div>
    );
}

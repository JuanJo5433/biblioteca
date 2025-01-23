export const books = [
    // TODOS (Mostrados siempre, independientemente de la categoría)
    {
        id: 1,
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        category: "Ficción",
        description:
            "La historia épica de la familia Buendía en el pueblo mágico de Macondo, lleno de realismo mágico y simbolismo.",
        image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "cien-anos-de-soledad",
    },
    {
        id: 2,
        title: "El principito",
        author: "Antoine de Saint-Exupéry",
        category: "Ficción",
        description:
            "Un cuento poético sobre un joven príncipe que explora el universo y aprende valiosas lecciones de vida.",
        image: "https://covers.openlibrary.org/b/id/8776820-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "el-principito",
    },
    {
        id: 3,
        title: "Sapiens: De animales a dioses",
        author: "Yuval Noah Harari",
        category: "No Ficción",
        description:
            "Un fascinante recorrido por la historia de la humanidad, desde sus orígenes hasta el presente.",
        image: "https://covers.openlibrary.org/b/id/10583624-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "sapiens-de-animales-a-dioses",
    },
    {
        id: 4,
        title: "Una breve historia del tiempo",
        author: "Stephen Hawking",
        category: "Ciencia",
        description:
            "Un libro revolucionario que explica los misterios del universo, desde los agujeros negros hasta el Big Bang.",
        image: "https://covers.openlibrary.org/b/id/8224151-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "una-breve-hitoria-del-tiempo",
    },
    {
        id: 5,
        title: "El diario de Ana Frank",
        author: "Ana Frank",
        category: "Historia",
        description:
            "Un testimonio conmovedor del sufrimiento humano durante el Holocausto, narrado desde la perspectiva de una niña judía.",
        image: "https://covers.openlibrary.org/b/id/8231858-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "el-diario-de-ana-frank",
    },
    {
        id: 6,
        title: "Steve Jobs",
        author: "Walter Isaacson",
        category: "Biografías",
        description:
            "Una biografía detallada del visionario detrás de Apple, explorando su genio y complejidades personales.",
        image: "https://covers.openlibrary.org/b/id/8145272-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "steve-jobs",
    },

    // FICCIÓN
    {
        id: 7,
        title: "1984",
        author: "George Orwell",
        category: "Ficción",
        description:
            "Una distopía sobre un régimen totalitario que controla todos los aspectos de la vida humana.",
        image: "https://covers.openlibrary.org/b/id/153541-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "1984",
    },
    {
        id: 8,
        title: "Orgullo y prejuicio",
        author: "Jane Austen",
        category: "Ficción",
        description:
            "Una comedia romántica que explora las complejidades de las relaciones sociales en la Inglaterra del siglo XIX.",
        image: "https://covers.openlibrary.org/b/id/6969323-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "orgullo-y-prejuicio",
    },
    {
        id: 9,
        title: "El gran Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Ficción",
        description:
            "La trágica historia de amor y ambición en la era del jazz, con Jay Gatsby como el protagonista inolvidable.",
        image: "https://covers.openlibrary.org/b/id/8226191-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "el-gran-gatsby",
    },
    {
        id: 10,
        title: "Crimen y castigo",
        author: "Fiódor Dostoyevski",
        category: "Ficción",
        description:
            "Una exploración psicológica sobre la culpa y el arrepentimiento a través de la historia de un asesinato.",
        image: "https://covers.openlibrary.org/b/id/9876653-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "crimen-y-castigo",
    },

    // NO FICCIÓN
    {
        id: 13,
        title: "El hombre en busca de sentido",
        author: "Viktor Frankl",
        category: "No Ficción",
        description:
            "Una reflexión filosófica sobre el sufrimiento y la resiliencia, basada en la experiencia del autor en campos de concentración nazis.",
        image: "https://covers.openlibrary.org/b/id/8611846-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "el-hombre-en-busca-de-sentido",
    },
    {
        id: 14,
        title: "Educated (Una educación)",
        author: "Tara Westover",
        category: "No Ficción",
        description:
            "Las memorias de una mujer que desafió su educación aislada para obtener conocimiento y libertad.",
        image: "https://covers.openlibrary.org/b/id/10273271-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "educated-una-educacion",
    },

    // CIENCIA
    {
        id: 19,
        title: "El gen egoísta",
        author: "Richard Dawkins",
        category: "Ciencia",
        description:
            "Un influyente libro que explora la evolución desde la perspectiva de los genes.",
        image: "https://covers.openlibrary.org/b/id/7217340-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "el-gen-egoista",
    },
    {
        id: 20,
        title: "Cosmos",
        author: "Carl Sagan",
        category: "Ciencia",
        description:
            "Un viaje fascinante a través del universo, que combina ciencia y filosofía para explorar nuestro lugar en el cosmos.",
        image: "https://covers.openlibrary.org/b/id/8225696-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "cosmos",
    },

    // HISTORIA
    {
        id: 25,
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        category: "Historia",
        description:
            "Una mirada profunda a los factores geográficos y ambientales que dieron forma a la civilización humana.",
        image: "https://covers.openlibrary.org/b/id/10521463-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "guns-germs-and-steel",
    },

    // BIOGRAFÍAS
    {
        id: 31,
        title: "Yo soy Malala",
        author: "Malala Yousafzai",
        category: "Biografías",
        description:
            "La inspiradora historia de una joven que defendió la educación de las niñas frente al terrorismo.",
        image: "https://covers.openlibrary.org/b/id/8381998-L.jpg",

        rentalPrice: 12,
        salePrice: 123,
        slug: "yo-soy-malala",
    },
];

export const reviews = [
    // Ficción
    {
        bookId: 1,
        review: "Una obra maestra del realismo mágico. Las generaciones de la familia Buendía te envuelven en un viaje inolvidable.",
        rating: 5,
        name: "Gabriel García Márquez",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 2,
        review: "Un libro que siempre recordarás. Enseña lecciones profundas sobre la amistad, el amor y la pérdida.",
        rating: 4.8,
        name: "J.K. Rowling",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 7,
        review: "Un relato aterrador y profético sobre el poder, la vigilancia y la manipulación de la verdad.",
        rating: 4.9,
        name: "George Orwell",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 8,
        review: "Una historia encantadora llena de ingenio y romance. Jane Austen en su mejor forma.",
        rating: 4.7,
        name: "Jane Austen",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 10,
        review: "Un viaje emocional que te lleva al interior de la mente humana. Un clásico profundo y reflexivo.",
        rating: 4.9,
        name: "Virginia Woolf",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },

    // No Ficción
    {
        bookId: 3,
        review: "Un análisis impresionante sobre la historia de la humanidad. Cambiará cómo ves el mundo.",
        rating: 4.8,
        name: "Yuval Noah Harari",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 13,
        review: "Una lección de vida conmovedora. Inspirador en todos los sentidos.",
        rating: 4.9,
        name: "Maya Angelou",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 14,
        review: "Una historia impactante y valiente sobre el poder de la educación.",
        rating: 4.7,
        name: "Malala Yousafzai",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },

    // Ciencia
    {
        bookId: 4,
        review: "Stephen Hawking simplifica los misterios del universo con claridad y brillantez.",
        rating: 4.8,
        name: "Stephen Hawking",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 19,
        review: "Un libro revolucionario que redefine cómo entendemos la evolución.",
        rating: 4.6,
        name: "Richard Dawkins",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 20,
        review: "Carl Sagan logra despertar la curiosidad por el cosmos con su increíble narrativa.",
        rating: 5,
        name: "Carl Sagan",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },

    // Historia
    {
        bookId: 5,
        review: "Una mirada desgarradora a los horrores del Holocausto a través de los ojos de una niña.",
        rating: 4.9,
        name: "Anne Frank",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 25,
        review: "Una obra maestra que revela cómo los factores geográficos han moldeado la historia.",
        rating: 4.7,
        name: "Jared Diamond",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },

    // Biografías
    {
        bookId: 6,
        review: "Una mirada íntima al genio detrás de Apple. Inspirador y brutalmente honesto.",
        rating: 4.8,
        name: "Steve Jobs",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
        bookId: 31,
        review: "Una historia inspiradora que muestra el poder del coraje y la educación.",
        rating: 4.9,
        name: "Malala Yousafzai",
        image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
];

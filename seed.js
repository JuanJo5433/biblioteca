const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Insertando categorías
  const fictionCategory = await prisma.categories.create({
    data: { name: "Ficción" },
  });
  const nonFictionCategory = await prisma.categories.create({
    data: { name: "No Ficción" },
  });
  const scienceCategory = await prisma.categories.create({
    data: { name: "Ciencia" },
  });
  const historyCategory = await prisma.categories.create({
    data: { name: "Historia" },
  });
  const biographiesCategory = await prisma.categories.create({
    data: { name: "Biografías" },
  });

  // Insertando autores
  const gabrielGarciaMarquez = await prisma.authors.create({
    data: { name: "Gabriel García Márquez" },
  });
  const yuvalNoahHarari = await prisma.authors.create({
    data: { name: "Yuval Noah Harari" },
  });
  const stephenHawking = await prisma.authors.create({
    data: { name: "Stephen Hawking" },
  });
  const anaFrank = await prisma.authors.create({
    data: { name: "Ana Frank" },
  });
  const walterIsaacson = await prisma.authors.create({
    data: { name: "Walter Isaacson" },
  });

  // Insertando libros
  await prisma.books.createMany({
    data: [
      {
        ISBN: "9780307474738",
        title: "Cien años de soledad",
        subtitle: "",
        description:
          "La historia épica de la familia Buendía en el pueblo mágico de Macondo, lleno de realismo mágico y simbolismo.",
        edition: "1",
        editorial: "Editorial Sudamericana",
        placePublication: "Buenos Aires",
        yearPublication: 1967,
        slug: "cien-anos-de-soledad",
        status: true,
        acquisitionDate: new Date(),
        purchasePrice: 20,
        rentalPrice: 12,
        categoryId: fictionCategory.id,
        authorId: gabrielGarciaMarquez.id,
        cover: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      },
      {
        ISBN: "9788433962065",
        title: "El principito",
        subtitle: "",
        description:
          "Un cuento poético sobre un joven príncipe que explora el universo y aprende valiosas lecciones de vida.",
        edition: "1",
        editorial: "Editorial Salamandra",
        placePublication: "Barcelona",
        yearPublication: 1943,
        slug: "el-principito",
        status: true,
        acquisitionDate: new Date(),
        purchasePrice: 20,
        rentalPrice: 12,
        categoryId: fictionCategory.id,
        authorId: gabrielGarciaMarquez.id,
        cover: "https://covers.openlibrary.org/b/id/8776820-L.jpg",
      },
      {
        ISBN: "9780062316097",
        title: "Sapiens: De animales a dioses",
        description:
          "Un fascinante recorrido por la historia de la humanidad, desde sus orígenes hasta el presente.",
        subtitle: "",
        edition: "1",
        editorial: "HarperCollins",
        placePublication: "New York",
        yearPublication: 2011,
        slug: "sapiens-de-animales-a-dioses",
        status: true,
        acquisitionDate: new Date(),
        purchasePrice: 25,
        rentalPrice: 12,
        categoryId: nonFictionCategory.id,
        authorId: yuvalNoahHarari.id,
        cover: "https://covers.openlibrary.org/b/id/10583624-L.jpg",
      },
      {
        ISBN: "9788497340247",
        title: "Una breve historia del tiempo",
        description:
          "Un libro revolucionario que explica los misterios del universo, desde los agujeros negros hasta el Big Bang.",
        subtitle: "",
        edition: "1",
        editorial: "Editorial Crítica",
        placePublication: "Barcelona",
        yearPublication: 1988,
        slug: "una-breve-hitoria-del-tiempo",
        status: true,
        acquisitionDate: new Date(),
        purchasePrice: 20,
        rentalPrice: 12,
        categoryId: scienceCategory.id,
        authorId: stephenHawking.id,
        cover: "https://covers.openlibrary.org/b/id/8224151-L.jpg",
      },
      {
        ISBN: "9780553447394",
        title: "El diario de Ana Frank",
        description:
          "Un testimonio conmovedor del sufrimiento humano durante el Holocausto, narrado desde la perspectiva de una niña judía.",
        subtitle: "",
        edition: "1",
        editorial: "Editorial Planeta",
        placePublication: "Barcelona",
        yearPublication: 1947,
        slug: "el-diario-de-ana-frank",
        status: true,
        acquisitionDate: new Date(),
        purchasePrice: 18,
        rentalPrice: 12,
        categoryId: historyCategory.id,
        authorId: anaFrank.id,
        cover: "https://covers.openlibrary.org/b/id/8231858-L.jpg",
      },
      {
        ISBN: "9781451648546",
        title: "Steve Jobs",
        description:
          "Una biografía detallada del visionario detrás de Apple, explorando su genio y complejidades personales.",
        subtitle: "",
        edition: "1",
        editorial: "Simon & Schuster",
        placePublication: "New York",
        yearPublication: 2011,
        slug: "steve-jobs",
        status: true,
        acquisitionDate: new Date(),
        purchasePrice: 30,
        rentalPrice: 12,
        categoryId: biographiesCategory.id,
        authorId: walterIsaacson.id,
        cover: "https://covers.openlibrary.org/b/id/8145272-L.jpg",
      },
    ],
  });

  // Insertando cliente
  const newClient = await prisma.clients.create({
    data: {
      name: "Juan",
      lastName: "Pérez",
      documentType: "DNI",
      codeDocument: 12345678,
      phone: "3216549870",
      email: "juan.perez@example.com",
      password: "password123",
      
    },
  });

  console.log("Cliente insertado: ", newClient);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

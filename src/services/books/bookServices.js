const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBooks() {
    try {
        const response = await fetch(`${apiUrl}/books`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Error al obtener los libros");
        }
        const data = await response.json();
        return data; // Retorna los datos procesados
    } catch (error) {
     
        throw error; // Permite manejar el error en el lugar donde se llama la función
    }
}

export async function fetchBooksById(id) {
    try {
        const response = await fetch(`${apiUrl}/books?id=${id}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Error al obtener el libro");
        }
        const result = await response.json();
        const data = result.data[0]
        return data; // Retorna los datos procesados
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchBooksBySlug(slug) {
  try {
      const response = await fetch(`${apiUrl}/books?slug=${slug}`, {
          method: "GET",
      });
      if (!response.ok) {
          throw new Error("Error al obtener el libro");
      }
      const data = await response.json();
      return data; // Retorna los datos procesados
  } catch (error) {
      console.error(error);
      throw error;
  }
}


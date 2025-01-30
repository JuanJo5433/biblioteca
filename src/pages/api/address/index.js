import prisma from "@/libs/prisma";
import { authenticate } from "@/middlewares/authenticate";

export default async function handler(req, res) {
  try {
    const decoded = await authenticate(req);
    
    switch (req.method) {
      case "GET":
        return handleGet(req, res, decoded);
      case "POST":
        return handlePost(req, res, decoded);
      case "PUT":
        return handlePut(req, res, decoded);
      case "DELETE":
        return handleDelete(req, res, decoded);
      default:
        res.status(405).json({ message: "Método no permitido" });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Obtener direcciones
async function handleGet(req, res, user) {
  const { clientId, id } = req.query;

  if (id) {
    const address = await prisma.address.findUnique({
      where: { id: Number(id) },
    });

    if (!address) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    // Verificar pertenencia
    if (address.clientId !== user.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    return res.status(200).json({ data: address });
  }

  const addresses = await prisma.address.findMany({
    where: { clientId: clientId ? Number(clientId) : user.id },
  });

  res.status(200).json({ data: addresses });
}

// Crear dirección
async function handlePost(req, res, user) {
  const { street1, city, state, country, postalCode, phone } = req.body;

  if (!street1 || !city || !state || !country || !postalCode) {
    return res.status(400).json({ message: "Campos requeridos faltantes" });
  }

  const newAddress = await prisma.address.create({
    data: {
      street1,
      city,
      state,
      country,
      postalCode,
      phone: phone || "",
      clientId: user.id,
    },
  });

  res.status(201).json({ message: "Dirección creada", data: newAddress });
}

// Actualizar dirección
async function handlePut(req, res, user) {
  const { id } = req.query;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID de dirección requerido" });
  }

  const existingAddress = await prisma.address.findUnique({
    where: { id: Number(id) },
  });

  if (!existingAddress) {
    return res.status(404).json({ message: "Dirección no encontrada" });
  }

  if (existingAddress.clientId !== user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  const updatedAddress = await prisma.address.update({
    where: { id: Number(id) },
    data: updateData,
  });

  res.status(200).json({ message: "Dirección actualizada", data: updatedAddress });
}

// Eliminar dirección
async function handleDelete(req, res, user) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "ID de dirección requerido" });
  }

  const existingAddress = await prisma.address.findUnique({
    where: { id: Number(id) },
  });

  if (!existingAddress) {
    return res.status(404).json({ message: "Dirección no encontrada" });
  }

  if (existingAddress.clientId !== user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await prisma.address.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({ message: "Dirección eliminada" });
}
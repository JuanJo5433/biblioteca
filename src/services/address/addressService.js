// File: src/services/address/addressService.js
import { authFetch } from "@/utils/authFetch";
import { getConstants } from "@/utils/constans";

const { apiUrl } = getConstants();

export class AddressService {
  constructor() {
    this.baseUrl = `${apiUrl}/address`;
  }

  // Obtener todas las direcciones del usuario
  async getAddresses(clientId = null) {
    try {
      const url = clientId 
        ? `${this.baseUrl}?clientId=${clientId}`
        : this.baseUrl;

      const response = await authFetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener direcciones");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error en getAddresses:", error);
      throw error;
    }
  }

  // Obtener una dirección específica por ID
  async getAddressById(id) {
    try {
      const response = await authFetch(`${this.baseUrl}?id=${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener la dirección");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error en getAddressById:", error);
      throw error;
    }
  }

  // Crear nueva dirección
  async createAddress(addressData) {
    try {
      const response = await authFetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear dirección");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en createAddress:", error);
      throw error;
    }
  }

  // Actualizar dirección existente
  async updateAddress(id, updateData) {
    try {
      const response = await authFetch(`${this.baseUrl}?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar dirección");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en updateAddress:", error);
      throw error;
    }
  }

  // Eliminar dirección
  async deleteAddress(id) {
    try {
      const response = await authFetch(`${this.baseUrl}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar dirección");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en deleteAddress:", error);
      throw error;
    }
  }

  // Marcar dirección como predeterminada
  async setDefaultAddress(id) {
    try {
      // Primero quitamos el default de todas las direcciones
      const allAddresses = await this.getAddresses();
      await Promise.all(
        allAddresses.data.map(address => 
          this.updateAddress(address.id, { isDefault: false })
        )
      );
      
      // Luego marcamos la dirección especificada como default
      return await this.updateAddress(id, { isDefault: true });
    } catch (error) {
      console.error("Error en setDefaultAddress:", error);
      throw error;
    }
  }
}

export const addressService = new AddressService();
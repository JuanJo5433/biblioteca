import React, { useState, useEffect } from "react";
import { Button, Alert, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { addressService } from "@/services/address/addressService";

export function FetchAddress() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await addressService.getAddresses();
      setAddresses(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setAddressIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await addressService.deleteAddress(addressIdToDelete);
      fetchAddresses();
      setShowDeleteModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background-secondary rounded-xl shadow-elevation-1">
      {/* Modal de confirmación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <ModalHeader className="border-b border-border-light">
            Confirmar Eliminación
          </ModalHeader>
          <ModalBody>
            <p className="text-text-primary py-4">
              ¿Estás seguro de eliminar esta dirección? Esta acción no se puede deshacer.
            </p>
          </ModalBody>
          <ModalFooter className="border-t border-border-light">
            <div className="flex gap-2 justify-end">
              <Button
                variant="light"
                onClick={() => setShowDeleteModal(false)}
                className="text-text-secondary hover:bg-background-main"
              >
                Cancelar
              </Button>
              <Button
                color="error"
                onClick={handleDelete}
                className="bg-red-700 text-white hover:bg-error-dark"
              >
                Eliminar
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="flex flex-col gap-6">
        {error && <Alert color="error" title={error} />}

        {!loading && addresses.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Tus Direcciones
            </h3>
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 rounded-lg border border-border-light bg-background-main"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="font-medium">{address.street1}</p>
                    <p className="text-sm text-text-secondary">
                      {address.city}, {address.state}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {address.country} - {address.postalCode}
                    </p>
                    {address.phone && (
                      <p className="text-sm text-text-secondary">
                        Tel: {address.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-primary hover:bg-primary/10"
                    >
                      <FiEdit className="text-lg" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-error hover:bg-error/10"
                      onClick={() => handleDeleteConfirmation(address.id)}
                    >
                      <FiTrash className="text-lg" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado de carga */}
        {loading && (
          <div className="animate-pulse space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-background-secondary rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Sin direcciones */}
        {!loading && addresses.length === 0 && (
          <div className="text-center py-6">
            <p className="text-text-secondary">No hay direcciones registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}
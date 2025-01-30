import React, { useState } from "react";
import { AddressCreate } from "./addressCreate";
import { Button } from "@heroui/react";
import { FiPlus, FiX } from "react-icons/fi";
import { FetchAddress } from "./fetchAddress";

export function Address() {
  const [formCreateIsOpen, setFormCreateIsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState(null);

  const handleAddressCreated = (address) => {
    setNewAddress(address); // Actualizar el estado con la nueva dirección
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background-secondary rounded-xl shadow-elevation-1">
      <div className="flex flex-col gap-6">
        {formCreateIsOpen ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-light pb-4">
              <h2 className="text-xl font-semibold text-text-primary">
                Nueva Dirección
              </h2>
              <Button
                isIconOnly
                variant="light"
                className="text-error hover:bg-error/10"
                onClick={() => setFormCreateIsOpen(false)}
              >
                <FiX className="text-lg" />
              </Button>
            </div>
            <AddressCreate
              onSuccess={handleAddressCreated} // Pasar el manejador de éxito
              onCancel={() => setFormCreateIsOpen(false)}
            />
          </div>
        ) : (
          <Button
            variant="bordered"
            className="w-full border-2 border-dashed border-border-light hover:border-primary hover:text-primary hover:bg-primary/5"
            startContent={<FiPlus className="text-lg" />}
            onClick={() => setFormCreateIsOpen(true)}
          >
            Agregar Dirección
          </Button>
        )}
      </div>
      <div className="container py-8">
        <FetchAddress onAddressCreated={newAddress} />
      </div>
    </div>
  );
}
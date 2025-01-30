import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Profile } from "@/components/Account/Profile/profile";
import { Address } from "@/components/Account/Address/address";
import { Shopping } from "@/components/Account/Shopping/shopping";
import { Settings } from "@/components/Account/Settings/settings";
import { FiUser, FiMapPin, FiShoppingBag, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@heroui/react";

export default function Account() {
    const { logout } = useAuth();

    return (
        <div className=" bg-background-main py-20">
            <div className="container max-w-4xl">
                <Card className="shadow-elevation-2">
                    <CardBody className="p-6">
                        {/* Encabezado */}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-text-primary mb-2">
                                Mi Cuenta
                            </h1>
                            <p className="text-text-secondary">
                                Gestiona tu información personal y preferencias
                            </p>
                        </div>

                        {/* Tabs */}
                        <Tabs 
                            aria-label="Opciones de cuenta"
                            variant="bordered"
                            classNames={{
                                tabList: "w-full",
                                tab: "py-4",
                                cursor: "bg-background-secondary"
                            }}
                        >
                            <Tab
                                key="perfil"
                                title={
                                    <div className="flex items-center gap-2">
                                        <FiUser />
                                        Perfil
                                    </div>
                                }
                            >
                                <div className="p-4">
                                    <Profile />
                                </div>
                            </Tab>
                            
                            <Tab
                                key="direcciones"
                                title={
                                    <div className="flex items-center gap-2">
                                        <FiMapPin />
                                        Direcciones
                                    </div>
                                }
                            >
                                <div className="p-4">
                                    <Address />
                                </div>
                            </Tab>
                            
                            <Tab
                                key="compras"
                                title={
                                    <div className="flex items-center gap-2">
                                        <FiShoppingBag />
                                        Compras
                                    </div>
                                }
                            >
                                <div className="p-4">
                                    <Shopping />
                                </div>
                            </Tab>
                            
                            <Tab
                                key="ajustes"
                                title={
                                    <div className="flex items-center gap-2">
                                        <FiSettings />
                                        Ajustes
                                    </div>
                                }
                            >
                                <div className="p-4">
                                    <Settings />
                                </div>
                            </Tab>
                        </Tabs>

                        {/* Botón de salida */}
                        <div className="mt-8 border-t border-border-light pt-6 text-center">
                            <Button
                                variant="light"
                                className="text-error hover:bg-error/10"
                                onClick={logout}
                                startContent={<FiLogOut />}
                            >
                                Cerrar Sesión
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
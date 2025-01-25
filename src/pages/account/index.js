import React from "react";
import { Tabs, Tab, Card, CardBody, Alert } from "@heroui/react";
import { Profile } from "@/components/Account/Profile/profile";
import { Address } from "@/components/Account/Address/address";
import { Shopping } from "@/components/Account/Shopping/shopping";
import { Settings } from "@/components/Account/Settings/settings";
import { IoMdExit } from "react-icons/io";
import { useAuth } from "@/hooks/useAuth";

export default function Account() {

    const {  logout } = useAuth();
    

    return (
        <div className=" my-5 flex justify-center items-center">
            <div className=" shadow-medium rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-text-primary mb-4 text-center">
                    Mi Cuenta
                </h1>
                <h2 className="text-xl font-medium text-text-secondary mb-6">
                    Perfil de Usuario
                </h2>
                <p className="text-text-secondary mb-6">
                    Gestiona tu información personal y preferencias.
                </p>

                <div className="flex w-full flex-col mb-6">
                    <Tabs aria-label="Options">
                        <Tab key="perfil" title="Perfil">
                            <Card>
                                <CardBody className="bg-[#ffffff]">
                                    <Profile />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="direcciones" title="Direcciones">
                            <Card>
                                <CardBody className="bg-[#ffffff]">
                                    <Address />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="compras" title="Compras">
                            <Card>
                                <CardBody className="bg-[#ffffff]">
                                    <Shopping />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="ajustes" title="Ajustes">
                            <Card>
                                <CardBody className="bg-[#ffffff]">
                                    <Settings />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab
                            key="salir"
                            title={
                                <button
                                    onClick={() => logout()}
                                    className="flex items-center space-x-2"
                                >
                                    <IoMdExit />
                                    <span>Salir</span>
                                </button>
                            }
                        ></Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

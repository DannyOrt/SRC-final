// El hook nos va a devolver si se puede conectar o no a bluetooth, y si se puede, nos va a devolver las respuestas de las electrovalvulas

import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useTheme} from "next-themes";

const useBLR = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [conectedDevice, setConectedDevice] = useState(null);
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState("");
    const {systemTheme, theme} = useTheme()

    const checkBluetooth = async () => {
        try {
            // Solicitar permiso para activar bluetooth
            const devices = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });
            // Conectar con el dispositivo
            const server = await devices.gatt.connect();

            // Guardar el dispositivo conectado
            setConectedDevice({ device, server });

            setIsConnected(true);
            // Mensaje de que se ha conectado
            positiveMessage(devices);

            console.log(devices);
        } catch (error) {
            console.log(error);
            negativeMessage()
            setError("Error al conectar con el dispositivo");
        }
    }

    const handleDisconnect = async () => {
        try {
            if (conectedDevice) {
                // Desconecta el dispositivo Bluetooth
                await conectedDevice.server.disconnect();
                setConectedDevice(null);
                console.log('Dispositivo Bluetooth desconectado');
            }
        } catch (error) {
            console.error('Error al desconectar el dispositivo Bluetooth:', error);
        }
    };

    const positiveMessage = ({name}) => {
        toast.success(`Se ha conectado al dispositivo ${name}`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: theme === "dark" ? "dark" : "light"
        });
    };

    const negativeMessage = () => {
        toast.error("No se ha conectado ningun dispositivo", {
            position: toast.POSITION.TOP_RIGHT,
            theme: theme === "dark" ? "dark" : "light"
        });
    }

    useEffect(() => {
        if ("bluetooth" in navigator) {
            console.log("Este navegador soporta bluetooth");
        } else {
            console.log("Este navegador no soporta bluetooth")
            setError("Este navegador no soporta bluetooth");
        }
    }, [])

    return {isConnected, conectedDevice, responses, error, checkBluetooth, handleDisconnect}
}

export {useBLR}
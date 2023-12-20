// requerda que se tiene que dar un numero de electrovalvulas este tambien estara en la raspberry
// y es la sala en la que se conectara el socket para poder abrir y cerrar las electrovalvulas
// hay que hacer que recuerde el numero de electrovalvulas que se le dio para que no se
// tenga que estar poniendo cada vez que se entre a la pagina de inicio
// se guardara en el local storage
// hay que crear un banner para que se guarde por primera vez el numero de electrovalvulas

import {ValvesModal} from "@/components/ValvesModal";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {useValves} from "@/hooks/useValves";
import {useButtons} from "@/hooks/useButtons";
import {Nav} from "@/components/Nav";
import {useBLR} from "@/hooks/useBLR";
import {useTheme} from "next-themes";

export default function Home() {
    // Se revisa si en el local storage se encuentra el numero de electrovalvulas
    // si no se encuentra se muestra el modal para que se ingrese el numero de electrovalvulas
    const [showModal, setShowModal] = useState(false);
    const {responses} = useValves()
    const { disableCloseGas, handleCloseGas, disableOpenGas, handleOpenGas, disableCloseWater, handleCloseWater, disableOpenWater, handleOpenWater, disableCloseAll, handleCloseAll, disableOpenAll, handleOpenAll } = useButtons();
    const { isConnected, checkBluetooth, responses: responsesBLR, error, conectedDevice, handleDisconnect} = useBLR();
    const {theme} = useTheme()

    const closeModal = () => {
        setShowModal(false)
    }

    const setValves = (valves) => {
        try {
            localStorage.setItem("valves", valves);
            setShowModal(false);
            positiveMessage();
        } catch (e) {
            negativeMessage();
        }
    }

    const positiveMessage = () => {
        toast.success("Se ha guardado el No.", {
            position: toast.POSITION.TOP_RIGHT,
            theme: theme === "dark" ? "dark" : "light"
        });
    };

    const negativeMessage = () => {
        toast.error("Error al guardar al guardar el No.", {
            position: toast.POSITION.TOP_RIGHT,
            theme: theme === "dark" ? "dark" : "light"
        });
    }

    useEffect(() => {
        const valves = localStorage.getItem("valves");
        if (!valves) {
            setShowModal(true)
        }
    }, [])


    return (
        <Nav title={"Home"} setShowModal={setShowModal} error={error} isConnected={isConnected} checkBluetooth={checkBluetooth}>
            <div className={"flex flex-col items-center justify-center h-[38rem]"}>
                <span className={"w-11/12 flex text-center justify-center sm:w-1/2 gap-1"}>
                    <h1 className={"text-xl sm:text-3xl font-bold"}>Control de electrovalvulas</h1>
                    {isConnected ? "Bluetooth" : "Wifi"}: <span className={"font-bold"}>Valves</span>
                </span>
                <div className={"grid my-5 items-center grid-cols-2 sm:grid-cols-4 gap-6 sm:w-1/2 w-11/12"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-red-500" disabled={disableCloseGas} onClick={handleCloseGas}>
                        Cerrar Gas
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-red-500" disabled={disableOpenGas} onClick={handleOpenGas}>
                        Abrir Gas
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-red-500" disabled={disableCloseWater} onClick={handleCloseWater}>
                        Cerrar Agua
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-red-500" disabled={disableOpenWater} onClick={handleOpenWater}>
                        Abrir Agua
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 disabled:cursor-not-allowed disabled:bg-red-500" disabled={disableCloseAll} onClick={handleCloseAll}>
                        Cerrar Todos
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 disabled:cursor-not-allowed disabled:bg-red-500" disabled={disableOpenAll} onClick={handleOpenAll}>
                        Abrir Todos
                    </button>
                </div>
                {responses.map((response, index) => (
                    <div key={index}>
                        {response}
                    </div>
                ))}
            </div>
            {showModal && <ValvesModal closeModal={closeModal} setValves={setValves} />}
        </Nav>
    )
}



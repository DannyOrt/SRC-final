import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import {Tonggle} from "@/components/Tonggle";
import {useState} from "react";
import { GrConfigure } from "react-icons/gr";
import Head from "next/head";
import { MdBluetooth, MdBluetoothDisabled, MdBluetoothConnected } from "react-icons/md";
import {error} from "next/dist/build/output/log";
import {LastActivity} from "@/components/LastActivity";

export const Nav = ({children, setShowModal, title, isConnected, error, checkBluetooth, handleDisconnect}) => {
    const [open, setOpen] = useState(false);

    // hay que olvidar la valvula y configurar nueva
    const forgotValve = () => {
        // borrar el localstorage
        localStorage.removeItem('valves');
        setShowModal(true);
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="¡Bienvenidos al mundo de risas y caos de los Looney Tunes! Explora las travesuras de Bugs Bunny, Daffy Duck y más. Revive momentos clásicos, descubre curiosidades y celebra el legado de estos personajes icónicos de la animación." />
                <link rel="icon" href="/logo.ico" />
            </Head>
            <header className={"flex items-center justify-between px-4 w-full fixed bg-cyan-50 dark:bg-neutral-800"}>
                <div className={"max-lg:overflow-hidden max-md:max-w-[90vw] h-full flex justify-between items-center gap-5 py-2"}>
                    { open ? <AiOutlineClose onClick={() => setOpen(!open)} className={"text-3xl relative z-[2] transition-transform duration-[0.4s] ease-in-out text-cyan-500 sm:hidden"} /> : <GiHamburgerMenu onClick={() => setOpen(!open)} className={"text-3xl relative z-[2] transition-transform duration-[0.4s] ease-in-out text-cyan-500 sm:hidden"} /> }
                    <Link href={"/"} className={"text-5xl text-center text-cyan-300 dark:text-cyan-500"}>
                        App
                    </Link>
                </div>
                <div className={"text-3xl relative z-[2] transition-transform duration-[0.4s] ease-in-out text-cyan-500 max-sm:hidden"}>
                    <div className={"gap-5 flex"}>
                        { error === "Este navegador no soporta bluetooth" ? <MdBluetoothDisabled className={"text-red-500"} onClick={checkBluetooth} /> : isConnected ? <MdBluetoothConnected onClick={handleDisconnect} /> : <MdBluetooth className={"text-neutral-600"} onClick={checkBluetooth} /> }
                        <GrConfigure onClick={forgotValve} />
                        <Tonggle/>
                    </div>
                </div>
                <nav className={`w-3/4 sm:w-1/4 h-screen bg-white dark:bg-neutral-800 fixed top-0 left-0 z-[1] transition-transform duration-[0.4s] ease-in-out transform ${open ? 'translate-x-0' : '-translate-x-full'} mt-16`}>
                    <div className={"m-0 p-0"}>
                        <div className={"text-3xl text-cyan-500 flex justify-end items-end mx-5 py-20"}>
                            <div className={"flex flex-col items-end"}>
                                { error === "Este navegador no soporta bluetooth" ? <MdBluetoothDisabled className={"text-red-500 mb-5"} /> : isConnected ? <MdBluetoothConnected className={"mb-5"} /> : <MdBluetooth className={"text-neutral-600 mb-5"} /> }
                                <GrConfigure className={"mb-5"} onClick={forgotValve} />
                                <Tonggle/>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <LastActivity />
            {children}
        </>
    )
}
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {error} from "next/dist/build/output/log";

export const ValvesModal = ({ closeModal, setValves }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { valves } = data;
        setValves(valves);
    }




    return (
        <div tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full items-center justify-center flex">
            <div className="static left-0 top-0 z-[1055] block h-full w-full overflow-y-auto overflow-x-hidden outline-none" >
            <div
                className="pointer-events-none relative w-auto opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:my-7 min-[576px]:max-w-[500px]">
                <div
                    className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalComponentsLabel">
                            No. de serie electrovalvulas
                        </h5>
                        <button
                            type="button"
                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            aria-label="Close"
                            onClick={closeModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative flex-auto p-4">
                            <p className={"mb-5"}>
                                Parece que es la primera vez que entras a esta pagina, por favor ingresa el numero de electrovalvulas que tienes en tu sistema.
                            </p>
                            <div className="flex items-center border-b border-neutral-100 py-2">
                                {/* en este input se pude poner una regex de como seria el numero de serie */}
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-neutral-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text" placeholder="SRC-0001" aria-label="Full name" {...register("valves", {required: true})} />
                                { errors.valves && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                    className="font-medium">Error!</span> El campo es requerido</p>}
                            </div>
                        </div>
                        <div
                            className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 gap-5">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
                                Cerrar
                            </button>
                            <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
import {useNotification} from "@/hooks/useNotification";

export const LastActivity = () => {

    const { error, loading, notification } = useNotification()

    return (
        <div className={"text-gray-800 dark:text-neutral-300 flex items-center justify-center pt-20"}>
            {loading ? <p className={"text-2xl"}>Cargando...</p> : notification ? <p className={"text-2xl"}>Última actividad: {notification}</p> : <p className={"text-2xl"}>No hay actividad</p>}
        </div>
    )
}
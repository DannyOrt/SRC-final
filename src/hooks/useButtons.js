import {useEffect, useState} from "react";
import {useValves} from "@/hooks/useValves";

export const useButtons = () => {
    const [disableOpenGas, setDisableOpenGas] = useState(true);
    const [disableCloseGas, setDisableCloseGas] = useState(false);
    const [disableOpenWater, setDisableOpenWater] = useState(true);
    const [disableCloseWater, setDisableCloseWater] = useState(false);
    const [disableCloseAll, setDisableCloseAll] = useState(false);
    const [disableOpenAll, setDisableOpenAll] = useState(true);
    const { handleMessage } = useValves();

    const handleOpenGas = () => {
        handleMessage("OpenGas");
        setDisableOpenGas(true);
        setDisableCloseGas(false);
        setDisableCloseAll(true);
        setDisableOpenAll(true);
    }

    const handleCloseGas = () => {
        handleMessage("CloseGas");
        setDisableCloseGas(true);
        setDisableOpenGas(false);
        setDisableCloseAll(true);
        setDisableOpenAll(true);
    }

    const handleOpenWater = () => {
        handleMessage("OpenWater");
        setDisableOpenWater(true);
        setDisableCloseWater(false);
        setDisableCloseAll(true);
        setDisableOpenAll(true);
    }

    const handleCloseWater = () => {
        handleMessage("CloseWater");
        setDisableCloseWater(true);
        setDisableOpenWater(false);
        setDisableCloseAll(true);
        setDisableOpenAll(true);
    }

    const handleCloseAll = () => {
        handleMessage("CloseAll");
        setDisableCloseAll(true);
        setDisableOpenAll(false);
        setDisableOpenGas(false);
        setDisableCloseGas(true);
        setDisableOpenWater(false);
        setDisableCloseWater(true);
    }

    const handleOpenAll = () => {
        handleMessage("OpenAll");
        setDisableOpenAll(true);
        setDisableCloseAll(false);
        setDisableOpenGas(true);
        setDisableCloseGas(false);
        setDisableOpenWater(true);
        setDisableCloseWater(false);
    }

    useEffect(() => {
        if (disableOpenWater && disableOpenGas) {
            setDisableCloseAll(false);
        }
        if (disableCloseWater && disableCloseGas) {
            setDisableOpenAll(false);
        }

    }, [ disableOpenGas, disableOpenWater, disableCloseGas, disableCloseWater ])

    return {
        disableOpenGas,
        disableCloseGas,
        disableOpenWater,
        disableCloseWater,
        disableCloseAll,
        disableOpenAll,
        handleOpenGas,
        handleCloseGas,
        handleOpenWater,
        handleCloseWater,
        handleCloseAll,
        handleOpenAll,
    }
}
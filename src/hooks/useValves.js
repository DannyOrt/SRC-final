import {useEffect, useState} from "react";
import { io } from "socket.io-client";

const socket = io("https://pickled-capricious-chickadee.glitch.me/")

export const useValves = () => {
    const [responses, setResponses] = useState([]);
    const [noValves, setNoValves] = useState("none");

    const handleMessage = (message) => {
        socket.emit("message", noValves, message);
    }

    useEffect(() => {
        const valves = localStorage.getItem("valves");

        socket.emit("join", valves);
        setNoValves(valves);

        socket.on("message", (msg) => {
            setResponses(prevState => [...prevState, msg]);
        });

        return () => {
            socket.off("message");
            socket.off("join");
        }

    }, [])

    return {responses, handleMessage}
}
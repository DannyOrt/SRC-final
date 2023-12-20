import {useState} from "react";
import axios from "axios";

const useNotification = () => {
    const [notification, setNotification] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendNotification = (message) => {
        setNotification(message)
    }

    const sendError = (message) => {
        setError(message)
    }

    const clearNotification = () => {
        setNotification(null)
    }

    const clearError = () => {
        setError(null)
    }

    useState( async () => {
        try {
            const { response } = await axios.get('/api/sismo')
            setNotification(response.data)
        } catch (e) {
            sendError(e.message)
        }
    });

    return {
        notification,
        loading,
        error,
        sendNotification,
        sendError,
        clearNotification,
        clearError
    }
}

export { useNotification }
import {scrap} from "@/lib/scrap";

export default async function handler(req, res) {
    // Tomamos los datos del web scrappping
    const lastSismo = await scrap();

    // dummy de lastSismo
    /*const lastSismo = {
        date: "2023-11-28",
        time: "16:30:29",
        mag: "5.5",
        lat: "16.40°",
        lon: "-98.22°",
        loc: "20 KM AL NOROESTE DE PINOTEPA NACIONAL, OAXACA",
        prof: "2.4 KM"
    }*/

    // Filtramos los datos correspondientes al dia de hoy
    const today = new Date()
    const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const dataToday = lastSismo.date === todayString

    // Si no hay datos, regresamos un 404 y un mensaje
    if (!dataToday) {
        res.status(404).json({ message: 'No hay datos' })
        return
    }

    // Filtramos por los de magnitud mayor a 5
    const dataMagnitude = lastSismo.mag >= 3

    // Si no hay datos, regresamos un 404 y un mensaje
    if (!dataMagnitude) {
        res.status(404).json({ message: 'No hay datos' })
        return
    }

    // Filtramos si ocurrio en la hora actual
    const hour = today.getHours()
    const minute = today.getMinutes()
    const [cleanHour, cleanMinute] = lastSismo.time.split(":")

    // verificamos si la hora es la misma
    const dataHour = hour === parseInt(cleanHour)
    // verificamos si hay un rango de 2 minutos de diferencia
    const dataTime = dataHour && (minute - parseInt(cleanMinute) <= 2)

    // Si no hay datos, regresamos un 404 y un mensaje
    if (!dataTime) {
        res.status(404).json({ message: 'No hay datos' })
        return
    }

    // Regresamos los datos obtenidos
    res.status(200).json(lastSismo)
    return
}
export default function formatToDMYHM(dateISO) {
    const d = new Date(dateISO);
    const hour = d.getHours();
    const formatHour = hour >= 0 && hour <= 9 ? `0${hour}` : hour;
    const minutes = d.getMinutes();
    const formatMinutes = minutes >= 0 && minutes <= 9 ? `0${minutes}` : minutes;
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${formatHour}:${formatMinutes}`;
}
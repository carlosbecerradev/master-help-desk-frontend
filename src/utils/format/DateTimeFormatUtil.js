export default function formatToDMYHM(dateISO) {
    const d = new Date(dateISO);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;
}
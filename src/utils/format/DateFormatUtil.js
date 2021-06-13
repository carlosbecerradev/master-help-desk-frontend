export default function formatToDMY(dateISO) {
    const d = new Date(dateISO);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}
import { format } from 'date-fns'

export function formatCustomDate(dateString, formatType = 'datetime') {
  const date = new Date(dateString);
  
  if (formatType === 'datetime') {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${adjustedHours}h-${minutes}mn-${seconds}s ${ampm}`;
    const formattedDate = format(date, 'dd/MM/yyyy');
    return `${formattedDate} : ${formattedTime} `;
  } else if (formatType === 'date') {
    return format(date, 'dd/MM/yyyy');
  } else {
    throw new Error('Invalid formatType specified. Use "date" or "datetime".');
  }
}
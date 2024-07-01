export function formatDate() {
    const date = new Date();
  
    // Get year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Create formatted date string in 'YYYY-MM-DD' format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export function getCurrTime(){
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        const currTime = `${hours}:${minutes}:${seconds}`;
      
        return currTime;
}

export const convertToLowerCase = (value) => {
    if (value) {
        value = value.trim().toLowerCase()
        return value
    }
    return ''
}

export const convertToPascalCase = (sentence) => {
    if(sentence && sentence?.length)
    return sentence
        .split(/ +/)
        .map(word => word[0]
            .toUpperCase()
            .concat(convertToLowerCase(word.slice(1))))
        .join(' ');
}
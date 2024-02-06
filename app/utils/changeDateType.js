
export default (date, type)  => {
    if(type === 1){
        return String(`${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()} ${new Date(date).getHours()}:${new Date(date).getMinutes()}`)
    }

    if(type === 2){
        const day = String(new Date(date)).split(' ')[0]
        return String(`${new Date(date).toDateString().split(' ')[1]} ${day}, ${new Date(date).getFullYear()}`)
    }

    if(type === 3){
        const day = String(new Date(date)).split(' ')[0]
        return String(`${day} ${new Date(date).toDateString().split(' ')[1]}, ${new Date(date).getFullYear()}`)
    }

    if(type === 4){
        const year = new Date().getFullYear()

        const currentDate = new Date(`${date.split('.')[1]}.${date.split('.')[0]}.${year}`)

        const day = String(currentDate.getDay())

        const time = String(currentDate).split(' ')[4]

        return String(`${currentDate.toDateString().split(' ')[1]} ${day}, ${currentDate.getFullYear()}, ${time}`)
    }

    if(type === 5){
        const year = new Date().getFullYear()
  
        const currentDate = new Date(`${date.split('.')[1]}.${date.split('.')[0]}.${year}`)

        const month = String(currentDate).split(' ')[1]
        const day = String(currentDate.getDay())
        
        return `${month} ${day > 10 ? day : `0${day}`}, ${year}`
    }

    if(type === 6){
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dayOfMonth = date.getDate();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        
        let dayFormatted;
        if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
            dayFormatted = dayOfMonth + 'st';
        } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
            dayFormatted = dayOfMonth + 'nd';
        } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
            dayFormatted = dayOfMonth + 'rd';
        } else {
            dayFormatted = dayOfMonth + 'th';
        }

        const formattedDate = `${dayFormatted} ${month}`;

        return formattedDate
    }

    return String(`${new Date(date).toDateString().split(' ')[1]} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`)
}
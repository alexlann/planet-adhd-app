export const getHourMinuteFromDate = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'});
}

export const toLongDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {weekday: "short", day: "numeric", month: "short"});
}

export const goToHour = (time: string, hour: number, dateObject?: boolean) => {
    const newTime = new Date(new Date(time).setHours(hour, 0, 0));
    return dateObject ? newTime : newTime.toISOString();
}
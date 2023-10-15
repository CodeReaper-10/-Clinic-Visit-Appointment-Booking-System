export class ServiceTime {
    id: number;
    startDay: string;
    endDay: string;
    startTime: string;
    endTime: string;
    formattedStartTime: string;
    formattedEndTime: string;

    constructor(id: number, startDay: string, endDay: string, startTime: string, endTime: string) {
        this.id = id;
        this.startDay = startDay;
        this.endDay = endDay;
        this.startTime = startTime;
        this.endTime = endTime;
        this.formattedStartTime = this.formatTime(startTime);
        this.formattedEndTime = this.formatTime(endTime);
    }

    formatTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':');
        const suffix = +hours >= 12 ? 'PM' : 'AM';
        const formattedHours = ((+hours % 12) || 12).toString();
        return `${formattedHours}:${minutes} ${suffix}`;
    }
}
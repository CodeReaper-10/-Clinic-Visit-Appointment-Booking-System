import { ServiceTime } from "./service-time.model";

export class ClinicDetails {
    id: number;
    clinicName: string;
    address: string;
    serviceTime: ServiceTime;

    constructor(id: number, clinicName: string, address: string, serviceTime: ServiceTime) {
        this.id = id;
        this.clinicName = clinicName;
        this.address = address;
        this.serviceTime = serviceTime;
    }
}
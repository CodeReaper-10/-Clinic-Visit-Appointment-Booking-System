import { ClinicDetails } from "./clinic-details.model";
import { ServiceDetails } from "./service-details.model";

export class Appointment {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    serviceDetails: ServiceDetails;
    clinicDetails: ClinicDetails;
    status: string;

    constructor(username: string, firstName: string, lastName: string, serviceDetails: ServiceDetails, clinicDetails: ClinicDetails, status: string, id?: number) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.serviceDetails = serviceDetails;
        this.clinicDetails = clinicDetails;
        this.status = status;
    }
}
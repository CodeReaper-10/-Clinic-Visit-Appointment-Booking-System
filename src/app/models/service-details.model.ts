export class ServiceDetails {
    id: number;
    serviceName: string;
    description: string;
    imageUrl: string;
    
    constructor(id: number, serviceName: string, description: string, imageUrl: string) {
        this.id = id;
        this.serviceName = serviceName;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
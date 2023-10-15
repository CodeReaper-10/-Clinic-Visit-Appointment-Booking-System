export class PatientDetails {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    dob: string;
    gender: string;

    constructor(firstName: string, lastName: string, username: string, password: string, email: string, dob: string, gender: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
    }
}
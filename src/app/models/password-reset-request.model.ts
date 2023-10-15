export class PasswordResetRequest {
    username: string;
    password: string;
    otp: number;

    constructor(username: string, password: string, otp: number) {
        this.username = username;
        this.password = password;
        this.otp = otp;
    }
}
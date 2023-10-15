export class JwtResponse {
    jwtToken: string;
    username: string;
    issueTime: number;
    expirationTime: number;
    
    constructor(jwtToken: string, username: string, issueTime: number, expirationTime: number) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.issueTime = issueTime;
        this.expirationTime = expirationTime;
    }
}
export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public birthday: Date;
    public city: string;
    public country: string;

    constructor(id: number, firstName: string, lastName: string, birthday: Date, city: string, country: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.city = city;
        this.country = country;
    }
}

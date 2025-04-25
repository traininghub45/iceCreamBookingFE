// booking.model.ts
export interface User {
    id?: number;
    userName?: string;
    fullName?:string;
    email?:string;
    password? :string;
    creationDate? : Date;
    createdBy? : string;
    phoneNumber? : number;
    userImgProfile: string | ArrayBuffer | null;
  }
  
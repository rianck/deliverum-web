export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: Date;
  email: string;
  phonenumber: string;
  jobPosition: string;
  startDate?: Date;
  photoUrl?: string;
}
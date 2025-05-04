
export interface Admin {
    name: string
    email: string
    password: string
    role: string
    place: string
    phoneNumber: string
}


export interface Request {
    petName: string;
    ownerName: string;
    phoneNumber: string;
    date: string;
    time: string;
    specialInstructions: string;
    place: string;
    serviceEmail: string;
    serviceType: string;
    status: string;
    ownerEmail: string;
  }
  
export interface VisitInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  time: string;
  description: string;
  phone: string | null;
  client: ClientInterface | null;
}

export interface ClientInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  about: string | null;
  email: string | null;
  phone: string | null;
}

export interface VehicleInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  brand: string;
  model: string;
  year: number;
  additionalInfo: string | null;
  licensePlate: string;
  engine: string;
  owner: ClientInterface;
}

import { VisitInterface } from "@/common/types/entities.types";

export type GetAllVisitsResponseType = VisitInterface[];

export type CreateVisitResponseType = VisitInterface;

interface CreateVisitBodyInterface {
  date: Date;
  time: string;
  description?: string | null;
  phone?: string | null;
  clientId?: string | null;
}

export interface CreateVisitArgumentsInterface {
  body: CreateVisitBodyInterface;
}

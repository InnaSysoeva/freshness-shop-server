import { Request } from "express";

export interface AuhtRequest extends Request {
  headers: {
    authorization?: string;
  };
}

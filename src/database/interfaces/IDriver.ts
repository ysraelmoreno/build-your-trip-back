import { Client } from "pg";

export interface IDriverConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  type: string;
  database: string;
  name: string;
}

export interface IDriver {
  query: (query: string, values: any[]) => Promise<any[]>;
}

export interface IQueryResult {
  command: string;
  rowCount: number;
  oid: number | null;
  rows: unknown[];
}

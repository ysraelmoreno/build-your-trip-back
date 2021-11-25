import { Client } from "pg";
import makeConnection from "./connection/makeConnection";

console.log("Starting database");

makeConnection({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "build_your_trip",
  type: "postgres",
  name: "default",
});

const databaseClient = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "build_your_trip",
});

databaseClient.connect();

export async function query(query: string, values: any[] = []): Promise<any[]> {
  const { rows } = await databaseClient.query(query, values);

  return rows;
}

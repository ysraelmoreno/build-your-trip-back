import makeConnection from "./connection/makeConnection";
import "dotenv/config";

console.log("Starting database");

makeConnection({
  host: process.env.BYT_HOST || "localhost",
  port: Number(process.env.BYT_PORT) || 5432,
  user: process.env.BYT_USER || "root",
  password: process.env.BYT_PASSWORD || "root",
  database: process.env.BYT_DATABASE || "build_your_trip",
  type: "postgres",
  name: "default",
});

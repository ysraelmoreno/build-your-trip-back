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

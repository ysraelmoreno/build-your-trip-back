import { IDriverConfig } from "@databaseInterfaces/IDriver";
import Connection from ".";

async function makeConnection({
  host,
  port,
  user,
  password,
  database,
  type,
  name,
}: IDriverConfig) {
  const connection = new Connection({
    host,
    port,
    user,
    password,
    database,
    type,
    name,
  });

  return connection;
}

export default makeConnection;

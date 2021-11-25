import InstanceManager from "@database/InstanceManager";
import { IDriverConfig, IQueryResult } from "@databaseInterfaces/IDriver";
import { Client as PostgresClient } from "pg";

class Driver {
  protected name: string;
  protected host: string;
  protected port: number;
  protected user: string;
  protected password: string;
  protected database: string;
  protected type: string;
  protected databaseDriver: PostgresClient;
  protected databaseInstance: any;

  constructor({
    host,
    port,
    user,
    password,
    database,
    type,
    name,
  }: IDriverConfig) {
    this.name = name;
    this.host = host;
    this.port = port;
    this.user = user;
    this.type = type;
    this.password = password;
    this.database = database;

    console.log(`[${this.name}] Connecting to database...`);

    (async () => {
      this.databaseInstance = await this.createDriverInstance();
    })();

    if (this.databaseInstance) {
      console.log(`[${this.name}] Connected to database!`);
    }

    return this.databaseInstance;
  }

  async query(query: string, params: unknown[] = []) {
    const { rows } = await this.databaseInstance.query(query, params);

    return rows;
  }

  protected async createDriverInstance(): Promise<PostgresClient> {
    this.databaseDriver = this.getDriver({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
      type: this.type,
      name: this.name,
    });

    await this.databaseDriver.connect();

    return this.databaseDriver;
  }

  protected getDriver(config: IDriverConfig): PostgresClient {
    switch (this.type) {
      case "postgres":
        return new PostgresClient(config);
      default:
        return new PostgresClient(config);
    }
  }
}

export default Driver;

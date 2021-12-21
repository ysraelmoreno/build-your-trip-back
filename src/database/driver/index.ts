import { IDriverConfig } from "@databaseInterfaces/IDriver";
import { Client as PostgresClient } from "pg";

class Driver {
  protected name: string;
  protected host: string;
  protected port: number;
  protected user: string;
  protected password: string;
  protected database: string;
  protected typeName: string;
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
    this.typeName = `${this.type} - ${this.constructDatabaseName(
      this.database
    )}`;

    console.log(`[${this.typeName}] Connecting to database...`);

    (async () => {
      this.databaseInstance = await this.createDriverInstance();
      console.log(`[${this.typeName}] Connected to database!`);
    })();

    return this.databaseInstance;
  }

  private constructDatabaseName(name: string) {
    const identifyUnderline = /(?=_)/gm;
    const identifyCamelCase = /(?=[a-z][A-Z])/gm;

    if (identifyUnderline.test(name)) {
      return name
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    } else if (identifyCamelCase.test(name)) {
      return name
        .split(/(?=[A-Z])/)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    }
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
    const drivers = {
      postgres: new PostgresClient(config),
      default: new PostgresClient(config),
    };

    return drivers[this.type as "postgres" | "default"] || drivers.default;
  }
}

export default Driver;

import Driver from "@database/driver";
import InstanceManager from "@database/InstanceManager";
import { IDriverConfig } from "@databaseInterfaces/IDriver";

class Connection {
  protected driver: any;

  constructor(config: IDriverConfig) {
    this.driver = new Driver(config);

    InstanceManager.setInstance(config.name, this.driver);

    return this.driver;
  }

  public async query(query: string, params: unknown[] = []) {
    const { rows } = await this.driver.query(query, params);
    return rows;
  }
}

export default Connection;

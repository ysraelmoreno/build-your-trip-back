import GenericRepo from "./Generic.repo";
import {
  IFilter,
  IFind,
  IFindOne,
  IGenericValues,
  IRepository,
} from "@database/interfaces/IRepository";

import InstanceManager from "@database/InstanceManager";
class Repository<T> extends GenericRepo implements IRepository<T> {
  protected table: string;
  protected connectionInstance: any;

  constructor(table: string) {
    super();
    this.table = table;

    this.attachInstanceVerifier();
  }

  private attachInstanceVerifier() {
    const interval = setInterval(() => {
      if (!this.connectionInstance) {
        this.connectionInstance = InstanceManager.getInstance("default");
        return;
      }
      clearInterval(interval);
    }, 500);
  }

  public async filter({ where, select }: IFilter): Promise<T[]> {
    const whereString = this.constructWhereString(where);

    const rows: T[] = await this.connectionInstance.query(
      `SELECT ${select} FROM ${this.table} WHERE ${whereString}`,
      [...Object.values(where)]
    );

    return rows;
  }

  public async findOne({
    where,
    select = "*",
    joins = { table: "", on: {} },
  }: IFindOne): Promise<T | undefined> {
    const whereString = this.constructWhereString(where);
    const joinString = this.constructJoinString(joins.on);

    const canShowJoinString =
      joins.table !== ""
        ? `JOIN ${joins.table} ON ${joins.table}.${joinString}`
        : "";

    const [row] = await this.connectionInstance.query(
      `SELECT ${select} FROM ${this.table} ${canShowJoinString} WHERE ${whereString}`,
      [...Object.values(where)]
    );

    return row;
  }

  public async find({ options = { orderBy: "ASC" } }: IFind): Promise<T[]> {
    const rows: T[] = await this.connectionInstance.query(
      `SELECT * FROM ${this.table} ORDER BY ${options?.orderBy}`
    );

    return rows;
  }

  public async update(
    values: IGenericValues,
    where: IGenericValues
  ): Promise<T> {
    const [updateString, whereString] = this.constructUpdateString(
      values,
      where
    );

    const [row] = await this.connectionInstance.query(
      `UPDATE ${this.table} SET ${updateString} WHERE ${whereString} RETURNING *`,
      [...Object.values(values), ...Object.values(where)]
    );

    return row;
  }

  public async insert(values: IGenericValues): Promise<T> {
    const [insertIntoString, variablesToAttach] =
      this.constructInsertString(values);

    const [row] = await this.connectionInstance.query(
      `INSERT INTO ${this.table} (${insertIntoString}) VALUES (${variablesToAttach}) RETURNING *`,
      [...Object.values(values)]
    );

    return row;
  }
}

export default Repository;

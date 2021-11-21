import { query } from "@database/index";

import GenericRepo from "./Generic.repo";
import {
  IFilter,
  IFind,
  IFindOne,
  IGenericValues,
  IRepository,
} from "@database/interfaces/IRepository";

class Repository<T> extends GenericRepo implements IRepository<T> {
  protected table: string;

  constructor(table: string) {
    super();
    this.table = table;
  }

  public async filter({ where, select }: IFilter): Promise<T[]> {
    const whereString = this.constructWhereString(where);

    const rows: T[] = await query(
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

    const canShowJoinString = joins.table !== "";

    const [row] = await query(
      `SELECT ${select} FROM ${this.table} ${
        canShowJoinString
          ? `JOIN ${joins.table} ON ${joins.table}.${joinString}`
          : ""
      } WHERE ${whereString}`,
      [...Object.values(where)]
    );

    return row;
  }

  public async find({ options = { orderBy: "ASC" } }: IFind): Promise<T[]> {
    const rows: T[] = await query(
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

    const [row] = await query(
      `UPDATE ${this.table} SET ${updateString} WHERE ${whereString} RETURNING *`,
      [...Object.values(values), ...Object.values(where)]
    );

    return row;
  }

  public async insert(values: IGenericValues): Promise<T> {
    const [insertIntoString, variablesToAttach] =
      this.constructInsertString(values);

    const [row] = await query(
      `INSERT INTO ${this.table} (${insertIntoString}) VALUES (${variablesToAttach}) RETURNING *`,
      [...Object.values(values)]
    );

    return row;
  }
}

export default Repository;

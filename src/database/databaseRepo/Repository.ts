import { query } from "@database/index";
import { IUser } from "@appTypes/User";

import GenericRepo from "./Generic.repo";

interface ICreate {
  [key: string]: any;
}

interface IFindOne {
  select?: string;
  where: {
    [key: string]: any;
  };
}

interface IFind {
  options?: {
    orderBy?: string;
  };
}

class Repository<T> extends GenericRepo {
  constructor(table: string) {
    super(table);
  }

  public async findOne({
    where,
    select = "*",
  }: IFindOne): Promise<T | undefined> {
    const whereString = this.constructWhereString(where);

    const [row] = await query(
      `SELECT ${select} FROM ${this.table} WHERE ${whereString}`,
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

  public async insert(values: ICreate): Promise<T> {
    const [insertInto, variablesToAttach] = this.constructInsertString(values);

    const [row] = await query(
      `INSERT INTO ${this.table} (${insertInto}) VALUES (${variablesToAttach}) RETURNING *`,
      [...Object.values(values)]
    );

    return row;
  }
}

export default Repository;

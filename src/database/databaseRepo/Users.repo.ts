import { query } from "@database/index";
import { IUser } from "@appTypes/User";

import GenericRepo from "./Generic.repo";

interface IFindOne {
  select: string;
  where: {
    [key: string]: string;
  };
}

class UsersRepo extends GenericRepo {
  public async findOne({ where, select = "*" }: IFindOne): Promise<IUser[]> {
    const whereString = this.constructWhereString(where);

    const rows = await query(
      `SELECT ${select} FROM users WHERE ${whereString}`,
      [...Object.values(where)]
    );

    return rows;
  }

  public find() {
    const rows = query("SELECT * FROM users");

    return rows;
  }
}

export default new UsersRepo();

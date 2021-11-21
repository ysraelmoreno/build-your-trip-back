export interface IGenericValues {
  [key: string]: any;
}

export interface IFindOne {
  select?: string;
  joins?: {
    table: string;
    on: {
      [key: string]: any;
    };
  };
  where: {
    [key: string]: any;
  };
}

export interface IFind {
  options?: {
    orderBy?: "ASC" | "DESC";
  };
}

export interface IFilter {
  where: IGenericValues;
  select?: string;
}

export interface IRepository<T> {
  findOne({ where, select }: IFindOne): Promise<T | undefined>;
  find({ options }: IFind): Promise<T[]>;
  insert(data: IGenericValues): Promise<T>;
  update(values: IGenericValues, where: IGenericValues): Promise<T | undefined>;
  filter({ where, select }: IFilter): Promise<T[]>;
}

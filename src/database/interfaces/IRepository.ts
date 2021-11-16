export interface IGenericValues {
  [key: string]: any;
}

export interface IFindOne {
  select?: string;
  where: {
    [key: string]: any;
  };
}

export interface IFind {
  options?: {
    orderBy?: string;
  };
}

export interface IRepository<T> {
  findOne({ where, select }: IFindOne): Promise<T | undefined>;
  find({ options }: IFind): Promise<T[]>;
  insert(data: IGenericValues): Promise<T>;
  update(values: IGenericValues, where: IGenericValues): Promise<T | undefined>;
}

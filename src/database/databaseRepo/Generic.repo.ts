class GenericRepo {
  protected constructWhereString(where: { [key: string]: string }): string {
    let stringWhere = "";
    let accum = 0;

    [...Array(Object.keys(where).length)].forEach((_, index) => {
      if (Object.keys(where).length - 1 <= accum) {
        stringWhere += `${Object.keys(where)[accum]} = $${accum + 1}`;
        return;
      }

      stringWhere += `${Object.keys(where)[accum]} = $${accum + 1} AND `;
      accum++;
    });

    return stringWhere;
  }
}

export default GenericRepo;

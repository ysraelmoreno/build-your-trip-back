class GenericRepo {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  protected constructWhereString(where: { [key: string]: string }): string {
    let stringWhere = "";

    [...Array(Object.keys(where).length)].forEach((_, index) => {
      if (Object.keys(where).length - 1 <= index) {
        stringWhere += `${Object.keys(where)[index]} = $${index + 1}`;
        return;
      }

      stringWhere += `${Object.keys(where)[index]} = $${index + 1} AND `;
    });

    return stringWhere;
  }

  protected constructInsertString(into: { [key: string]: string }) {
    let stringInsert = "";
    let attachVariable = "";

    [...Array(Object.keys(into).length)].forEach((_, index) => {
      if (Object.keys(into).length - 1 <= index) {
        stringInsert += `${Object.keys(into)[index]}`;
        attachVariable += `$${index + 1}`;
        return;
      }

      stringInsert += `${Object.keys(into)[index]}, `;
      attachVariable += `$${index + 1}, `;
    });

    return [stringInsert, attachVariable];
  }
}

export default GenericRepo;

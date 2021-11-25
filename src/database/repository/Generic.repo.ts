import { GenericObject } from "@databaseInterfaces/IGenericRepo";

abstract class GenericRepo {
  protected constructWhereString(where: GenericObject): string {
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

  protected constructUpdateString(
    update: GenericObject,
    where: GenericObject
  ): string[] {
    let stringUpdate = "";
    let accumulattor = 0;

    [...Array(Object.keys(update).length)].forEach((_, index) => {
      if (Object.keys(update).length - 1 <= index) {
        stringUpdate += `${Object.keys(update)[index]} = $${index + 1}`;
        accumulattor++;
        return;
      }

      stringUpdate += `${Object.keys(update)[index]} = $${index + 1}, `;
      accumulattor++;
    });

    const stringWhere = this.constructUpdateWhereString(where, accumulattor);

    return [stringUpdate, stringWhere];
  }

  protected constructUpdateWhereString(
    where: GenericObject,
    indexAccumulatted: number
  ): string {
    let stringWhere = "";

    [...Array(Object.keys(where).length)].forEach((_, index) => {
      if (Object.keys(where).length - 1 <= index) {
        indexAccumulatted++;
        stringWhere += `${Object.keys(where)[index]} = $${indexAccumulatted}`;
        return;
      }
      indexAccumulatted++;

      stringWhere += `${
        Object.keys(where)[index]
      } = $${indexAccumulatted} AND `;
    });

    return stringWhere;
  }

  protected constructJoinString(on: GenericObject): string {
    let stringJoin = "";

    [...Array(Object.keys(on).length)].forEach((_, index) => {
      stringJoin += `${Object.keys(on)[index]} = ${Object.values(on)[index]}`;
    });

    return stringJoin;
  }

  protected constructInsertString(into: GenericObject): string[] {
    let attachVariable = "";

    [...Array(Object.keys(into).length)].forEach((_, index) => {
      if (Object.keys(into).length - 1 <= index) {
        attachVariable += `$${index + 1}`;
        return;
      }

      attachVariable += `$${index + 1}, `;
    });

    const stringInsert = Object.keys(into).toString().toLowerCase();

    return [stringInsert, attachVariable];
  }
}

export default GenericRepo;

import Repository from "@database/repository/Repository";

function getRepository<T>(table: string) {
  return new Repository<T>(table);
}

export default getRepository;

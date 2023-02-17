import Dexie, { Table } from "dexie";

import db, { Entity } from "../config/db";
import { useQuery } from "@tanstack/react-query";

export const useTableQuery = <T extends Entity>(table: Table<T, number>) => {
  const { data, error, isLoading } = useQuery<T[], Error>({
    queryKey: [table.name],
    queryFn: async () => {
      return table.toArray();
    },
  });

  return { data, error, isLoading };
};

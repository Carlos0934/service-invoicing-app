import { Table } from "dexie";
import { Entity } from "../config/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTableUpsert = <T extends Entity>(table: Table<T, number>) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, error } = useMutation<T, Error, T>({
    mutationFn: async (entity) => {
      if (entity.id) {
        await table.update(entity.id, entity);
      } else {
        await table.add(entity);
      }
      return entity;
    },
    onSuccess: (entity) => {
      queryClient.invalidateQueries([table.name]);
    },
  });

  return { upsert: mutateAsync, isLoading, error };
};

export const useTableDelete = <T extends Entity>(table: Table<T, number>) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, error } = useMutation<number, Error, number>({
    mutationFn: async (id) => {
      await table.delete(id);
      return id;
    },

    onSuccess: (id) => {
      queryClient.invalidateQueries([table.name]);
    },
  });

  return { delete: mutateAsync, isLoading, error };
};

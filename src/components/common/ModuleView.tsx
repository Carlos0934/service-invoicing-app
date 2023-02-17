import { Tab } from "@headlessui/react";
import classNames from "classnames";
import db, { Entity, Invoice } from "../../config/db";
import { useTableQuery } from "../../hooks/useTableQuery";
import { ask } from "@tauri-apps/api/dialog";
import { Column, Table } from "../common/Table";
import { TabView } from "../common/TabView";
import { z } from "zod";
import { ZodSchema } from "zod/lib";
import { Form } from "../common/Form";
import { useState } from "react";
import { TextInput } from "../inputs/TextInput";
import { AutoCompleteInput } from "../inputs/AutocompleteInput";
import { useTableDelete, useTableUpsert } from "../../hooks/useTableUpsert";
import { Formatter } from "../../utils/formatter";
import { Table as DexieTable } from "dexie";
import { DeepPartial } from "react-hook-form";

interface Props<T> {
  title: string;
  schema: ZodSchema<T>;
  defaultValues: T;
  getFormTitle: (data: T) => string;
  children: React.ReactNode;
  table: DexieTable<T, number>;
  columns: Column<T>[];
}
export const ModuleView = <T extends Entity>({
  table,
  title,
  schema,
  getFormTitle,
  defaultValues,
  children,
  columns: newColumns,
}: Props<T>) => {
  const [selectedRow, setSelectedRow] = useState(defaultValues);
  const { data } = useTableQuery(table);
  const { upsert } = useTableUpsert(table);
  const { delete: deleteEntity } = useTableDelete(table);
  const [tab, setTab] = useState(0);
  const columns: Column<T>[] = [
    {
      header: "ID",
      className: "tracking-wider",
      getter: (item) => Formatter.formatCode(item.id || 0),
    },
    ...newColumns,

    {
      header: "",
      cell: (item) => (
        <div className="flex justify-end ">
          <button
            onClick={() => {
              setSelectedRow(item);
              setTab(1);
            }}
            className="btn"
          >
            Editar
          </button>

          <button
            onClick={async () => {
              const ok = await ask("¿Está seguro de eliminar este registro?");
              console.log(ok);
              if (!ok || !item.id) return;

              await deleteEntity(item.id);
            }}
            className="btn text-red-400"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <TabView
      title={title}
      tab={tab}
      setTab={setTab}
      tabs={[
        {
          name: "Todos",
          component: <Table data={data} columns={columns} />,
        },
        {
          name: "Formulario",
          component: (
            <Form
              title={getFormTitle(selectedRow)}
              schema={schema}
              values={selectedRow}
              onSubmit={async (data) => {
                await upsert(data);
              }}
            >
              <div className="grid grid-cols-3 gap-5">{children}</div>
            </Form>
          ),
        },
      ]}
    />
  );
};

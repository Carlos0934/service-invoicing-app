import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

export interface AutoCompleteProps<T> {
  data: T[];
  onChange: (value: T | null) => void;
  onQueryChange: (query: string) => void;

  value?: T | null;
  query: string;
  getLabel: (value: T) => string;
  placeholder?: string;
  className?: string;
  filter?: (value: T) => boolean;
}

export function AutoComplete<T>({
  data,
  getLabel,
  onChange,
  value,
  placeholder,
  className,
  filter,
  onQueryChange: onChangeQuery,
  query,
}: AutoCompleteProps<T>) {
  const options = useMemo(
    () =>
      data.map((item) => ({
        value: item,
        label: getLabel(item),
      })),
    [data, getLabel]
  );

  const filteredItem = options.filter((item) => {
    if (filter) {
      return filter(item.value);
    }
    if (query == "") return true;
    return item.label.toLowerCase().includes(query.toLowerCase());
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query == "") {
      onChange(null);
      onChangeQuery("");
    }
  };

  return (
    <div className={classNames("flex flex-col relative", className)}>
      <Combobox
        value={value}
        onChange={(value) => {
          onChangeQuery(value ? getLabel(value) : "");
          onChange(value);
        }}
      >
        <Combobox.Input
          onChange={(event) => onChangeQuery(event.target.value)}
          className={"control-input"}
          value={query}
          autoComplete="off"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />

        <Combobox.Options className="  w-full   mt-1 absolute top-10 z-10 max-h-[30vh] overflow-y-scroll ">
          {filteredItem.map((option, i) => (
            <Combobox.Option
              key={i}
              value={option.value}
              className={classNames(
                " cursor-pointer w-full    px-2 py-1 font-semibold transition duration-200 rounded-sm ",
                {
                  "text-secondary bg-primary ": value == option.value,
                  "text-muted hover:text-gray-500 hover:bg-gray-200 bg-gray-50 ":
                    value != option.value,
                }
              )}
            >
              {option.label}
            </Combobox.Option>
          ))}
          {options.length == 0 && (
            <div className="text-muted text-sm px-2 text-center  py-2 font-semibold   bg-gray-50">
              Results not found for "{query}"
            </div>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

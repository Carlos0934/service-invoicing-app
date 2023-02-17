import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useMemo } from "react";

export interface AutoCompleteProps<T> {
  options?: {
    value: T;
    label: string;
  }[];
  onChange: (value: T | null) => void;
  onQueryChange: (query: string) => void;

  value?: T | null;
  query: string;

  placeholder?: string;
  className?: string;
  filter?: (value: T) => boolean;
}

export function AutoComplete<T>({
  options = [],

  onChange,
  value,
  placeholder,
  className,
  filter,
  onQueryChange: onChangeQuery,
  query,
}: AutoCompleteProps<T>) {
  const filteredItem = options.filter((item) => {
    if (filter) {
      return filter(item.value);
    }
    if (query == "") return true;
    return item.label?.toLowerCase().includes(query?.toLowerCase());
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query == "") {
      onChange(null);
      onChangeQuery("");
    }
  };
  const getLabel = (value: T) => {
    const item = options.find((item) => item.value == value);
    if (item) {
      return item.label;
    }
    return "";
  };

  const handleSelect = (value: T | null) => {
    onChange(value);
    if (value) onChangeQuery(getLabel(value));
    else onChangeQuery("");
  };
  console.log(value);
  return (
    <div className={classNames(" relative", className)}>
      <Combobox value={value} onChange={handleSelect}>
        <Combobox.Input
          onChange={(event) => onChangeQuery(event.target.value)}
          className={classNames("control-input")}
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
                  "": value == option.value,
                  " hover:text-gray-500 hover:bg-gray-200 bg-gray-50 ":
                    value != option.value,
                }
              )}
            >
              {option.label}
            </Combobox.Option>
          ))}
          {options.length == 0 && (
            <div className="text-gray-300 text-sm px-2 text-center  py-2 font-semibold   bg-gray-50">
              No hay resultados 🤷‍♂️
            </div>
          )}
        </Combobox.Options>
      </Combobox>

      {}
    </div>
  );
}

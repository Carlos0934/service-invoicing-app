import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AutoComplete } from "../common/Autocomplete";
interface AutoCompleteInputProps<T> {
  data: T[];
  getValue: (value: T) => unknown;
  label?: string;
  name: string;
  value?: T | null;
  getLabel: (value: T) => string;
  placeholder?: string;
  className?: string;
  filter?: (value: T) => boolean;
}

export function AutoCompleteInput<T>({
  label,
  name,
  getValue,
  ...props
}: AutoCompleteInputProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [query, setQuery] = useState("");

  const error = errors[name]?.message?.toString();

  return (
    <div className="control">
      {label && <label className="control-label">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <AutoComplete
            {...props}
            onChange={(value) => {
              if (value) {
                field.onChange(getValue(value));
              } else {
                field.onChange(null);
              }
            }}
            onQueryChange={setQuery}
            query={query}
          />
        )}
      />
      {error && <p className="control-error">{error}</p>}
    </div>
  );
}

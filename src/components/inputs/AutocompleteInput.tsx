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
    watch,
    formState: { errors },
  } = useFormContext();

  const [query, setQuery] = useState("");
  const internalValue = watch(name);
  const error = errors[name]?.message?.toString();
  useEffect(() => {
    if (internalValue && query == "") {
      const value = props.data.find((item) => getValue(item) === internalValue);
      if (value) {
        setQuery(props.getLabel(value));
      }
    }
  }, [internalValue, props.data]);
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

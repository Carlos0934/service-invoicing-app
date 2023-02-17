import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AutoComplete } from "../common/Autocomplete";

interface AutoCompleteInputProps<T> {
  label?: string;
  name: string;
  value?: T | null;
  options?: {
    value: T;
    label: string;
  }[];

  placeholder?: string;
  className?: string;
  filter?: (value: T) => boolean;
}

export function AutoCompleteInput<T>({
  label,
  name,

  ...props
}: AutoCompleteInputProps<T>) {
  const {
    control,

    watch,
    formState: { errors, isSubmitted, isSubmitting },
  } = useFormContext();

  const [query, setQuery] = useState("");

  const error = errors[name]?.message?.toString();

  useEffect(() => {
    if (isSubmitted && !isSubmitting) {
      setQuery("");
    }
  }, [isSubmitted, isSubmitting]);

  return (
    <div className="control">
      <label className="control-label">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <AutoComplete
            {...props}
            value={field.value}
            onChange={(value) => {
              if (value) {
              } else {
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

import { useForm, DeepPartial, FormProvider } from "react-hook-form";
import { Entity } from "../../config/db";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props<T> {
  schema: ZodSchema<T>;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: DeepPartial<T>;
  values?: T;
  children: React.ReactNode;
  title?: string;
}

export const Form = <T extends Entity>({
  schema,
  values,
  defaultValues,
  onSubmit,
  children,
  title,
}: Props<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    values,
    defaultValues,
  });
  const handleSubmit = async (data: T) => {
    await onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex flex-col h-[70vh] bg-white rounded shadow px-4 py-5 overflow-y-auto"
      >
        <h3 className="text-xl ">{title}</h3>

        <div className="h-full px-4 mt-2">{children}</div>

        <button
          disabled={methods.formState.isSubmitting}
          className="btn bg-blue-400 sticky bottom-0  text-gray-100 hover:bg-blue-500 transition w-full max-w-sm mx-auto mt-4  disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {methods.formState.isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </FormProvider>
  );
};

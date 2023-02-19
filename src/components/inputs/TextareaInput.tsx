import { useId } from "react";
import { useFormContext } from "react-hook-form";
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

export const TextareaInput = ({ label, name, ...props }: Props) => {
  const { register, formState } = useFormContext();
  const id = useId();
  const error = formState.errors[name]?.message?.toString();

  return (
    <div className="control">
      {label && (
        <label className="control-label" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className="control-input"
        id={id}
        {...register(name)}
        {...props}
      />
      {error && <p className="control-error">{error}</p>}
    </div>
  );
};

import { forwardRef, ComponentProps } from "react";

type Options = {
  value: string | number;
  text: string;
};
type Props = ComponentProps<"select"> & {
  label?: string;
  error?: string;
  name: string;
  status: Options[];
  type?: HTMLSelectElement;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, status, ...rest }, ref) => {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <select
          {...rest}
          ref={ref}
          className="rounded-md border border-gray-300 px-3 py-2 item-center justify-center mb-9"
        >
          <option value="">Escolha um status</option>
          {status.map(({ value, text }) => (
            <option value={value}>{text}</option>
          ))}
        </select>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }
);

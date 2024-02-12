import {
  forwardRef,
  type ComponentProps,
  type HTMLInputTypeAttribute,
} from "react";

type Props = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          {label}
        </label>
        <input
          className="bg-light-50 border border-light-300 text-light-900 text-sm rounded-lg focus:ring-light-500 focus:border-light-500 block w-full p-2.5 light:bg-light-700 dark:border-light-600 light:placeholder-light-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
          {...rest}
          ref={ref}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

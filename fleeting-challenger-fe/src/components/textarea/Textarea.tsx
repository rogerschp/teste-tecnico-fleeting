import { forwardRef, type ComponentProps } from "react";

type Props = ComponentProps<"textarea"> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          {label}
        </label>
        <textarea
          {...rest}
          ref={ref}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

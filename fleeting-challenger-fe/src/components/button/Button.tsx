import { forwardRef, type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  disabled?: boolean;
  type?: string;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ disabled, ...rest }, ref) => {
    return (
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          {...rest}
        ></button>
      </div>
    );
  }
);

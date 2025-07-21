import { ChangeEvent, FC, useId } from "react";

import { clsx } from "clsx";

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  labelMessage?: string;
  messageText?: string;
  status?: "default" | "success" | "error";
  disabled?: boolean;
}

export const RadioButton: FC<Props> = ({
  name,
  value,
  onChange,
  checked = false,
  labelMessage,
  messageText,
  status = "default",
  disabled = false,
}) => {
  const id = useId();

  const isError = status === "error";
  const isSuccess = status === "success";

  return (
    <div>
      <label
        htmlFor={id}
        className={clsx(
          "flex items-center gap-2 select-none",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          className="peer hidden"
        />

        <div
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-full border-1 transition-colors",
            disabled ? "bg-neutral-100" : "bg-neutral-50",
            !disabled &&
              clsx(
                isError
                  ? "border-error-main"
                  : isSuccess
                    ? "border-success-main"
                    : checked
                      ? "border-primary-100"
                      : "border-primary-100 hover:border-primary-300 active:border-primary-500 active:bg-primary-100 hover:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.4)] active:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]"
              )
          )}
        >
          <div
            className={clsx(
              "h-4 w-4 rounded-full transition-opacity",
              isError
                ? "bg-error-main opacity-100"
                : isSuccess
                  ? "bg-success-main opacity-100"
                  : checked
                    ? "bg-primary-100 opacity-100"
                    : "opacity-0"
            )}
          />
        </div>

        {labelMessage && <span className="text-body">{labelMessage}</span>}
      </label>

      {messageText && (
        <span
          role={isError ? "alert" : "status"}
          className={clsx("text-micro2 mt-1 block", isError && "text-error-main", isSuccess && "text-success-main")}
        >
          {messageText}
        </span>
      )}
    </div>
  );
};

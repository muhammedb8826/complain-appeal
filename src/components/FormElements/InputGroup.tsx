"use client";

import { cn } from "@/lib/utils";

type FileStyleVariant = "style1" | "style2";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  active?: boolean;
  fileStyleVariant?: FileStyleVariant;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
}

export default function InputGroup({
  label,
  className,
  active,
  fileStyleVariant,
  type,
  icon,
  iconPosition = "left",
  height = "default",
  ...props
}: InputGroupProps) {
  const inputType = type ?? "text";

  return (
    <div className={className}>
      <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <div
        className={cn(
          "relative [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
          iconPosition === "left" ? "[&_svg]:left-4.5" : "[&_svg]:right-4.5",
        )}
      >
        <input
          type={inputType}
          className={cn(
            "w-full rounded border border-stroke bg-transparent outline-none transition focus:border-primary data-[active=true]:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:data-[active=true]:border-primary",
            inputType === "file"
              ? getFileStyles(fileStyleVariant)
              : "px-5",
            height === "sm" ? "py-2.5" : "py-3",
            icon && inputType !== "file" && iconPosition === "left" && "pl-12.5",
            icon && inputType !== "file" && iconPosition === "right" && "pr-12.5",
          )}
          data-active={active ? "true" : undefined}
          {...props} // ✅ forward props (value, onChange, name, etc.)
        />
        {icon}
      </div>
    </div>
  );
}

function getFileStyles(variant?: FileStyleVariant) {
  if (variant === "style2") {
    return "file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]";
  }

  // default to style1
  return "file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white";
}

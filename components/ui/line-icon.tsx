import type { ComponentProps } from "react";

type LineIconProps = {
  size?: number;
} & ComponentProps<"svg">;

export function LineIcon({ size = 24, ...props }: LineIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <rect width="40" height="40" rx="9" fill="#06C755" />
      <path
        d="M20 8.5C12.82 8.5 7 13.28 7 19.18c0 5.29 4.7 9.72 11.04 10.56.43.09 1.01.28 1.16.64.13.32.09.82.05 1.15l-.18 1.07c-.05.32-.26 1.26 1.1.69 1.36-.57 7.35-4.33 10.02-7.41C31.95 23.8 33 21.6 33 19.18 33 13.28 27.18 8.5 20 8.5z"
        fill="white"
      />
    </svg>
  );
}

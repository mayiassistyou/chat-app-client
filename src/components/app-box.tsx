import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AppBox(props: Props) {
  const { children, className } = props;

  return (
    <div
      className={clsx(
        "p-4 rounded-2xl bg-white w-full h-full overflow-y-auto overflow-x-hidden ",
        className && className
      )}
    >
      {children}
    </div>
  );
}

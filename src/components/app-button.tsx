import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  variant?: "white" | "primary";
  color?: "black" | "white";
}

export default function AppButton(props: Props) {
  const {
    children,
    type = "button",
    variant = "white",
    color = "black",
  } = props;
  return (
    <button
      type={type}
      className={clsx(
        `bg-${variant} text-${color}`,
        "w-full py-2 px-6 rounded-lg"
      )}
    >
      {children}
    </button>
  );
}

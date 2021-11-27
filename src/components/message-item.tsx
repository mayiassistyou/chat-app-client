import clsx from "clsx";

interface Props {
  text: string;
  isOwned?: boolean;
}

export default function MessageItem(props: Props) {
  const { text, isOwned } = props;

  return <div className={clsx("p-2", isOwned && "text-right")}>{text}</div>;
}

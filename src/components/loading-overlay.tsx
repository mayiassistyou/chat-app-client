import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  show: boolean;
}

export default function LoadingOverlay(props: Props) {
  const { show } = props;
  return (
    <div
      className={clsx(
        "w-full h-full bg-white opacity-70 fixed left-0 top-0 z-50",
        show ? "block" : "hidden"
      )}
    >
      <span className='relative h-full flex items-center justify-center'>
        <AiOutlineLoading3Quarters className='animate-spin w-24 h-24 text-primary' />
      </span>
    </div>
  );
}

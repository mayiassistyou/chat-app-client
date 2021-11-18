import React from "react";

interface Props {
  icon: React.ReactNode;
  placeholder: string;
}

export default function AppInput(props: Props) {
  const { icon, placeholder } = props;

  return (
    <div className='relative'>
      <input
        type='text'
        className='w-full border-none p-2 pl-10 rounded-2xl focus:border-primary placeholder-gray-dark placeholder-semibold font-semibold'
        placeholder={placeholder}
      />
      <div className='absolute left-3 top-3 w-full'>{icon}</div>
    </div>
  );
}

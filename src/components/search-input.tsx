import clsx from "clsx";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import AppInput from "./app-input";
import debounce from "debounce";
import { useState } from "react";
import userApi from "../api/user";

import defaultAvatar from "../assets/default.jpg";
import { IUser } from "../interface";

interface Props {
  onClick: (people: IUser) => void;
}

export default function SearchInput(props: Props) {
  const { onClick } = props;
  const { register, setValue } = useForm();

  const [keyword, setKeyword] = useState<string>("");
  const [peopleList, setPeopleList] = useState<IUser[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleSearchPeople = debounce(async (e: any) => {
    setKeyword(e.target.value);
    if (!e.target.value) {
      setIsShow(false);
      return;
    }

    try {
      const response = await userApi.searchUser(e.target.value);
      setPeopleList(response.data);
      setIsShow(true);
    } catch (error) {
      console.log(error);
    }
  }, 500);

  return (
    <>
      <div className='relative'>
        <AppInput
          icon={<BiSearch />}
          name='search'
          register={register}
          placeholder='Search'
          onChange={handleSearchPeople}
        />
        <div
          className={clsx(
            "absolute top-12 right-1 left-1 p-2 bg-white shadow-lg rounded-xl transition-transform",
            !isShow && "hidden"
          )}
        >
          {peopleList.length === 0 && (
            <>
              <div className='text-center text-lg mb-2'>Nothing found</div>
              <div className=' text-sm text-gray-500'>
                We couldn't find any matches for "{keyword}" Try checking for
                typos or using complete words.
              </div>
            </>
          )}
          {peopleList.map((people) => (
            <div
              key={people._id}
              className='flex px-4 py-2 justify-between items-center hover:bg-gray cursor-pointer rounded-xl'
              onClick={() => {
                onClick(people);
                setValue("search", "");
                setIsShow(false);
              }}
            >
              <div>
                <div className='font-medium'>{people.name}</div>
                <div className='text-xs text-gray-400'>@{people.username}</div>
              </div>
              <div className='h-8 w-8'>
                {people.avatar ? (
                  <img
                    src={people.avatar}
                    alt='avatar'
                    className='rounded-full'
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt='avatar'
                    className='rounded-full'
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

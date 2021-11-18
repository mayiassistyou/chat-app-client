import React from "react";
import AppInput from "../components/app-input";
import Layout from "../components/layout";
import { BiSearch } from "react-icons/bi";
import AppBox from "../components/app-box";
import PersonItem from "../components/person-item";

export default function MessagePage() {
  return (
    <Layout>
      <div className='px-4 h-full'>
        <div className='flex h-full justify-between'>
          {/* PERSON LIST */}
          <div className='w-96 flex flex-col mr-4'>
            <AppInput icon={<BiSearch />} placeholder='Search' />
            <AppBox className='mt-4 flex-1'>
              <h2 className='font-semibold text-xl'>Person</h2>
              <PersonItem hasSeen />
              <PersonItem numOfMes={1} />
              <PersonItem numOfMes={2} />
              <PersonItem hasSeen={false} />
            </AppBox>
          </div>

          {/* CHAT BOX */}
          <div className='h-full flex-1'>
            <AppBox>halo</AppBox>
          </div>
        </div>
      </div>
    </Layout>
  );
}

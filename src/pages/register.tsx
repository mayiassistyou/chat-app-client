import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AppButton from "../components/app-button";
import AppInput from "../components/app-input";
import Layout from "../components/layout";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Layout hasSidebar={false} box={false}>
      <div className='p-12'>
        <h1 className='mb-8 text-5xl font-semibold'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-96 mb-4'>
            <AppInput
              icon={<HiOutlineMail />}
              name='email'
              required
              register={register}
              placeholder='Email'
            />
          </div>
          <div className='w-96 mb-4'>
            <AppInput
              icon={<RiLockPasswordLine />}
              name='password'
              type='password'
              required={true}
              register={register}
              placeholder='Password'
            />
          </div>
          <div className='text-center my-8'>
            <AppButton type='submit' variant='primary' color='white'>
              Register
            </AppButton>
          </div>
          <div className='text-center'>
            Already have an account?
            <Link to='/' className='text-primary hover:text-primary-dark ml-1'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

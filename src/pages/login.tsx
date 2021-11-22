import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import authApi from "../api/auth";
import AppButton from "../components/app-button";
import AppInput from "../components/app-input";
import Layout from "../components/layout";
import { useUser } from "../contexts/user";

interface LoginInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { getUser } = useUser();

  const onSubmit = (data: LoginInput) => {
    const login = async () => {
      try {
        const response = await authApi.login(data.email, data.password);

        localStorage.setItem("token", response.data);
        getUser();
      } catch (error: any) {
        console.log(error.response.data.errorMsg);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.errorMsg,
        });
      }
    };
    login();
  };

  return (
    <Layout hasSidebar={false} box={false}>
      <div className='p-12'>
        <h1 className='mb-8 text-5xl font-semibold'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-96 mb-4'>
            <AppInput
              icon={<HiOutlineMail />}
              name='email'
              required
              register={register}
              placeholder='Email'
              errors={errors}
              errorLabel='Email is required!'
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
              errors={errors}
              errorLabel='Password is required!'
            />
          </div>
          <div className='text-center my-8'>
            <AppButton type='submit' variant='primary' color='white'>
              Login
            </AppButton>
          </div>
          <div className='text-center'>
            Don't have account?
            <Link
              to='/register'
              className='text-primary hover:text-primary-dark ml-1'
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

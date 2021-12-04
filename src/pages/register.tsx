import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import AppButton from "../components/app-button";
import AppInput from "../components/app-input";
import Layout from "../components/layout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Fullname is required!"),
    username: Yup.string()
      .required("Username is required!")
      .matches(
        /^(\@)?([a-z0-9_]{1,15})$/i,
        "Username cannot be longer than 15 characters, a-z, 0-9, _"
      ),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: Yup.string()
      .required("Confirm Passwod is required!")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  interface RegisterInput {
    name: string;
    username: string;
    password: string;
  }

  const onSubmit = (data: RegisterInput) => {
    const { name, username, password } = data;
    const register = async () => {
      try {
        await authApi.register(name, username, password);
        Swal.fire("Register successfully!!!");
        navigate("/");
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.errorMsg,
        });
      }
    };

    register();
  };

  return (
    <Layout hasSidebar={false} box={false}>
      <div className='p-12'>
        <h1 className='mb-8 text-5xl font-semibold'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-96 mb-4'>
            <AppInput
              icon={<MdDriveFileRenameOutline />}
              name='name'
              required={true}
              register={register}
              placeholder='Fullname'
              errors={errors}
              errorLabel={errors.name?.message}
            />
          </div>
          <div className='w-96 mb-4'>
            <AppInput
              icon={<FiUser />}
              name='username'
              required
              register={register}
              placeholder='Username'
              errors={errors}
              errorLabel={errors.username?.message}
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
              errorLabel={errors.password?.message}
            />
          </div>
          <div className='w-96 mb-4'>
            <AppInput
              icon={<RiLockPasswordLine />}
              name='confirm_password'
              type='password'
              required={true}
              register={register}
              placeholder='Confirm Password'
              errors={errors}
              errorLabel={errors.confirm_password?.message}
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

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { userService } from "../services";

export default Login;

function Login() {
  const router = useRouter();

  useEffect(() => {
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService
      .login(username, password)
      .then(() => {
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((error) => {
        setError("apiError", { message: error });
      });
  }

  return (
    <div className="login-container">
      <div className="login-top"></div>
      <div className="login-bottom"></div>
      <div className="login-center">
        <h4>AEC Dashboard</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-form-group">
            <input
              name="username"
              placeholder="Username"
              type="text"
              {...register("username")}
              className={`login-input ${
                errors.username ? "login-is-invalid" : ""
              }`}
            />
            <div className="login-invalid-feedback">
              {errors.username?.message}
            </div>
          </div>
          <div className="login-form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`login-input ${
                errors.password ? "login-is-invalid" : ""
              }`}
            />
            <div className="login-invalid-feedback">
              {errors.password?.message}
            </div>
          </div>
          <button disabled={formState.isSubmitting} className="login-btn ">
            {formState.isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Login
          </button>
          {errors.apiError && (
            <div className="alert alert-danger mt-3 mb-0">
              {errors.apiError?.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

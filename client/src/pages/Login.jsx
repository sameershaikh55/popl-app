import React, { Fragment, useEffect, useState } from "react";
import lock from "../assets/icons/lock.svg";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearErrors, forgetPassword } from "../redux/action/auth";
import SmallLoader from "../components/SmallLoader";
import { FORGOT_PASSWORD_RESET } from "../redux/type/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const userState = useSelector((state) => state.user);
  const forgetPasswordState = useSelector((state) => state.forgetPassword);

  const [forget, setForget] = useState(false);
  const [loginHandle, setLoginHandle] = useState({
    email: "",
    password: "",
    businessAccount: false,
  });

  const handleOptionChange = (e) => {
    setLoginHandle({
      ...loginHandle,
      businessAccount: e.target.value === "business",
    });
  };

  const handleChange = (e) => {
    setLoginHandle({ ...loginHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (forget) {
      dispatch(forgetPassword(loginHandle.email));
      return;
    }

    dispatch(login(loginHandle));
  };

  useEffect(() => {
    if (userState.error || forgetPasswordState.error) {
      userState.error && alert.error(userState.error);
      forgetPasswordState.error && alert.error(forgetPasswordState.error);
      dispatch(clearErrors());
    }

    if (forgetPasswordState.message) {
      alert.success("Email sent!");
      dispatch({ type: FORGOT_PASSWORD_RESET });
      setForget(false);
      setLoginHandle({
        email: "",
        password: "",
      });
    }

    if (userState.isAuthenticated) {
      alert.success("Login successfully");
    }
  }, [
    dispatch,
    alert,
    userState.error,
    userState.isAuthenticated,
    forgetPasswordState.error,
    forgetPasswordState.message,
  ]);

  return (
    <Fragment>
      <div className="login_container">
        <div className="login-left">
          <form onSubmit={submit} className="inner-left d-flex flex-column">
            <div>
              <p className="mt-3 f14"></p>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="opacity-50 fw600">
                  | {(forget && "Forget") || "Log in"}
                </h5>
                {forget && (
                  <div className="d-flex justify-content-start">
                    <div
                      onClick={() => setForget(false)}
                      className="bg-transparent text-start border-0 fw600 p-0 h-100 poinnter"
                    >
                      &#8592; Go back
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="accountType">Account Type</label>
                <div className="mt-1 d-flex gap-3">
                  <label className="d-flex gap-2">
                    <input
                      type="radio"
                      value="student"
                      checked={!loginHandle.businessAccount}
                      onChange={handleOptionChange}
                    />
                    Student
                  </label>
                  <label className="d-flex gap-2">
                    <input
                      type="radio"
                      value="business"
                      checked={loginHandle.businessAccount}
                      onChange={handleOptionChange}
                    />
                    Business
                  </label>
                </div>
              </div>

              <Input
                label="Email"
                name="email"
                value={loginHandle.email}
                onChange={(e) => handleChange(e)}
              />

              {!forget && (
                <div>
                  <Input
                    label="Password"
                    icon={lock}
                    name="password"
                    value={loginHandle.password}
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="d-flex justify-content-end">
                    <div
                      onClick={() => setForget(true)}
                      className="bg-transparent opacity-75 border-0 p-0 h-100 f14 pointer"
                    >
                      Forgot password?
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex flex-column">
                <button
                  disabled={
                    userState.loading || forgetPasswordState.loading
                      ? true
                      : false
                  }
                  type="submit"
                  className="rounded-pill btn-lg text-white border-0 w-100 text-center color1 py-1 fw-bold"
                >
                  {userState.loading || forgetPasswordState.loading ? (
                    <SmallLoader />
                  ) : (
                    (forget && "Submit") || "Log in"
                  )}
                </button>

                <div className="d-flex justify-content-center f14 gap-2">
                  <p className="opacity-75 p-0 h-100">New to Popl?</p>
                  <Link
                    to="/signup"
                    className="bg-transparent opacity-75 border-0 p-0 h-100 pointer text-primary"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>

            <p className="f14">@2022 - All rights reserved</p>
          </form>
        </div>

        <div className="login-right">
          <img
            className="w-100"
            src="https://dash.popl.co/assets/img/generals/onboardingasset.png"
            alt=""
          />
          <div className="trusted_by">
            <h5 className="fw600 mb-4 text-center">Trusted By</h5>
            <img
              className="w-100"
              src="https://dash.popl.co/assets/img/generals/trustedBy.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;

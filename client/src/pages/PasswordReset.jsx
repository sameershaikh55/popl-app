import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import lock from "../assets/icons/lock.svg";
import { clearErrors, resetPassword } from "../redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SmallLoader from "../components/SmallLoader";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();
  const { token } = useParams();

  const { loading, error, message } = useSelector(
    (state) => state.resetPassword
  );

  const [resetHandle, setResetHandle] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setResetHandle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const submit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ ...resetHandle }, token));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      navigate("/");
    }
  }, [dispatch, alert, error, message]);

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
                <h5 className="opacity-50 fw600">| change your password</h5>
              </div>

              <div className="d-flex flex-column">
                <Input
                  label="Password"
                  icon={lock}
                  name="password"
                  value={resetHandle.password}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="Confirm Password"
                  icon={lock}
                  name="confirmPassword"
                  value={resetHandle.confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="d-flex flex-column">
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="rounded-3 btn-lg text-white rounded-3 border-0 f18 w-100 text-center py-2 fw-bold"
                >
                  {loading ? <SmallLoader /> : "Submit"}
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

export default PasswordReset;

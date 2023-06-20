import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/auth";
import Input from "../components/Input";

const Settings = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  return (
    <div className="settings_container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 px-5">
                <div className="settings_inner_container">
                  <div
                    className="profile-menu"
                    style={{ borderRight: "1px solid #dfdfdf" }}
                  >
                    <ul className="list-unstyled">
                      <li
                        id="cont_html"
                        style={{ backgroundColor: "rgb(247, 247, 247)" }}
                      >
                        <Link
                          className="d-flex align-items-center gap-2"
                          to="/settings"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.60417 3.5975C8.95917 2.13417 11.0408 2.13417 11.3958 3.5975C11.4491 3.81733 11.5535 4.02148 11.7006 4.19333C11.8477
4.36518 12.0332 4.49988 12.2422 4.58645C12.4512 4.67303 12.6776 4.70904 12.9032 4.69156C13.1287 4.67407 13.3469 4.60359 13.54
4.48583C14.8258 3.7025 16.2983 5.17417 15.515 6.46083C15.3974 6.65388 15.327 6.87195 15.3096 7.09731C15.2922 7.32267 15.3281 7.54897
15.4146 7.75782C15.5011 7.96666 15.6356 8.15215 15.8073 8.29921C15.9789 8.44627 16.1829 8.55075 16.4025 8.60417C17.8658 8.95917 17.8658
11.0408 16.4025 11.3958C16.1827 11.4491 15.9785 11.5535 15.8067 11.7006C15.6348 11.8477 15.5001 12.0332 15.4135 12.2422C15.327 12.4512
15.291 12.6776 15.3084 12.9032C15.3259 13.1287 15.3964 13.3469 15.5142 13.54C16.2975 14.8258 14.8258 16.2983 13.5392 15.515C13.3461 15.3974
13.1281 15.327 12.9027 15.3096C12.6773 15.2922 12.451 15.3281 12.2422 15.4146C12.0333 15.5011 11.8479 15.6356 11.7008 15.8073C11.5537 15.9789
11.4492 16.1829 11.3958 16.4025C11.0408 17.8658 8.95917 17.8658 8.60417 16.4025C8.5509 16.1827 8.44648 15.9785 8.29941 15.8067C8.15233 15.6348
7.96676 15.5001 7.75779 15.4135C7.54882 15.327 7.32236 15.291 7.09685 15.3084C6.87133 15.3259 6.65313 15.3964 6.46 15.5142C5.17417 16.2975 3.70167
14.8258 4.485 13.5392C4.60258 13.3461 4.67296 13.1281 4.6904 12.9027C4.70785 12.6773 4.67187 12.451 4.58539 12.2422C4.49892 12.0333 4.36438 11.8479
4.19273 11.7008C4.02107 11.5537 3.81714 11.4492 3.5975 11.3958C2.13417 11.0408 2.13417 8.95917 3.5975 8.60417C3.81733 8.5509 4.02148 8.44648
4.19333 8.29941C4.36518 8.15233 4.49988 7.96676 4.58645 7.75779C4.67303 7.54882 4.70904 7.32236 4.69156 7.09685C4.67407 6.87133 4.60359 6.65313
4.48583 6.46C3.7025 5.17417 5.17417 3.70167 6.46083 4.485C7.29417 4.99167 8.37417 4.54333 8.60417
3.5975Z"
                              stroke="#828282"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929
12.5 10 12.5Z"
                              stroke="#828282"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <p className="f12">Account Settings</p>
                        </Link>
                      </li>
                      <li>
                        <div
                          className="d-flex align-items-center gap-2"
                          onClick={() => dispatch(logout())}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4H5.33333C4.97971 4 4.64057 4.15804 4.39052 4.43934C4.14048 4.72064 4 5.10218 4 5.5V14.5C4 14.8978 4.14048 15.2794 4.39052 15.5607C4.64057 15.842 4.97971 16 5.33333 16H10"
                              stroke="#828282"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M8 10H16.4987M16.4987 10L13.9987 7.5M16.4987 10L13.9987 12.5"
                              stroke="#828282"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <p className="f12">Logout</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-100 mt-4 pt-2">
                    <div className="row">
                      <div className="col-9 mx-auto">
                        <h5 className="mt-3 fw-normal">Account Settings</h5>
                        <br />
                        <div>
                          <label htmlFor="Profile URL">
                            Profile URL{" "}
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.5 15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5"
                                stroke="#828282"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M8.75 10.75C8.75 9.64543 9.64543 8.75 10.75 8.75H17.25C18.3546 8.75 19.25 9.64543 19.25 10.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H10.75C9.64543 19.25 8.75 18.3546 8.75 17.25V10.75Z"
                                stroke="#828282"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </label>
                          <div className="mt-2" />
                          <Input label="" name="email" value="poplme.co/" />
                        </div>
                        <br />
                        <div>
                          <label htmlFor="Email">Email</label>
                          <div className="mt-2" />
                          <Input label="" name="email" value={user.email} />
                        </div>
                        <br />
                        <br />
                        <div className="setting_actions d-flex justify-content-end gap-2">
                          <button>Cancel</button>
                          <button>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React from "react";
import cross from "../assets/icons/cross.svg";

const Uploaderstwo = ({
  picture1,
  picture2,
  picture3,
  uploadhandle,
  handleRemovePicture,
}) => {
  return (
    <div className="row w-100 mt-4">
      <div className="col-4">
        <div className="d-flex flex-column align-items-center gap-2">
          <p className="f12 text-center fw500">Profile picture</p>
          {(picture1.picture && (
            <div style={{ maxWidth: "90px" }} className="profile">
              <div className="pointer cross rounded-circle">
                <img
                  onClick={() => handleRemovePicture(picture1.name)}
                  src={cross}
                  alt=""
                />
              </div>
              <img
                style={{
                  minHeight: "90px",
                  maxHeight: "90px",
                  objectFit: "cover",
                }}
                className="rounded-circle w-100"
                src={picture1.picture}
                alt=""
              />
            </div>
          )) || (
            <label htmlFor={picture1.name}>
              <div className="profile_pic d-flex flex-column justify-content-center align-items-center gap-2">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 24.4922C19.0391 24.4922 24.4531 19.0781 24.4531 12.5391C24.4531 6.01172 19.0273 0.585938 12.4883 0.585938C5.96094 0.585938 0.546875 6.01172 0.546875 12.5391C0.546875 19.0781 5.97266 24.4922 12.5 24.4922ZM12.5 16.5352C8.97266 16.5352 6.26562 17.7891 5.07031 19.1953C3.5 17.4375 2.55078 15.1055 2.55078 12.5391C2.55078 7.01953 6.95703 2.57812 12.4883 2.57812C18.0195 2.57812 22.4492 7.01953 22.4609 12.5391C22.4727 15.1172 21.5117 17.4492 19.9297 19.207C18.7461 17.8008 16.0273 16.5352 12.5 16.5352ZM12.5 14.543C14.75 14.5664 16.5195 12.6445 16.5195 10.125C16.5195 7.75781 14.75 5.78906 12.5 5.78906C10.25 5.78906 8.46875 7.75781 8.48047 10.125C8.49219 12.6445 10.25 14.5195 12.5 14.543Z"
                    fill="#828282"
                  ></path>
                </svg>
                <span className="f8 text-center">
                  <span style={{ color: "rgb(41, 174, 248)" }}>Select</span>
                  file or <br /> drag and drop <br /> one here
                </span>
                <input
                  className="d-none"
                  type="file"
                  id={picture1.name}
                  accept="image/*"
                  name={picture1.name}
                  onChange={(e) => uploadhandle(e, picture1.name)}
                />
              </div>
            </label>
          )}
        </div>
      </div>
      <div className="col-4">
        <div className="d-flex flex-column align-items-center gap-2">
          <p className="f12 text-center fw500">Company photo</p>
          {(picture2.picture && (
            <div style={{ maxWidth: "90px" }} className="profile">
              <div className="pointer cross rounded-circle">
                <img
                  onClick={() => handleRemovePicture(picture2.name)}
                  src={cross}
                  alt=""
                />
              </div>
              <img
                style={{
                  minHeight: "90px",
                  maxHeight: "90px",
                  objectFit: "cover",
                }}
                className="rounded-circle w-100"
                src={picture2.picture}
                alt=""
              />
            </div>
          )) || (
            <label htmlFor={picture2.name}>
              <div className="profile_pic company_pic d-flex flex-column justify-content-center align-items-center gap-2">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 24.4922C19.0391 24.4922 24.4531 19.0781 24.4531 12.5391C24.4531 6.01172 19.0273 0.585938 12.4883 0.585938C5.96094 0.585938 0.546875 6.01172 0.546875 12.5391C0.546875 19.0781 5.97266 24.4922 12.5 24.4922ZM12.5 22.5C6.96875 22.5 2.55078 18.0703 2.55078 12.5391C2.55078 7.01953 6.95703 2.57812 12.4883 2.57812C18.0195 2.57812 22.4492 7.01953 22.4609 12.5391C22.4727 18.0703 18.0312 22.5 12.5 22.5ZM16.9883 9.35156L17.8086 8.51953C18.1719 8.13281 18.207 7.72266 17.8672 7.38281L17.6094 7.125C17.2695 6.78516 16.8477 6.82031 16.4844 7.18359L15.6406 8.00391L16.9883 9.35156ZM8.84375 17.4609L16.3086 10.0195L14.9609 8.68359L7.51953 16.1133L6.875 17.625C6.75781 17.9062 7.02734 18.1406 7.28516 18.0469L8.84375 17.4609Z"
                    fill="#828282"
                  ></path>
                </svg>
                <span className="f8 text-center">
                  <span style={{ color: "rgb(41, 174, 248)" }}>Select</span>{" "}
                  file or <br /> drag and drop <br /> one here
                </span>
              </div>

              <input
                className="d-none"
                type="file"
                id={picture2.name}
                accept="image/*"
                name={picture2.name}
                onChange={(e) => uploadhandle(e, picture2.name)}
              />
            </label>
          )}
        </div>
      </div>
      <div className="col-4">
        <div className="d-flex flex-column align-items-center gap-2">
          <p className="f12 text-center fw500">PopCode</p>
          {(picture3.picture && (
            <div style={{ maxWidth: "90px" }} className="profile">
              <div className="pointer cross rounded-circle">
                <img
                  onClick={() => handleRemovePicture(picture3.name)}
                  src={cross}
                  alt=""
                />
              </div>
              <img
                style={{
                  minHeight: "90px",
                  maxHeight: "90px",
                  objectFit: "cover",
                }}
                className="rounded-circle w-100"
                src={picture3.picture}
                alt=""
              />
            </div>
          )) || (
            <label htmlFor={picture3.name}>
              <div className="profile_pic company_pic d-flex flex-column justify-content-center align-items-center gap-2">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 24.4922C19.0391 24.4922 24.4531 19.0781 24.4531 12.5391C24.4531 6.01172 19.0273 0.585938 12.4883 0.585938C5.96094 0.585938 0.546875 6.01172 0.546875 12.5391C0.546875 19.0781 5.97266 24.4922 12.5 24.4922ZM12.5 22.5C6.96875 22.5 2.55078 18.0703 2.55078 12.5391C2.55078 7.01953 6.95703 2.57812 12.4883 2.57812C18.0195 2.57812 22.4492 7.01953 22.4609 12.5391C22.4727 18.0703 18.0312 22.5 12.5 22.5ZM16.9883 9.35156L17.8086 8.51953C18.1719 8.13281 18.207 7.72266 17.8672 7.38281L17.6094 7.125C17.2695 6.78516 16.8477 6.82031 16.4844 7.18359L15.6406 8.00391L16.9883 9.35156ZM8.84375 17.4609L16.3086 10.0195L14.9609 8.68359L7.51953 16.1133L6.875 17.625C6.75781 17.9062 7.02734 18.1406 7.28516 18.0469L8.84375 17.4609Z"
                    fill="#828282"
                  ></path>
                </svg>
                <span className="f8 text-center">
                  <span style={{ color: "rgb(41, 174, 248)" }}>Select</span>{" "}
                  file or <br /> drag and drop <br /> one here
                </span>
              </div>

              <input
                className="d-none"
                type="file"
                id={picture3.name}
                accept="image/*"
                name={picture3.name}
                onChange={(e) => uploadhandle(e, picture3.name)}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uploaderstwo;

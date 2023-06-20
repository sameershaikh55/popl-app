import React from "react";
import previewIcon from "../assets/icons/previewIcon.svg";
import card_bg from "../assets/images/card_bg.png";
import card_pic from "../assets/images/card_pic.png";
import { useSelector } from "react-redux";

// const Preview = ({ noLink, about, added }) => {
const Preview = ({ noLink, about }) => {
  const pictureURL = process.env.REACT_APP_PICTURE_URL;
  const placeholderPicture = process.env.REACT_APP_PLACEHOLDER_DP;

  const { card } = useSelector((state) => state.card);

  return (
    <div>
      {/* {!noLink && (
        <div className="d-flex flex-column justify-content-center f12 gap-3">
          <p className="opacity-75w text-center">Card live preview</p>
          <a
            style={{ color: "#29AEF8" }}
            className="text-center f12 fw500 text-decoration-none d-flex align-items-center justify-content-center gap-1"
            href=""
          >
            View card <img src={previewIcon} alt="" />
          </a>
        </div>
      )} */}

      <div
        style={{ backgroundColor: `rgba(${about.cardColor},0.1)` }}
        className="mobile_preview"
      >
        <div className="header">
          <p className="f10 fw800">2:26</p>
          <div className="camera"></div>
          <div className="d-flex align-items-center">
            <svg width="16" height="9" fill="none" viewBox="0 0 12 9">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9742 0.966309H10.2968C9.92273 0.966309 9.61948 1.26956 9.61948 1.64365V7.51393C9.61948 7.88801 9.92273 8.19127 10.2968 8.19127H10.9742C11.3482 8.19127 11.6515 7.88801 11.6515 7.51393V1.64365C11.6515 1.26956 11.3482 0.966309 10.9742 0.966309ZM7.13634 2.54688H7.81368C8.18776 2.54688 8.49102 2.85013 8.49102 3.22422V7.51404C8.49102 7.88812 8.18776 8.19138 7.81368 8.19138H7.13634C6.76225 8.19138 6.459 7.88812 6.459 7.51404V3.22422C6.459 2.85013 6.76225 2.54688 7.13634 2.54688ZM4.65188 4.12712H3.97454C3.60045 4.12712 3.2972 4.43037 3.2972 4.80446V7.51382C3.2972 7.8879 3.60045 8.19116 3.97454 8.19116H4.65188C5.02596 8.19116 5.32922 7.8879 5.32922 7.51382V4.80446C5.32922 4.43037 5.02596 4.12712 4.65188 4.12712ZM1.4914 5.4818H0.814059C0.439974 5.4818 0.136719 5.78505 0.136719 6.15914V7.51382C0.136719 7.8879 0.439974 8.19116 0.814059 8.19116H1.4914C1.86548 8.19116 2.16874 7.8879 2.16874 7.51382V6.15914C2.16874 5.78505 1.86548 5.4818 1.4914 5.4818Z"
                fill="black"
              ></path>
            </svg>
            <svg width="11" height="8" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.23227 2.28614C6.73917 2.2862 8.18845 2.86473 9.28056 3.90214C9.3628 3.98223 9.49425 3.98122 9.57525 3.89987L10.3614 3.10716C10.4024 3.0659 10.4253 3.01001 10.4249 2.95186C10.4246 2.89372 10.4011 2.8381 10.3596 2.79732C7.49312 0.0525852 2.97098 0.0525852 0.104532 2.79732C0.0630094 2.83807 0.0394501 2.89367 0.0390672 2.95182C0.0386844 3.00997 0.0615095 3.06587 0.102492 3.10716L0.888847 3.89987C0.969791 3.98134 1.10134 3.98235 1.18353 3.90214C2.27578 2.86466 3.72523 2.28613 5.23227 2.28614ZM5.23206 4.86522C6.06 4.86516 6.8584 5.17265 7.47212 5.72791C7.55512 5.80672 7.68588 5.80501 7.7668 5.72406L8.55202 4.93135C8.59338 4.88977 8.61632 4.83336 8.61572 4.77475C8.61513 4.71614 8.59104 4.66021 8.54885 4.61948C6.67996 2.8825 3.78574 2.8825 1.91685 4.61948C1.87464 4.66021 1.85055 4.71616 1.85 4.7748C1.84945 4.83343 1.87247 4.88983 1.91391 4.93135L2.6989 5.72406C2.77982 5.80501 2.91058 5.80672 2.99359 5.72791C3.6069 5.17301 4.40466 4.86556 5.23206 4.86522ZM6.80446 6.60047C6.80566 6.65925 6.78254 6.71592 6.74054 6.7571L5.38227 8.12668C5.34246 8.16693 5.28817 8.18958 5.23153 8.18958C5.17489 8.18958 5.1206 8.16693 5.08079 8.12668L3.72229 6.7571C3.68032 6.71589 3.65724 6.6592 3.65848 6.60043C3.65973 6.54165 3.68519 6.48599 3.72886 6.44659C4.59631 5.71352 5.86675 5.71352 6.7342 6.44659C6.77784 6.48602 6.80326 6.5417 6.80446 6.60047Z"
                fill="black"
              ></path>
            </svg>
            <svg width="17" height="8" fill="none">
              <rect
                opacity="0.35"
                x="1.15117"
                y="1.07939"
                width="14.2241"
                height="6.99918"
                rx="1.46757"
                stroke="black"
                strokeWidth="0.67734"
              ></rect>
              <path
                opacity="0.4"
                d="M16.3906 3.22412V5.93348C16.9357 5.70401 17.2902 5.17021 17.2902 4.5788C17.2902 3.98739 16.9357 3.45359 16.3906 3.22412Z"
                fill="black"
              ></path>
              <rect
                x="2.16797"
                y="2.09521"
                width="12.1921"
                height="4.96716"
                rx="0.90312"
                fill="black"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="hero">
          <img
            className="bg"
            src={(card.coverDP && pictureURL + card.coverDP) || card_bg}
            alt=""
          />
          <div className="position-relative d-flex justify-content-center">
            <img
              className="card_pic"
              src={
                (card.cardDP && pictureURL + card.cardDP) || placeholderPicture
              }
              alt=""
            />

            <img
              className="company_pic"
              src={
                (card.companyDP && pictureURL + card.companyDP) ||
                placeholderPicture
              }
              alt=""
            />
          </div>
        </div>
        <div className="body">
          <p className="text-center fw500 f14">{card.name}</p>
          <p className="text-center f10 opacity-75">
            {card.jobTitle} at {card.company}
          </p>
          {/* <div className="d-flex justify-content-center mt-4">
            <button className="save_contact">Save Contact</button>
          </div> */}
          <br />
          <div
            style={{ minWidth: "250px" }}
            className="preview-socials row gy-2 px-4"
          >
            {"social" in card &&
              card.social.map((content, i) => {
                if (content.active)
                  return (
                    <div key={i} className="col-4">
                      <img className="w-100" src={content.socialIcon} alt="" />
                      <p className="text-center f8 fw500 mt-1">
                        {content.name}
                      </p>
                    </div>
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

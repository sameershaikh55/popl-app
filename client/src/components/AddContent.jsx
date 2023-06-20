import React from "react";
import add from "../assets/icons/add.svg";

const AddContent = ({ setRegister1, setActive }) => {
  const socials = [
    {
      title: "Social Links",
      links: [
        {
          id: 1,
          text: "Instagram",
          icon: "https://dash.popl.co/assets/img/links/instagram.svg",
        },
        {
          id: 2,
          text: "WhatsApp",
          icon: "https://dash.popl.co/assets/img/links/whatsapp.svg",
        },
        {
          id: 3,
          text: "Snapchat",
          icon: "https://dash.popl.co/assets/img/links/snapchat.svg",
        },
        {
          id: 4,
          text: "Tik Tok",
          icon: "https://dash.popl.co/assets/img/links/tiktok.svg",
        },
        {
          id: 5,
          text: "Facebook",
          icon: "https://dash.popl.co/assets/img/links/facebook.svg",
        },
        // {
        //   id: 6,
        //   text: "Messenger",
        //   icon: "https://dash.popl.co/assets/img/links/messenger.svg",
        // },
        {
          id: 7,
          text: "Twitter",
          icon: "https://dash.popl.co/assets/img/links/twitter.svg",
        },
        {
          id: 8,
          text: "WeChat",
          icon: "https://dash.popl.co/assets/img/links/wechat.svg",
        },
        {
          id: 9,
          text: "Discord",
          icon: "https://dash.popl.co/assets/img/links/discord.svg",
        },
        {
          id: 10,
          text: "Telegram",
          icon: "https://dash.popl.co/assets/img/links/telegram.svg",
        },
        {
          id: 11,
          text: "SoundCloud",
          icon: "https://dash.popl.co/assets/img/links/soundcloud.svg",
        },
        {
          id: 12,
          text: "Text",
          icon: "https://dash.popl.co/assets/img/links/number.svg",
        },
        {
          id: 13,
          text: "Email",
          icon: "https://dash.popl.co/assets/img/links/email.svg",
        },
        {
          id: 14,
          text: "Address",
          icon: "https://dash.popl.co/assets/img/links/address.svg",
        },
        {
          id: 15,
          text: "Facetime",
          icon: "https://dash.popl.co/assets/img/links/facetime.svg",
        },
        {
          id: 16,
          text: "Cash App",
          icon: "https://dash.popl.co/assets/img/links/cashapp.svg",
        },
      ],
    },
    {
      title: "Business Links",
      links: [
        {
          id: 17,
          text: "LinkedIn",
          icon: "https://dash.popl.co/assets/img/links/linkedin.svg",
        },
        {
          id: 18,
          text: "WhatsApp Business",
          icon: "https://dash.popl.co/assets/img/links/whatsapp.svg",
        },
        {
          id: 19,
          text: "YouTube",
          icon: "https://dash.popl.co/assets/img/links/youtube.svg",
        },
        {
          id: 20,
          text: "Pinterest",
          icon: "https://dash.popl.co/assets/img/links/pinterest.svg",
        },
        {
          id: 21,
          text: "Twitch",
          icon: "https://dash.popl.co/assets/img/links/twitch.svg",
        },
        {
          id: 22,
          text: "Spotify",
          icon: "https://dash.popl.co/assets/img/links/spotify.svg",
        },
        {
          id: 23,
          text: "Apple Music",
          icon: "https://dash.popl.co/assets/img/links/apple.svg",
        },
        {
          id: 24,
          text: "PayPal",
          icon: "https://dash.popl.co/assets/img/links/paypal.svg",
        },
        // {
        //   id: 25,
        //   text: "Payoneer",
        //   icon: "https://dash.popl.co/assets/img/links/payoneer.svg",
        // },
        {
          id: 26,
          text: "Venmo",
          icon: "https://dash.popl.co/assets/img/links/venmo.svg",
        },
        {
          id: 27,
          text: "Zelle",
          icon: "https://dash.popl.co/assets/img/links/zelle.svg",
        },
        {
          id: 28,
          text: "Cash App",
          icon: "https://dash.popl.co/assets/img/links/cashapp.svg",
        },
        {
          id: 29,
          text: "Text",
          icon: "https://dash.popl.co/assets/img/links/number.svg",
        },
        {
          id: 30,
          text: "Email",
          icon: "https://dash.popl.co/assets/img/links/email.svg",
        },
      ],
    },
  ];

  return (
    <div className="add_content_container">
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="mb-3">Add Content</h4>
          <p className="f14 opacity-75">
            Select from our wide variety of links and contact info below.
          </p>
        </div>
      </div>
      <br />

      <div className="social_icons_container d-flex flex-column gap-4">
        {socials.map((content, i) => {
          return (
            <div key={i}>
              <p className="mb-2 f12 fw500 opacity-75">{content.title}</p>
              <div className="row gy-3 gx-3">
                {content.links.map((item, i) => {
                  return (
                    <div key={i} className="col-4">
                      <div
                        onClick={() => {
                          setRegister1(true);
                          setActive(item);
                        }}
                        className="social_card d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <img className="icon" src={item.icon} alt="" />
                          <p>{item.text}</p>
                        </div>
                        <div className="add_icon">
                          <img src={add} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddContent;

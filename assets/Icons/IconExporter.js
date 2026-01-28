import React from "react";

import amazonMusic from "./Amazon-music-icon.png";
import appleIcon from "./Apple-icon.png";
import creatorIcon from "./Creator-Icon.png";
import group from "./Group.png";
import icon from "./Icon.png";
import jioSaavnIcon from "./JioSaavn-icon.png";
import spotifyIcon from "./Spotify-icon.png";
import userIcon from "./Useer-Icon.png";
import vector from "./Vector.png";
import wynkmMusicIcon from "./WYNKM-music-icon.png";
import youtubeIcon from "./YouTube-icon.png";
import Instagram from "./instagram.png";
import x from "./x.png";
import Email from "./mail.png";
import MusicIcon from "./Music-icon.png"
import Artist from "./Artist-icon.png"
import FeaturesIcon from "./Icon (1).png";
import SuccessIcon from "./Confirm-Icon (1).png"


 function Heart({ active }) {
  return React.createElement(
    "svg",
    {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: active ? "currentColor" : "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M12 21s-6.716-4.41-9.33-7.02C.42 11.73.42 8.27 2.67 6.02c2.25-2.25 5.9-2.25 8.15 0L12 7.2l1.18-1.18c2.25-2.25 5.9-2.25 8.15 0c2.25 2.25 2.25 5.71 0 7.96C18.716 16.59 12 21 12 21z",
      stroke: active ? "none" : "currentColor",
      strokeWidth: active ? 0 : 2,
    }),
  );
}

export {
  Artist,
  MusicIcon,
  amazonMusic,
  appleIcon,
  creatorIcon,
  group,
  icon,
  jioSaavnIcon,
  spotifyIcon,
  userIcon,
  vector,
  wynkmMusicIcon,
  youtubeIcon,
  Instagram,
  x,
  Email,
  Heart,
  FeaturesIcon,
  SuccessIcon,
};

import React from "react";
import "./Ad.css";
import _ from "lodash";

function Ad(props) {
  const {
    caption,
    title,
    tags,
    iconUrl,
    howManyLeft,
    numOfTokens,
    clickUrl
  } = props.item;

  const fallbackToken =
    "https://cdn4.iconfinder.com/data/icons/slot-machine-icons/200/casino_token-512.png";

  const fallbackIcon =
    "https://cdn6.aptoide.com/imgs/f/4/b/f4b44bc7a8d96f3f3c3e1f8911a84326_icon.png?w=120";

  const getTags = () => {
    return _.map(tags, (tag, index) => {
      return (
        <div className="tag" key={index}>
          {tag}
        </div>
      );
    });
  };

  const getOffers = () => {
    return howManyLeft !== 0 ? (
      <div className="offer">{`Only ${howManyLeft} left!`}</div>
    ) : (
      ""
    );
  };

  const handleErrorInSrc = (e, fallbackSrc) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  return (
    <div
      className="ad-container"
      onClick={() => window.open(clickUrl, "_.blank")}
    >
      <div className="caption">{caption}</div>
      <img
        className="icon"
        alt="icon"
        src={iconUrl}
        onError={e => handleErrorInSrc(e, fallbackIcon)}
      />

      <div className="tag-box">{getTags()}</div>
      {getOffers()}
      <div className="title">{title}</div>
      <div className="token">
        <img
          className="token-image"
          alt="token"
          src={props.tokenImage}
          onError={e => handleErrorInSrc(e, fallbackToken)}
        />
        {numOfTokens}
      </div>
    </div>
  );
}

export default Ad;

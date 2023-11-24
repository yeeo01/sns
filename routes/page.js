const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  renderProfile,
  renderJoin,
  renderMain,
  renderHashtag,
} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = (req.user?.Followings || []).map((f) => f.id);
  //Followings 배열을 가져와서 undefined 또는 null인 경우 빈 배열로, 유효하다면 id 속성을 추출하여 새로운 배열을 생성

  next();
});

router.get("/profile", isLoggedIn, renderProfile);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/", renderMain);

router.get("/hashtag", renderHashtag);

module.exports = router;

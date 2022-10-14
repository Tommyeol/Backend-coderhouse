const router = require("express").Router();
const passport = require("passport");
const {
  getIndex,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFailLogin,
  getFailSignup,
  getLogout,
  failRoute,
} = require("../controllers/controller");
const checkAuthentication = require("../middlewares/auth");
const { fork } = require("child_process");

// Index
router.get("/", checkAuthentication, getIndex);

// Login
router.get("/login", getLogin);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);
router.get("/faillogin", getFailLogin);

// Signup
router.get("/signup", getSignup);
router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  postSignup
);
router.get("/failsignup", getFailSignup);

// Redirect to login & signup
router.post("/redirect-signup", (req, res) => res.redirect("/signup"));
router.post("/redirect-login", (req, res) => res.redirect("/login"));

// Logout
router.post("/logout", getLogout);

// Info
router.get("/info", (req, res) => {
  res.json({
    entry_arguments: process.argv.slice(2),
    os_name: process.platform,
    node_version: process.version,
    reserved_total_memory: process.memoryUsage().rss,
    execution_path: process.execPath,
    process_id: process.pid,
    folder_project: process.cwd(),
  });
});

// Api randoms
router.get("/api/randoms", (req, res) => {
  const forked = fork("./controllers/randoms.js");

  let { quantity } = req.query;
  let obj = {};
  quantity
    ? forked.send({ quantity, obj })
    : forked.send({ quantity: 500000000, obj });
  forked.on("message", (msg) => res.json(msg));
});

// Fail route
router.get("*", failRoute);

module.exports = router;

const passport = require("passport");
const router = require("express").Router();

// Google
router.get("/google", passport.authenticate("google", {scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));


// Github
router.get("/github", passport.authenticate("github", {scope: ["profile"] }));

router.get("/github/callback", passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));


// Hasil
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        succes: false,
        message: "failure"
    })
})

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            succes: true,
            message: "success",
            user: req.user
        })        
    }
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:5173/login");
})

module.exports = router
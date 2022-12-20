const express = require("express");
const cookieSession = require("cookie-session");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");
const passportSetup = require("./passport.js");
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(cookieSession(
    {
        name: "session",
        keys: ["myapp"],
        maxAge: 24 * 60 * 60 * 100,
    }
    ));
    
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://localhost:5173",
        method: "GET, POST, PUT, DELETE",
        credentials: true
    })
);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({msg: "API Connected"})
})

app.listen(5000, () => console.log("Server Start"));
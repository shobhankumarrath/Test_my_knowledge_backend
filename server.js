const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const helmet = require("helmet");
const emailRoutes = require("./src/routes/emailRoutes");
const { ALLOWED_ORIGINS } = require("./src/utils/constants");

const app = express();

// Cors Security
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: false,
  })
);
app.use(helmet());
//json parser
app.use(express.json());

//RateLimiter
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

//API key middleware
app.use("/api", (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }
  next();
});

//Routes
app.use("/api", emailRoutes);

//Start Server
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).send("Backend is running successfully!");
});

app.listen(PORT, () => console.log(`Server running on Port:${PORT}`));

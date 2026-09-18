const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the website
app.use(express.static(path.join(__dirname, "public")));

// Test endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "ViewHub Agencies"
  });
});

// M-PESA callback endpoint
app.post("/api/mpesa/callback", (req, res) => {
  console.log(
    "M-PESA callback received:",
    JSON.stringify(req.body)
  );

  res.json({
    ResultCode: 0,
    ResultDesc: "Accepted"
  });
});

// Send the website for other routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ViewHub running on port ${PORT}`);
});

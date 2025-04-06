import express from "express";
import cors from "cors";
import testimonials from "./routes/testimonial.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Testimonials API");
});

app.use("/testimonials", testimonials);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

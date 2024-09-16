import express from "express";
import cors from "cors";
const app = express();
// Enable CORS for all origins (or specify origins as needed)
app.use(cors());
// Your other middleware and routes
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static("./client"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import app from "./app.js";

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Train Search service is running on port ${PORT}`);
});

import { createConnection } from "../typeorm";
import { app } from "./app";

createConnection();

app.listen(3333, () => {
  console.log("🚀 ~ app.listen ~", 3333);
});

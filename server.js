const express = require("express");
const cors = require("cors");
const knex = require("knex");
const app = express();
const dotenv = require("dotenv")
const port = 3006;

dotenv.config();
const kn = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: "my_bank",
  },
});

app.use(cors());
app.use(express.json());

app.get("/acc", async (req, res) => {
  try {
    const data = await kn("accounts").select("*");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching accounts");
  }
});

app.listen(port,()=>{
    console.log("listening to port" + port);
})
const { express, router, db } = require("../../utils/import/common_import");
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = require("../../utils/export_env");
const { InsertBlog , UpdateBlog } = require("../../Engine/blog");

const upload = require("./../../utils/multer");

router.get("/", (req, res) => {
  res.send("Blog route is working");
});

router.post("/create", upload.array("file"), async (req, res) => {
  try {
    const { topic, content } = req.body;
    const files = req.files;

    const Insert = await InsertBlog(topic, content, files);

    if (Insert) {
      res.status(201).send({
        message: `Blog post created successfully with B_ID: ${Insert}`,
        B_ID: Insert,
      });
    } else {
      res.status(400).send({ message: "Failed to create blog post" });
    }
  } catch (e) {
    console.log("Error /blog/create : ", e);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/update/:B_ID", upload.array("file"), async (req, res) => {
  try {
    const { topic, content } = req.body;
    const {B_ID} = req.params
    const files = req.files;

    const Update = await UpdateBlog(topic, content, files , B_ID);

    if (Update) {
      res.status(201).send({
        message: `Blog post update successfully with B_ID: ${Update}`,
        B_ID: Update,
      });
    } else {
      res.status(400).send({ message: "Failed to update blog post" });
    }
  } catch (e) {
    console.log("Error /blog/create : ", e);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const [blog] = await db.execute(
      "SELECT * FROM blog a order by a.B_CreateDate desc"
    );

    res.status(200).json({ message: `ok`, blog: blog });
  } catch (e) {
    res.status(401).json({ message: `Error : ${e}` });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const id = `%${req.params.id}%`;

    const [blog] = await db.execute(
      "SELECT * FROM blog a WHERE a.B_ID LIKE ?",
      [id]
    );

    res.status(200).json({ message: "ok", blog: blog });
  } catch (e) {
    res.status(500).json({ message: `Error: ${e.message}` });
  }
});

module.exports = router;

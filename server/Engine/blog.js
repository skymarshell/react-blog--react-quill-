const { now } = require("moment");
const db = require("../config/db");
const { IMAGE_PATH } = require("../utils/export_env");
const {
  regexImgTag,
  regexCheckSrc,
  regexCheckFirstEmptySrc,
} = require("../utils/image");
const { NewID } = require("../utils/uuid");
const { currentDateTime } = require("../utils/Date");

/**
 *
 * ถ้าส่ง src = "" ให้ replace เป็นไฟล์ ถ้าไม่ skip
 *
 *
 */

async function InsertBlog(topic, content, file) {
  try {
    const imgTags = content.match(regexImgTag());
    content = await prepareInsertBlog(imgTags, content, file);

    const B_ID = NewID();

    const sql = `
    INSERT INTO blog (B_ID, B_Topic ,B_Content, B_CreateBy, B_CreateDate, B_RecordStatus)
    VALUES (?, ?, ?, ?, ? , ?)`;
    await db.execute(sql, [
      B_ID,
      topic,
      content,
      "DeeDee",
      currentDateTime(),
      "Y",
    ]);

    console.log(`Blog inserted with ID: ${B_ID}`);
    return B_ID; // Returning the ID can be useful for confirmation.
  } catch (e) {
    console.error(e);
  }
}

async function UpdateBlog(topic, content, file, ID) {
  try {
    const imgTags = content.match(regexImgTag());
    content = await prepareInsertBlog(imgTags, content, file);

    const B_ID = ID;

    const sql = `
      UPDATE blog
      SET B_Topic = ?, 
          B_Content = ?
      WHERE B_ID = ?
    `;

    await db.execute(sql, [topic, content, B_ID]);

    console.log(`Blog updated with ID: ${B_ID}`);
    return B_ID;
  } catch (e) {
    console.error("Failed to update blog:", e);
  }
}

async function prepareInsertBlog(imgTags, content, file) {
  // Ensure there are imgTags and files
  if (imgTags && imgTags.length > 0 && file && file.length > 0) {
    let fileIndex = 0;

    // Replace only the empty src="" attributes with the uploaded image paths
    content = content.replace(/<img src="">/g, (m) => {
      //console.log(m,":",fileIndex)

      if (fileIndex < file.length) {
        // Replace src="" with the image path
        const filePath = `${IMAGE_PATH}/${file[fileIndex].filename}`;
        fileIndex++; // Move to the next file
        return `<img src="${filePath}">`; // Replace only empty src=""
      } else {
        // If no more files, use a default image path or leave it empty
        return `<img src="default-image.jpg">`; // Optionally, replace with a default image
      }
    });
  }

  return content;
}

module.exports = {
  InsertBlog,
  UpdateBlog,
};

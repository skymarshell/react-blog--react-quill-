import axios from "axios";
import { API_DOMAIN_FULL_URL } from "./../utils/export_env/export_env";
import {
  CovertBytesToImage,
  regexImgTag,
  regexSrcDataImage,
} from "../utils/image/image";

const imgTagRegex = regexImgTag();

export async function CreateBlog(editorContent, updateBlog) {
  try {
    let arr_byte = [];
    let topic = editorContent.topic;
    let content = editorContent.content;
    let file = [];

    const img_tag = content.match(imgTagRegex);

    // ถ้า src = "data:image/*;base64,..." ให้แยก byte ออกมาเก็บใน arr_byte
    // และลบ src ออกไปจาก content
    if (img_tag) {
      img_tag.forEach((tag) => {
        const src = tag.match(regexSrcDataImage());

        if (src) {
          arr_byte.push(src[1]);

          // replace src="data:image/png;base64,..." with src="" to empty string
          content = content.replace(src[0], 'src=""');
        }
      });

      file = await blogCovertBytesToImage(arr_byte);
    }

    let response;
    if (updateBlog == null) {
      response = await InsertBlog(topic, content, file);
    } else {
      response = await UpdateBlog(topic, content, file, updateBlog.B_ID);
    }

    return response;
  } catch (e) {
    console.log("Error CreateBlog: ", e);
  }
}

async function blogCovertBytesToImage(arr_byte) {
  let file = [];

  try {
    if (arr_byte.length > 0) {
      for (const b of arr_byte) {
        const img = await CovertBytesToImage(b);
        file.push(img);
      }
    }
  } catch (e) {
    console.log("Error blogCovertBytesToImage : ", e);
  }

  return file;
}

async function InsertBlog(topic, content, file) {
  try {
    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("content", content);
    file.forEach((f) => {
      formData.append("file", f);
    });

    const response = await axios.post(
      `${API_DOMAIN_FULL_URL}/blog/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (e) {
    console.log("Error InsertBlog:", e);
  }
}

async function UpdateBlog(topic, content, file, B_ID) {
  try {
    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("content", content);
    file.forEach((f) => {
      formData.append("file", f);
    });

    const response = await axios.post(
      `${API_DOMAIN_FULL_URL}/blog/update/${B_ID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (e) {
    console.log("Error InsertBlog:", e);
  }
}

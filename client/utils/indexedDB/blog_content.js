import { openDB } from "idb";

const DB_NAME = "blog_content";
const STORE_NAME = "blog_content";
const QUERY = "blog_content";

// ฟังก์ชันเปิด IndexedDB
export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// ฟังก์ชันบันทึกข้อมูลลง IndexedDB
export const blog_content_save = async (content) => {
  const db = await initDB();
  await db.put(STORE_NAME, content, QUERY);
};

// ฟังก์ชันดึงข้อมูลจาก IndexedDB
export const blog_content_get = async () => {
  const db = await initDB();
  return await db.get(STORE_NAME, QUERY); // ดึงข้อมูลจาก IndexedDB โดยตรง
};

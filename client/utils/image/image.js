import { NewID } from "./../../../server/utils/uuid";

export async function CovertBytesToImage(base64Bytes) {
  try {
    const mimeType = "image/png"; // or detect dynamically if needed
    const binary = atob(base64Bytes); // decode base64
    const len = binary.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: mimeType });
    const file = new File([blob], `${NewID()}.png`, { type: mimeType });

    return file;
  } catch (e) {
    console.log("Error CovertBytesToImage : ",e);
    
  }
}

export function regexImgTag() {
  return /<img[^>]*>/g;
}

/**
 * ใช้กับ <img> tag ที่มี src เป็น base64 data เช่น <img src="data:image/png;base64,DASDASD..." />
 *
 * @returns  ได้ [0] src="data:image/png;base64,byte..." และ [1] raw byte
 *
 */
export function regexSrcDataImage() {
  return /src="data:image\/[a-zA-Z]+;base64,([^"]+)"/;
}


/**
 * 
 *
 * Capture first found src=""
 *
 * @function
 * @returns {RegExp} /src=""(?!.*src="")/
 */
export function regexCheckFirstEmptySrc() {
  return /src=""(?!.*src="")/;
}
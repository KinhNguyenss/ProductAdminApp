import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyA5UVUamj2rjgFeGO2C7b60BlaeJA9UwQA";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Gợi ý giá sản phẩm dựa vào tên sản phẩm
 * @param {string} tenSanPham - Tên sản phẩm cần gợi ý giá
 * @returns {Promise<string>} - Giá gợi ý dạng số (VD: "150000")
 */
export async function goiYGia(tenSanPham) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Bạn là trợ lý định giá sản phẩm tại Việt Nam.
Dựa vào tên sản phẩm: "${tenSanPham}"
Hãy gợi ý một mức giá bán lẻ hợp lý bằng VNĐ ở thị trường Việt Nam.
Chỉ trả lời đúng một số nguyên (không có dấu chấm, phẩy, chữ, ký hiệu gì khác).
Ví dụ: 150000`,
  });

  // Lấy text và làm sạch, chỉ giữ lại số
  const raw = response.text?.trim() ?? "";
  const digits = raw.replace(/[^\d]/g, "");
  return digits;
}

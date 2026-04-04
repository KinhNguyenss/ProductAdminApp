export const CLOUDINARY_CLOUD_NAME = 'dqs4tuaru';
export const CLOUDINARY_API_KEY = '252599453453589';
export const CLOUDINARY_API_SECRET = '6umMu92EzRsMmzbNeuv60OHXEno';
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
// Upload Preset: Vào https://cloudinary.com → Settings → Upload → Upload Presets
// Tạo preset mới → Signing mode: Unsigned → Copy tên vào đây
// Nếu dùng ml_default mà lỗi, đổi sang 'product_admin_unsigned'
export const UPLOAD_PRESET = 'ml_default';

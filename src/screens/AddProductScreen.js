import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePickerLib from 'expo-image-picker';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CLOUDINARY_URL, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/cloudinary';
import { useRouter } from 'expo-router';

export default function AddProductScreen() {
  const router = useRouter();
  const [tensp, setTensp] = useState('');
  const [loaisp, setLoaisp] = useState('');
  const [gia, setGia] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePickerLib.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập', 'Ứng dụng cần quyền truy cập thư viện ảnh!');
      return;
    }

    const result = await ImagePickerLib.launchImageLibraryAsync({
      mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    setUploading(true);
    try {
      const formData = new FormData();
      const filename = uri.split('/').pop() || `photo_${Date.now()}.jpg`;
      const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
      const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

      formData.append('file', { uri, name: filename, type: mimeType });
      // Timestamp cho signed upload
      const timestamp = Math.round(Date.now() / 1000);
      formData.append('timestamp', String(timestamp));
      formData.append('api_key', CLOUDINARY_API_KEY);

      // Sử dụng Basic Auth thay vì upload preset
      const credentials = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Basic ${credentials}`,
        },
        timeout: 30000,
      });

      if (!response.data?.secure_url) {
        throw new Error('Cloudinary không trả về URL ảnh');
      }
      return response.data.secure_url;
    } catch (error) {
      const cloudinaryMsg =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message;
      console.error('Cloudinary upload error:', cloudinaryMsg, error.response?.data);
      throw new Error(`Upload ảnh thất bại: ${cloudinaryMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!tensp.trim()) { Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm!'); return; }
    if (!loaisp.trim()) { Alert.alert('Lỗi', 'Vui lòng nhập loại sản phẩm!'); return; }
    if (!gia.trim() || isNaN(Number(gia))) { Alert.alert('Lỗi', 'Vui lòng nhập giá hợp lệ!'); return; }

    setSaving(true);
    try {
      let hinhanhUrl = '';
      if (imageUri) {
        hinhanhUrl = await uploadImageToCloudinary(imageUri);
      }

      await addDoc(collection(db, 'sanpham'), {
        tensp: tensp.trim(),
        loaisp: loaisp.trim(),
        gia: Number(gia),
        hinhanh: hinhanhUrl,
      });

      // Cập nhật idsanpham = document ID
      // (idsanpham được dùng = docRef.id, nhưng đề bài chỉ lưu 5 trường nên không lưu riêng)

      Alert.alert('Thành công', 'Đã thêm sản phẩm!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Lỗi', error.message || 'Không thể lưu sản phẩm. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const isLoading = uploading || saving;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0f0c29" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thêm sản phẩm</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Image Picker */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.8}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.productImage} contentFit="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderIcon}>📷</Text>
              <Text style={styles.imagePlaceholderText}>Chọn ảnh sản phẩm</Text>
              <Text style={styles.imagePlaceholderSub}>Nhấn để tải lên</Text>
            </View>
          )}
          {imageUri && (
            <View style={styles.changeImageBadge}>
              <Text style={styles.changeImageText}>✏️ Đổi ảnh</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formCard}>
          <View style={styles.field}>
            <Text style={styles.label}>Tên sản phẩm *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên sản phẩm"
              placeholderTextColor="#556677"
              value={tensp}
              onChangeText={setTensp}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Loại sản phẩm *</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: Điện tử, Thời trang, Thực phẩm..."
              placeholderTextColor="#556677"
              value={loaisp}
              onChangeText={setLoaisp}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Giá (VNĐ) *</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: 299000"
              placeholderTextColor="#556677"
              value={gia}
              onChangeText={setGia}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, isLoading && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          {isLoading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.saveBtnText}>
                {uploading ? 'Đang upload ảnh...' : 'Đang lưu...'}
              </Text>
            </View>
          ) : (
            <Text style={styles.saveBtnText}>💾  Lưu sản phẩm</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  backIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  imagePicker: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 2,
    borderColor: 'rgba(102,51,238,0.4)',
    borderStyle: 'dashed',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  imagePlaceholderIcon: {
    fontSize: 48,
  },
  imagePlaceholderText: {
    color: '#aabbc8',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePlaceholderSub: {
    color: '#556677',
    fontSize: 13,
  },
  changeImageBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 13,
  },
  formCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 4,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8899aa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 14,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  saveBtn: {
    backgroundColor: '#6633ee',
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    shadowColor: '#6633ee',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  saveBtnDisabled: {
    opacity: 0.7,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';

const CATEGORY_COLORS = {
  'Điện tử': '#3b82f6',
  'Thời trang': '#ec4899',
  'Thực phẩm': '#22c55e',
  'Sách': '#f59e0b',
  'Gia dụng': '#8b5cf6',
};

function formatPrice(price) {
  if (!price && price !== 0) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
}

function getCategoryColor(loaisp) {
  return CATEGORY_COLORS[loaisp] || '#6633ee';
}

export default function ProductCard({ product, onEdit, onDelete }) {
  const { tensp, loaisp, gia, hinhanh, id } = product;
  const categoryColor = getCategoryColor(loaisp);

  return (
    <View style={styles.card}>
      {/* Image */}
      <View style={styles.imageContainer}>
        {hinhanh ? (
          <Image
            source={{ uri: hinhanh }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View style={styles.imageFallback}>
            <Text style={styles.imageFallbackIcon}>🛍️</Text>
          </View>
        )}
        {/* Category badge */}
        <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '22', borderColor: categoryColor + '55' }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>{loaisp || 'Khác'}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.productName} numberOfLines={2}>{tensp || 'Chưa đặt tên'}</Text>
        <Text style={styles.productPrice}>{formatPrice(gia)}</Text>
        <Text style={styles.productId} numberOfLines={1}>ID: {id}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.8}>
          <Text style={styles.editBtnText}>✏️ Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} activeOpacity={0.8}>
          <Text style={styles.deleteBtnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  imageContainer: {
    position: 'relative',
    width: 85,
    height: 85,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(102,51,238,0.15)',
  },
  imageFallbackIcon: {
    fontSize: 36,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    borderRadius: 6,
    paddingVertical: 2,
    alignItems: 'center',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  productName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  productPrice: {
    color: '#22c55e',
    fontSize: 15,
    fontWeight: '800',
  },
  productId: {
    color: '#445566',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
    flexShrink: 0,
  },
  editBtn: {
    backgroundColor: 'rgba(102,51,238,0.25)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(102,51,238,0.4)',
  },
  editBtnText: {
    color: '#a07ee0',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 16,
  },
});

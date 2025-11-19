import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getRecommendedProducts, openProductLink } from '../utils/countryLink';

interface ProductRecommendationProps {
  filterType: string;
}

/**
 * 상품 추천 컴포넌트
 */
const ProductRecommendation: React.FC<ProductRecommendationProps> = ({
  filterType,
}) => {
  const products = getRecommendedProducts(filterType);

  const handleProductClick = async (link: any) => {
    await openProductLink(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>추천 상품</Text>
      <Text style={styles.subtitle}>
        이 필터와 어울리는 아이템을 만나보세요
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.productItem}
            onPress={() => handleProductClick(product.link)}
          >
            <View style={styles.productImagePlaceholder}>
              <Text style={styles.productImageText}>📦</Text>
            </View>
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productPlatform}>
              {product.link.platform === 'coupang' && '쿠팡'}
              {product.link.platform === 'amazon' && 'Amazon'}
              {product.link.platform === 'temu' && 'Temu'}
              {product.link.platform === 'aliexpress' && 'AliExpress'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  productList: {
    gap: 15,
  },
  productItem: {
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  productImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImageText: {
    fontSize: 40,
  },
  productName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  productCategory: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5,
  },
  productPlatform: {
    color: '#FF7CCB',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProductRecommendation;


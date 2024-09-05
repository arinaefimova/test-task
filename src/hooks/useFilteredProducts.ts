import { useEffect, useState, useMemo } from 'react';
import { Recipe } from '../types';

interface UseFilteredProductsProps {
  products: Recipe[];
  filter: string;
  favArray: string[];
  itemsPerPage: number;
  currentPage: number;
}

const useFilteredProducts = ({
  products,
  filter,
  favArray,
  itemsPerPage,
  currentPage,
}: UseFilteredProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Recipe[]>([]);

  useEffect(() => {
    let updatedProducts = products;

    if (filter === 'fav') {
      updatedProducts = products.filter((product) =>
        favArray.includes(
          product.uri.replace('http://www.edamam.com/ontologies/edamam.owl#', '')
        )
      );
    }

    setFilteredProducts(updatedProducts);
  }, [filter, products, favArray]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalItems = filteredProducts.length;

  return { paginatedProducts, totalItems };
};

export default useFilteredProducts;

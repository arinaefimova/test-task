// hooks/useProduct.ts
import { useMemo } from 'react';
import { Recipe } from '../types';


interface UseProductProps {
  data: { hits: { recipe: Recipe }[] } | undefined;
  productId: string | undefined;
}

const useProduct = ({ data, productId }: UseProductProps) => {
  return useMemo(() => {
    if (!data || !productId) return undefined;
    return data.hits
      .map((hit) => hit.recipe)
      .find((product) =>
        product.uri.replace('http://www.edamam.com/ontologies/edamam.owl#', '') === productId
      );
  }, [data, productId]);
};

export default useProduct;

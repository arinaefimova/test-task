
import { FC, useEffect, useCallback, useState } from 'react';
import styles from './ProductsList.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import ProductItemSkeleton from '../ProductItemSkeleton/ProductItemSkeleton';
import Filters from '../Filters/Filters';
import { useGetRecipesQuery } from '../../../redux/slices/apiSlice';
import { Recipe } from '../../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { countIngr, rangeChange, searchQuery } from '../../../redux/slices/filtersSlice';
import { setRemovedProduct } from '../../../redux/slices/cardSlice';
import useFilteredProducts from '../../../hooks/useFilteredProducts';
import PaginationComponent from '../PaginationComponent';


const ProductsList: FC = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const query = useSelector((state: RootState) => state.filter.query);
  const calories = useSelector((state: RootState) => state.filter.calories);
  const ingr = useSelector((state: RootState) => state.filter.ingr);
  const favArray = useSelector((state: RootState) => state.card.favArray);
  const removedIds = useSelector((state: RootState) => state.card.removedIds);

  const { data, error, isLoading } = useGetRecipesQuery({
    query: query || 'recipe',
    maxCalories: calories,
    ingredients: ingr
  });

  useEffect(() => {
    if (data) {
      const newProducts = data.hits
        .map((hit) => hit.recipe)
        .filter((product) => !removedIds.includes(product.uri));
      setProducts(newProducts);
    }
  }, [data, removedIds]);

  const { paginatedProducts, totalItems } = useFilteredProducts({
    products,
    filter,
    favArray,
    itemsPerPage,
    currentPage,
  });

  const handleFilterChange = useCallback((selectedFilter: string) => {
    setFilter(selectedFilter);
    setCurrentPage(1); 
  }, []);

  const removeProduct = useCallback((id: string) => {
    dispatch(setRemovedProduct(id));
  }, [dispatch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (error) return <div className={styles.error}>There was an error loading the data.</div>;

  return (
    <section className={styles['products-list']}>
      <div className='container'>
        <div className='title'>Products recipes</div>
        <div className={styles.row}>
          <div className={styles.filters}>
            <Filters
              handleQueryChange={(query) => dispatch(searchQuery(query))}
              onFilterChange={handleFilterChange}
              query={query}
              handleRangeChange={(value) => dispatch(rangeChange(value))}
              calories={calories}
              handleIngrChange={(value) => dispatch(countIngr(value))}
              ingr={ingr}
            />
          </div>
          {isLoading ? (
            <div className={styles.products}>
              {Array(6).fill(0).map((_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className={styles.noProducts}>No such products</div>
          ) : (
            <div className={styles.products}>
              {paginatedProducts.map((hit: Recipe) => (
                <ProductItem
                  key={hit.uri}
                  title={hit.label}
                  img={hit.image}
                  alt={hit.label}
                  id={hit.uri}
                  onRemove={() => removeProduct(hit.uri)}
                  descr={hit.ingredientLines?.join(', ') || 'no description'}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.pagination}>
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsList;

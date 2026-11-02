import { useState, useEffect, useCallback } from 'react';
import apiFetch from '../utils/api';
import useDebounce from './useDebounce';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 12 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [search, setSearch] = useState(initialParams.search || '');
  const [category, setCategory] = useState(initialParams.category || 'All');
  const [minPrice, setMinPrice] = useState(initialParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialParams.maxPrice || '');
  const [sort, setSort] = useState(initialParams.sort || 'featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 350);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (debouncedSearch) queryParams.append('search', debouncedSearch);
      if (category && category !== 'All') queryParams.append('category', category);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);
      if (sort) queryParams.append('sort', sort);
      if (inStockOnly) queryParams.append('inStockOnly', 'true');
      queryParams.append('page', page);
      queryParams.append('limit', 12);

      const res = await apiFetch(`/products?${queryParams.toString()}`);
      if (res.data) {
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, minPrice, maxPrice, sort, inStockOnly, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSort('featured');
    setInStockOnly(false);
    setPage(1);
  };

  return {
    products,
    pagination,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
    inStockOnly,
    setInStockOnly,
    page,
    setPage,
    resetFilters,
    refetch: fetchProducts,
  };
};

export default useProducts;


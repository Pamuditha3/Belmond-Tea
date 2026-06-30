import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import API_BASE_URL from '../config/api';

const CollectionScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get active filters from URL
  const activeType = searchParams.get('type') || '';
  const activeFormat = searchParams.get('format') || '';

  // Determine current active filter key (e.g. 'type-gifts' or 'all')
  let activeFilterKey = 'all';
  if (activeType) {
    activeFilterKey = `type-${activeType}`;
  } else if (activeFormat) {
    activeFilterKey = `format-${activeFormat}`;
  }

  // Fetch products from server whenever parameters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeType) params.type = activeType;
        if (activeFormat) params.format = activeFormat;

        const res = await axios.get(`${API_BASE_URL}/products`, { params });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeType, activeFormat]);

  // Handle filter selection
  const handleFilterClick = (filterKey) => {
    if (filterKey === 'all') {
      setSearchParams({});
    } else {
      const [key, value] = filterKey.split('-');
      setSearchParams({ [key]: value });
    }
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Determine title for the catalog heading
  const getCatalogTitle = () => {
    switch (activeFilterKey) {
      case 'type-classic-black-teas': return 'Classic black teas';
      case 'type-fruit-and-herbal-teas': return 'Flavoured black teas';
      case 'type-green-teas-and-tisanes': return 'Green teas and tisanes';
      case 'type-gifts': return 'Tea gifts';
      case 'type-wellness-collection': return 'Wellness Collection';
      case 'format-sachets': return 'Sachet format';
      case 'format-leaf-and-granules': return 'Leaf and granules';
      case 'format-pyramids': return 'Pyramid format';
      default: return 'Our Teas';
    }
  };

  return (
    <main className="wrapper collection-container">
      {/* Sidebar Filters */}
      <aside className="collection-sidebar">
        <div className="filter-group">
          <h3 className="filter-group__title">Types</h3>
          <ul className="filter-list">
            <li className={`filter-item ${activeFilterKey === 'all' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('all'); }}>Show All Teas</a>
            </li>
            <li className={`filter-item ${activeFilterKey === 'type-classic-black-teas' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('type-classic-black-teas'); }}>Classic black teas</a>
            </li>
            <li className={`filter-item ${activeFilterKey === 'type-fruit-and-herbal-teas' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('type-fruit-and-herbal-teas'); }}>Flavoured black teas</a>
            </li>
            <li className={`filter-item ${activeFilterKey === 'type-green-teas-and-tisanes' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('type-green-teas-and-tisanes'); }}>Green teas and tisanes</a>
            </li>
          </ul>
        </div>

        <div className="filter-group">
          <h3 className="filter-group__title">Collections</h3>
          <ul className="filter-list">
            <li className={`filter-item ${activeFilterKey === 'type-gifts' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('type-gifts'); }}>Tea gifts</a>
            </li>
            <li className={`filter-item ${activeFilterKey === 'type-wellness-collection' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('type-wellness-collection'); }}>Wellness Collection</a>
            </li>
          </ul>
        </div>

        <div className="filter-group">
          <h3 className="filter-group__title">Formats</h3>
          <ul className="filter-list">
            <li className={`filter-item ${activeFilterKey === 'format-sachets' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('format-sachets'); }}>Sachets</a>
            </li>
            <li className={`filter-item ${activeFilterKey === 'format-leaf-and-granules' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('format-leaf-and-granules'); }}>Leaf and granules</a>
            </li>
            <li className={`filter-item ${activeFilterKey === 'format-pyramids' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleFilterClick('format-pyramids'); }}>Pyramids</a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Catalog Section */}
      <section className="collection-catalog">
        <h1>{getCatalogTitle()}</h1>
        <div className="h1-desc">royal blends created by tea masters</div>
        
        {loading ? (
          <p className="text-center" style={{ padding: '60px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            Fetching royal teas...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center" style={{ gridColumn: 'span 3', padding: '60px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            No teas found matching this category.
          </p>
        ) : (
          <div className="product-grid">
            {products.map(p => (
              <ProductCard key={p._id} product={p} onSelect={openDetails} />
            ))}
          </div>
        )}
      </section>

      {/* Details modal */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeDetails}
      />
    </main>
  );
};

export default CollectionScreen;

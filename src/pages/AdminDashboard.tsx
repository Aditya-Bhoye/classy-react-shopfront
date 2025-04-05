
import { useState, useEffect } from 'react';
import { ProductType } from '../types/types';
import { sampleProducts } from '../data/sampleData';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? value : value
    }));
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      image: '',
      category: ''
    });
    setIsFormVisible(true);
  };

  const handleEdit = (product: ProductType) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category
    });
    setIsFormVisible(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: ProductType = {
      id: formData.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      image: formData.image || 'https://via.placeholder.com/150',
      category: formData.category
    };
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editingProduct.id ? newProduct : product
      ));
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    
    // Reset form
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  const cancelForm = () => {
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  // Get unique categories for the form
  const categories = Array.from(
    new Set(products.map(product => product.category))
  );

  if (loading) {
    return (
      <div className="container text-center py-10">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn" onClick={handleAddNew}>
            Add New Product
          </button>
        </div>
        
        {isFormVisible && (
          <div className="product-form-container">
            <div className="product-form">
              <h2>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="new">New Category</option>
                    </select>
                  </div>
                  
                  {formData.category === 'new' && (
                    <div className="form-group">
                      <label htmlFor="newCategory">New Category Name</label>
                      <input
                        type="text"
                        id="newCategory"
                        name="category"
                        value={formData.category === 'new' ? '' : formData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={cancelForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-thumbnail"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn edit-btn" 
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

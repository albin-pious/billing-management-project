import { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import ProductCard from '../components/home/ProductCards';
import ProductModal from '../components/home/ProductModal';
import MultiSelectControls from '../components/home/MultiSelectController';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BASE_URL, deleteApi, getApi, postApi, putApi } from '../utils/api';
import BillConfirmationModal from '../components/home/BillConfirmationModal';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [billData, setBillData] = useState(null);
  const [pdfPath, setPdfPath] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getApi('/products');
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
    };
  
    try {
      if (currentProduct) {
        await putApi(`/products?id=${currentProduct._id}`, newProduct);
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p._id === currentProduct._id ? { ...p, ...newProduct } : p))
        );
      } else {
        const response = await postApi('/products', newProduct); 
        setProducts((prevProducts) => [...prevProducts, response.data]); 
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
        await deleteApi(`/products?id=${id}`)
        setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
        setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((p) => p._id !== id));
    } catch (error) {
        console.error('Error deleting product:', error);
    }
  };

  const handleToggleMultiSelect = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    setSelectedProducts([]);
  };

  const handleSelectProduct = (id, quantity) => {
    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find(p => p.productId === id);
      if (existingProduct) {
        if (quantity === 0) {
          return prevSelected.filter(p => p.productId !== id);
        }
        return prevSelected.map(p => p.productId === id ? { ...p, quantity } : p);
      } else {
        return [...prevSelected, { productId: id, quantity }];
      }
    });
  };
  

    const handleCreateBill = async () => {
        try {
            const billData = selectedProducts.map(sp => ({
                productId: sp.productId,
                quantity: sp.quantity
            }));
    
            const response = await postApi('/bill', { products: billData });
        
            setBillData({
                billId: response.bill._id,
                products: response.bill.products.map(p => ({
                    name: p.name || 'Unknown Product',
                    quantity: p.quantity,
                    price: p.price,
                    _id: p._id
                })),
                createdBy: response.bill.createdBy || 'Unknown',
                totalAmount: response.bill.totalAmount || 0
            });
            setPdfPath(`${BASE_URL}${response.pdfUrl}` || '');
            setOpenBillModal(true);
        } catch (error) {
            console.error('Error creating bill:', error);
        }
    };
  

  const handleLogout = () => {
    alert('Logged out successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Dashboard</h1>
          <MultiSelectControls
            isMultiSelectMode={isMultiSelectMode}
            handleToggleMultiSelect={handleToggleMultiSelect}
            handleCreateBill={handleCreateBill}
            selectedProducts={selectedProducts}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Create Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isMultiSelectMode={isMultiSelectMode}
              selectedProducts={selectedProducts}
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleSelectProduct={handleSelectProduct}
            />
          ))}
        </div>
        <Box>
        {isMultiSelectMode && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateBill}
          disabled={selectedProducts.length === 0}
        >
          Create Bill
        </Button>
      )}
        </Box>

        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSaveProduct}
          currentProduct={currentProduct}
        />

        { billData && (
            <BillConfirmationModal
                open={openBillModal} 
                onClose={() => setOpenBillModal(false)} 
                billData={billData} 
                pdfPath={pdfPath}
            /> 
        )}
      </div>
    </div>
  );
};

export default Home;


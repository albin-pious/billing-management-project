import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardActions, Typography, IconButton, Checkbox, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProductCard = React.memo(({ product, isMultiSelectMode, handleEditProduct, handleDeleteProduct, handleSelectProduct }) => {
  const selectedProducts = useSelector(state => state.selectedProducts);

  const isOutOfStock = product.quantity === 0;

  const selectedProduct = useMemo(() => 
    selectedProducts.find(p => p.productId === product._id),
    [selectedProducts, product._id]
  );

  const isSelected = !!selectedProduct;

  const handleSelect = useCallback((checked) => {
    handleSelectProduct(product._id, checked ? 1 : 0, product.price);
  }, [handleSelectProduct, product._id, product.price]);

  const handleQuantityChange = useCallback((e) => {
    const quantity = Number(e.target.value);
    if (quantity > 0 && quantity <= product.quantity) {
      handleSelectProduct(product._id, quantity, product.price);
    }
  }, [handleSelectProduct, product._id, product.price, product.quantity]);

  return (
    <Card className="flex flex-col">
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: &#x20b9;{product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available: {isOutOfStock ? (
            <span className="text-green-500">Stock will refill soon</span>
          ) : (
            product.quantity
          )}
        </Typography>
        {isSelected && (
          <Typography variant="body2" color="primary">
            Payable: &#x20b9;{(product.price * selectedProduct.quantity).toFixed(2)}
          </Typography>
        )}
      </CardContent>
      <CardActions className="mt-auto">
        {isMultiSelectMode ? (
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <Typography variant="body2" className="text-red-500">Out of Stock</Typography>
            ) : (
              <>
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => handleSelect(e.target.checked)}
                />
                <TextField
                  type="number"
                  label="Quantity"
                  InputProps={{ inputProps: { min: 1, max: product.quantity } }}
                  value={isSelected ? selectedProduct?.quantity : ''}
                  onChange={handleQuantityChange}
                  disabled={!isSelected}
                  size="small"
                />
              </>
            )}
          </div>
        ) : (
          <>
            <IconButton onClick={() => handleEditProduct(product)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(product._id)} size="small">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
});

export default ProductCard;
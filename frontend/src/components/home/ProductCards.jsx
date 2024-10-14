import { Card, CardContent, CardActions, Typography, IconButton, Checkbox, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProductCard = ({ product, isMultiSelectMode, selectedProducts, handleEditProduct, handleDeleteProduct, handleSelectProduct }) => {
  const isOutOfStock = product.quantity === 0;

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
      </CardContent>
      <CardActions className="mt-auto">
        {isMultiSelectMode ? (
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <Typography variant="body2" className="text-red-500">Out of Stock</Typography>
            ) : (
              <>
                <Checkbox
                  checked={selectedProducts.some(p => p.productId === product._id)}
                  onChange={(e) => handleSelectProduct(product._id, e.target.checked ? 1 : 0)}
                />
                <TextField
                  type="number"
                  label="Quantity"
                  InputProps={{ inputProps: { min: 1, max: product.quantity } }}
                  value={selectedProducts.find(p => p.productId === product._id)?.quantity || ''}
                  onChange={(e) => {
                    const quantity = Number(e.target.value);
                    // Set quantity to max if it exceeds available quantity
                    if (quantity > product.quantity) {
                      handleSelectProduct(product._id, product.quantity);
                    } else {
                      handleSelectProduct(product._id, quantity);
                    }
                  }}
                  disabled={!selectedProducts.some(p => p.productId === product._id)}
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
};

export default ProductCard;

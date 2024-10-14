import { Modal, Button, TextField } from '@mui/material';

const ProductModal = ({ isOpen, onClose, onSubmit, currentProduct }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{currentProduct ? 'Edit Product' : 'Create Product'}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <TextField
            name="name"
            label="Name"
            fullWidth
            defaultValue={currentProduct?.name || ''}
            required
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            defaultValue={currentProduct?.price || ''}
            required
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            defaultValue={currentProduct?.quantity || ''}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductModal;

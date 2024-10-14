import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const BillConfirmationModal = ({ open, onClose, billData, pdfPath }) => {
  // Helper function to safely convert values to string
  const safeToString = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value || '');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-blue-500 text-white">Bill Created Successfully</DialogTitle>
      <DialogContent className="p-4">
        <p className="font-bold mb-2">Bill ID: {safeToString(billData?.billId)}</p>
        <p className="mb-2">Created By: {safeToString(billData?.createdBy?.name)}</p>
        <ul className="list-disc list-inside mb-4">
          {billData?.products?.map((product, index) => (
            <li key={index}>
              <strong>{safeToString(product.name)}</strong> | 
              Quantity: {safeToString(product.quantity)} | 
              Price: &#x20b9;{safeToString(product.price)} | 
              Subtotal: &#x20b9;{((Number(product.quantity) || 0) * (Number(product.price) || 0)).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="font-bold">
          Total Amount: &#x20b9;{(Number(billData?.totalAmount) || 0).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mt-2">You can download the bill as a PDF below.</p>
      </DialogContent>
      <DialogActions>
        <a href={pdfPath} download target="_blank" rel="noopener noreferrer">
          <Button className="text-white bg-blue-500 hover:bg-blue-600 hover:text-white">
            Download PDF
          </Button>
        </a>
        <Button onClick={onClose} className="text-gray-700">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillConfirmationModal;

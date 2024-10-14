import { Checkbox, Button } from '@mui/material';

const MultiSelectControls = ({ isMultiSelectMode, handleToggleMultiSelect, handleCreateBill, selectedProducts }) => {
  return (
    <div className="flex items-center gap-4">
      <Checkbox
        checked={isMultiSelectMode}
        onChange={handleToggleMultiSelect}
        color="primary"
      />
      <span className="text-sm">Select products</span>
    </div>
  );
};

export default MultiSelectControls;

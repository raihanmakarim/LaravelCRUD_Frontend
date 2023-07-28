import React from "react";

interface DropdownMenuProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  itemId: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onEdit,
  onDelete,
  itemId,
}) => {
  return (
    <select
      className="block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-700 text-sm focus:ring focus:ring-blue-300"
      onChange={(e) => {
        const action = e.target.value;
        if (action === "edit") {
          onEdit(itemId);
        } else if (action === "delete") {
          onDelete(itemId);
        }
      }}
    >
      <option value="" disabled>
        Select Action
      </option>
      <option value="edit">Edit</option>
      <option value="delete">Delete</option>
    </select>
  );
};

export default DropdownMenu;

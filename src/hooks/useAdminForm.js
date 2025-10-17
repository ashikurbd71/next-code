import { useState } from 'react';

export function useAdminForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    const openDialog = (item = null) => {
        setEditingItem(item);
        setFormData(item || {});
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    return {
        isDialogOpen,
        setIsDialogOpen,
        editingItem,
        setEditingItem,
        formData,
        setFormData,
        openDialog,
        closeDialog
    };
}

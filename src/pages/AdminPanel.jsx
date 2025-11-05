import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
import { supabase } from '../supabaseClient';
import CardComponent from '../components/Card'; // Home.jsx’teki ile aynı kart

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ id: '', title: '', description: '', price: '', images: [], category: '' });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loadingf, setLoadingf] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' | 'error' | 'warning' | 'info'
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const fetchProducts = async () => {
        setLoadingf(true);
        const { data, error } = await supabase.from('products').select('*').order('order_index', { ascending: true });
        if (error) console.error(error);
        else {
            // JSONB formatındaki images’ı parse et
            const parsed = data.map(item => ({
                ...item,
                images: typeof item.images === 'string' ? JSON.parse(item.images) : item.images,
            }));
            setProducts(parsed);
        }
        setLoadingf(false);
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenAdd = () => {
        setSelectedProduct({ id: '', title: '', description: '', price: '', images: [], category: '' });
        setSelectedFiles([]);
        setOpenAdd(true);
    };

    const handleOpenEdit = (product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    const handleCloseAdd = () => setOpenAdd(false);
    const handleCloseEdit = () => setOpenEdit(false);


    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleAddProduct = async () => {
        let uploadedUrls = [];

        if (selectedFiles.length > 0) {
            for (const file of selectedFiles) {
                const fileName = `${Date.now()}_${file.name}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file);

                if (uploadError) {
                    console.error('Yükleme hatası:', uploadError);
                    continue;
                }

                const { data: publicData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName);

                if (publicData?.publicUrl) {
                    uploadedUrls.push(publicData.publicUrl);
                }
            }
        }

        const payload = {
            title: selectedProduct.title,
            price: selectedProduct.price,
            category: selectedProduct.category,
            images: uploadedUrls,
            order_index: products.length + 1,
        };

        const { error } = await supabase.from('products').insert([payload]);
        if (error) {
            console.error('Ekleme hatası:', error);
            setSnackbar({
                open: true,
                message: 'Ürün eklenemedi!',
                severity: 'error',
            });
        } else {
            setSnackbar({
                open: true,
                message: 'Ürün başarıyla eklendi ✅',
                severity: 'success',
            });
            fetchProducts();
            handleCloseAdd();
        }

    };

    // ✏️ Ürün düzenleme
    const handleUpdateProduct = async () => {
        const payload = {
            title: selectedProduct.title,
            price: selectedProduct.price,
            category: selectedProduct.category,
        };

        const { error } = await supabase.from('products').update(payload).eq('id', selectedProduct.id);
        if (error) {
            console.error('Güncelleme hatası:', error);
            setSnackbar({
                open: true,
                message: 'Ürün güncellenemedi!',
                severity: 'error',
            });
        } else {
            setSnackbar({
                open: true,
                message: 'Ürün başarıyla Güncellendi ✅',
                severity: 'success',
            });
            fetchProducts();
            handleCloseEdit();
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm('Bu çiçeği silmek istediğine emin misin?')) {
            await supabase.from('products').delete().eq('id', id);
            setSnackbar({
                open: true,
                message: 'Ürün başarıyla Silindi ✅',
                severity: 'success',
            });
            fetchProducts();
        }
    };
    const handleMoveProduct = async (id) => {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return;

        const newProducts = [...products];
        if (index > 0) {
            [newProducts[index - 1].order_index, newProducts[index].order_index] =
                [newProducts[index].order_index, newProducts[index - 1].order_index];
        }
        // Veritabanına güncelle
        await Promise.all(
            newProducts.map(p =>
                supabase.from('products')
                    .update({ order_index: p.order_index })
                    .eq('id', p.id)
            )
        );

        // State’i güncelle
        setProducts(newProducts.sort((a, b) => a.order_index - b.order_index));
    };
    const handleMoveProduct2 = async (id) => {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return;

        const newProducts = [...products];
        if (index < newProducts.length - 1) {
            [newProducts[index + 1].order_index, newProducts[index].order_index] =
                [newProducts[index].order_index, newProducts[index + 1].order_index];
        }
        // Veritabanına güncelle
        await Promise.all(
            newProducts.map(p =>
                supabase.from('products')
                    .update({ order_index: p.order_index })
                    .eq('id', p.id)
            )
        );

        // State’i güncelle
        setProducts(newProducts.sort((a, b) => a.order_index - b.order_index));
    };

    const handleLogout = async () => {
        setLogoutLoading(true);
        const { error } = await supabase.auth.signOut();
        setLogoutLoading(false);

        if (error) {
            console.error('Çıkış hatası:', error);
            setSnackbar({
                open: true,
                message: 'Çıkış Yapılamadı!',
                severity: 'error',
            });
        } else {
            navigate('/admin-login');
        }
    };
    if (loadingf) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress color='black' />
            </Box>
        );
    }
    return (
        <Box sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column', // Dikey dizilim (üst üste)
            alignItems: 'center',
        }}>
            {logoutLoading && (
                <Box display="flex" alignItems="center" mb={2}>
                    <CircularProgress size={20} sx={{ mr: 1 }} color='black' />
                    <Typography variant="body2">Çıkış yapılıyor...</Typography>
                </Box>
            )}
            <Typography gutterBottom sx={{ fontWeight: '800', backgroundColor: 'white', borderRadius: '15px', fontSize: '35px' }}>🌸 Admin Paneli 🌸</Typography>
            <Button variant="contained" onClick={handleOpenAdd} sx={{ mb: 2, backgroundColor: 'green', fontSize: '18px' }}>
                Yeni Çiçek Ekle
            </Button>
            <Button variant="contained" onClick={handleLogout} sx={{ mb: 2, backgroundColor: 'red', fontSize: '18px', width: '170px' }}>
                Çıkış Yap
            </Button>

            {/* Çiçek listesi */}
            <Grid container spacing={2} justifyContent="space-evenly">
                {products.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Box>
                            {/* Home.jsx’deki CardComponent */}
                            <CardComponent
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                images={item.images && item.images.length > 0 ? item.images : ["https://via.placeholder.com/400x350?text=Resim+Yok"]}
                                isAdmin={true}
                                onEdit={() => handleOpenEdit(item)}
                                onDelete={() => handleDelete(item.id)}
                                moveProduct={() => handleMoveProduct(item.id)}
                                moveProduct2={() => handleMoveProduct2(item.id)}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* 🟢 Yeni Ürün Ekle Dialog */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Yeni Çiçek Ekle</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Başlık"
                        fullWidth
                        margin="dense"
                        value={selectedProduct.title}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                    />
                    <TextField
                        label="Kategori (vazolu/buket)"
                        fullWidth
                        margin="dense"
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    />
                    <TextField
                        label="Fiyat"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={selectedProduct.price}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                    />

                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Görsel Seç (1 veya daha fazla)
                        <input type="file" accept="image/*" multiple hidden onChange={handleFileChange} />
                    </Button>

                    {selectedFiles.length > 0 && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {selectedFiles.length} dosya seçildi
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>İptal</Button>
                    <Button onClick={handleAddProduct} variant="contained">Kaydet</Button>
                </DialogActions>
            </Dialog>

            {/* ✏️ Ürün Güncelle Dialog */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Ürünü Düzenle</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Başlık"
                        fullWidth
                        margin="dense"
                        value={selectedProduct.title}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                    />
                    <TextField
                        label="Kategori (vazolu/buket)"
                        fullWidth
                        margin="dense"
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    />
                    <TextField
                        label="Fiyat"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={selectedProduct.price}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>İptal</Button>
                    <Button onClick={handleUpdateProduct} variant="contained">Güncelle</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // ✅ sağ üst köşe
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '60%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>

    );
};

export default AdminPanel;

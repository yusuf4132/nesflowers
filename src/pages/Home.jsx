import React, { useEffect, useState } from 'react';
import CardComponent from '../components/Card'; // Yolunu ayarlayın
import { supabase } from '../supabaseClient';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState('hepsi');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true }); // id sırasına göre sırala (küçükten büyüğe)

    if (error) console.error('Supabase Hatası:', error);
    else setCards(data);
    setLoading(false);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const filteredCards = cards.filter((item) => {
    if (filter === 'buket') return item.category === 'buket';
    if (filter === 'vazolu') return item.category === 'vazolu';
    return true;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress color='black' />
      </Box>
    );
  }
  return (

    <Box sx={{ p: 3 }}>
      {/* Sağ üst filtre kutusu */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl size="small" sx={{
          minWidth: 150, backgroundColor: "#f5f4e8", '& label.Mui-focused': {
            color: 'black', // Label tıklanınca yeşil olsun
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black', // Tıklanınca border rengi
          },
        }}>
          <InputLabel sx={{ color: "black" }}>Filtrele</InputLabel>
          <Select value={filter} label="Filtrele" onChange={handleChange}>
            <MenuItem value="hepsi">Hepsi</MenuItem>
            <MenuItem value="buket">Buket</MenuItem>
            <MenuItem value="vazolu">Vazolu</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} justifyContent="space-evenly">
        {filteredCards.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <CardComponent
              id={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              images={item.images}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
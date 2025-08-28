import React, { useEffect, useState } from 'react';
import CardComponent from '../components/Card'; // Yolunu ayarlayın
import data from '../data/data.json'; // src altındaki data.json dosyası
import { Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState('hepsi');

  useEffect(() => {
    setCards(data);
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  // ID'lere göre filtreleme
  const buketIds = [13, 15, 19, 20, 30, 21, 22, 27, 28, 23, 24, 26, 3, 14, 18, 7, 33, 34];      // Buket ürün id'leri
  const vazoluIds = [1, 31, 32, 25, 2, 12, 16, 17, 4, 6, 11];         // Vazolu ürün id'leri

  const filteredCards = cards.filter((item) => {
    if (filter === 'buket') return buketIds.includes(item.id);
    if (filter === 'vazolu') return vazoluIds.includes(item.id);
    return true; // hepsi
  });

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
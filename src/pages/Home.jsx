import React, { useEffect, useState } from 'react';
import CardComponent from '../components/Card'; // Yolunu ayarlayın
import data from '../data/data.json'; // src altındaki data.json dosyası
import { Box, Grid } from '@mui/material';

const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(data);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} justifyContent="space-evenly">
        {cards.map((item) => (
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
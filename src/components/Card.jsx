import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CardComponent = ({ title, description, price, images, isAdmin = false, onEdit,
    onDelete, moveProduct, moveProduct2 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Card sx={{ minWidth: 300, maxWidth: 350, m: 2, position: 'relative' }}>
            {/* Resim ve ok butonları */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    image={images[currentIndex]}
                    alt={title}
                    sx={{ height: 350, objectFit: 'center' }}
                />
                {images.length > 1 && (
                    <>
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                transform: 'translateY(-50%)',
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' }
                            }}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                transform: 'translateY(-50%)',
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' }
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </>
                )}
            </Box>

            <CardContent sx={{ backgroundColor: "#f5f4e8" }}>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {price} ₺
                </Typography>
                {/* Admin butonları */}
                {isAdmin && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button size="small" variant="outlined" onClick={onEdit}>
                            Düzenle
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={onDelete}
                        >
                            Sil
                        </Button>
                    </Box>
                )}
                {isAdmin && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button variant="outlined" onClick={moveProduct}>↑</Button>
                        <Button variant="outlined" onClick={moveProduct2}>↓</Button>

                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ backgroundColor: "#f5f4e8" }}>
            </CardActions>
        </Card>
    );
};

export default CardComponent;
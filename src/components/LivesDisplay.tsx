import React from 'react';
import { Box, Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface LivesDisplayProps {
    max_lives: number;
    lives: number;
}

export default function LivesDisplay(props: LivesDisplayProps) {
    return (
        <Box alignItems={"center"} display="flex" justifyContent="center">
            {Array.from({ length: props.max_lives }, (_, i) => (
                <Box key={i}>
                    <Icon color="primary" fontSize="large">
                        {props.lives > i ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Icon>
                </Box>
            ))}
        </Box>
        
    );
};
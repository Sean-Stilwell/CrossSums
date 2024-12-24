'use client';

import React from 'react';
import { Box, Button, Grid2 as Grid } from '@mui/material';

interface GameProps {
    rows: number;
    columns: number;
}

const Game: React.FC<GameProps> = ({ rows, columns }) => {
    const clickCell = (row: number, column: number) => {
        console.log(`Clicked cell ${row},${column}`);
        console.log(`Cell value: ${board[row][column]}`);
        console.log(`Cell used: ${used[row][column]}`);
    };

    // This board is a 2D array of integers that represents the game board. It is initialized with all zeros.
    const board = Array.from({ length: rows }).map(() => Array.from({ length: columns }).map(() => 0));

    // This board is a 2D array of booleans that indicates whether a cell is used in the active game. It is initialized with all false.
    const used = Array.from({ length: rows }).map(() => Array.from({ length: columns }).map(() => false));

    // These arrays store the sum of the rows and columns. They are initialized with zeros.
    const rowSums = Array.from({ length: rows }).map(() => 0);
    const columnSums = Array.from({ length: columns }).map(() => 0);

    // Iterate over the board. 40% chance that any board is assigned a non-zero value (less than 10).
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (Math.random() < 0.4) {
                // Assign a random integer between 1 and 9.
                board[i][j] = Math.floor(Math.random() * 9) + 1;
                used[i][j] = true;
            }
            else {
                board[i][j] = Math.floor(Math.random() * 9) + 1;
                used[i][j] = false;
            }
        }
    }

    // Calculate the sum of the rows and columns.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!used[i][j]) {
                continue;
            }
            rowSums[i] += board[i][j];
            columnSums[j] += board[i][j];
        }
    }

    return (
        // Create the mxn grid of buttons. Each button displays the row and column index and assigned value from the board. It is enabled if the cell is used.
        // Under the columns, we display the sum of the column. To the right of the rows, we display the sum of the row.
        <Box>
            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                {board.map((row, i) => (
                    <Grid key={i}>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                            {row.map((value, j) => (
                                <Grid key={j}>
                                    <Button variant="contained" color="primary" onClick={() => clickCell(i, j)}>
                                        {i},{j} {value}
                                    </Button>
                                </Grid>
                            ))}
                            <Grid>
                                <Button variant="outlined" color="primary">
                                    {rowSums[i]}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" style={{ marginTop: "8px" }}>
                {columnSums.map((value, i) => (
                    <Grid key={i}>
                        <Button variant="outlined" color="primary">
                            {value}
                        </Button>
                    </Grid>
                ))}
                <Grid>
                    <Button variant="text" color="primary" disabled />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Game;
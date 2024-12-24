'use client';

import React from 'react';
import { Box, Button, Grid2 as Grid, Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface GameProps {
    rows: number;
    columns: number;
}

const Game: React.FC<GameProps> = ({ rows, columns }) => {
    const [lives, setLives] = React.useState(3);
    const [board, setBoard] = React.useState<number[][]>([]);
    const [used, setUsed] = React.useState<boolean[][]>([]);
    const [clicked, setClicked] = React.useState<boolean[][]>([]);
    const [rowSums, setRowSums] = React.useState<number[]>([]);
    const [columnSums, setColumnSums] = React.useState<number[]>([]);

    const clickCell = (row: number, column: number) => {
        console.log(`Clicked cell ${row},${column}`);
        console.log(`Cell value: ${board[row][column]}`);
        console.log(`Cell used: ${used[row][column]}`);
        console.log(`Lives: ${lives}`);

        const newLives = !used[row][column] ? lives - 1 : lives;
        const newClicked = [...clicked];
        newClicked[row][column] = true;

        setLives(newLives);
        setClicked(newClicked);
    };

    const createBoard = (rows: number, columns: number) => {
        const board = Array.from({ length: rows }).map(() => Array.from({ length: columns }).map(() => 0));
        const used = Array.from({ length: rows }).map(() => Array.from({ length: columns }).map(() => false));
        const clicked = Array.from({ length: rows }).map(() => Array.from({ length: columns }).map(() => false));
        const rowSums = Array.from({ length: rows }).map(() => 0);
        const columnSums = Array.from({ length: columns }).map(() => 0);

        // Randomly assign values to the board. 40% of the cells are used.
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (Math.random() < 0.4) {
                    board[i][j] = Math.floor(Math.random() * 9) + 1;
                    used[i][j] = true;
                }
                else {
                    board[i][j] = Math.floor(Math.random() * 9) + 1;
                    used[i][j] = false;
                }
            }
        }

        // Calculate the row and column sums.
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (!used[i][j]) {
                    continue;
                }
                rowSums[i] += board[i][j];
                columnSums[j] += board[i][j];
            }
        }

        setBoard(board);
        setUsed(used);
        setClicked(clicked);
        setRowSums(rowSums);
        setColumnSums(columnSums);
    }

    const getCellColour = (row: number, column: number): "primary" | "success" | "error" => {
        if (clicked[row][column]) {
            return used[row][column] ? "success" : "error";
        }
        return "primary";
    }

    React.useEffect(() => {
        createBoard(rows, columns);
    }, []);

    return (
        // Create the mxn grid of buttons. Each button displays the row and column index and assigned value from the board. It is enabled if the cell is used.
        // Under the columns, we display the sum of the column. To the right of the rows, we display the sum of the row.
        <Box>
            <Box alignItems={"center"} display="flex" justifyContent="center">
                <Icon color="primary" fontSize="large">
                    {lives > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Icon>
                <Icon color="primary" fontSize="large">
                    {lives > 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Icon>
                <Icon color="primary" fontSize="large">
                    {lives > 2 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Icon>
            </Box>
            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                {board.map((row, i) => (
                    <Grid key={i}>
                        <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
                            {row.map((value, j) => (
                                <Grid key={j}>
                                    <Button variant="contained" color={getCellColour(i, j)} onClick={() => clickCell(i, j)}>
                                        {value}
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
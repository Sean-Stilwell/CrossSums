'use client';

import React from 'react';
import { Box, Button, Grid2 as Grid } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import LivesDisplay from './LivesDisplay';
import HelpModal from './HelpModal';

interface GameProps {
    rows: number;
    columns: number;
    messages: {
        win: string;
        newgame: string;
        lose: string;
        helptitle: string;
        helpcontent: string;
        close: string;
    }
}

const Game: React.FC<GameProps> = ({ rows, columns, messages }) => {
    const [lives, setLives] = React.useState(3);
    const [board, setBoard] = React.useState<number[][]>([]);
    const [used, setUsed] = React.useState<boolean[][]>([]);
    const [clicked, setClicked] = React.useState<boolean[][]>([]);
    const [rowSums, setRowSums] = React.useState<number[]>([]);
    const [columnSums, setColumnSums] = React.useState<number[]>([]);

    const MAX_LIVES = 3;

    const clickCell = (row: number, column: number) => {
        const newLives = !used[row][column] ? lives - 1 : lives;
        const newClicked = [...clicked];
        newClicked[row][column] = true;

        setLives(newLives);
        setClicked(newClicked);

        if (checkWin()) {
            alert(messages.win);
            createBoard(rows, columns);
        }
        if (newLives === 0) {
            alert(messages.lose);
            createBoard(rows, columns);
        }
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

        setLives(MAX_LIVES);
        setBoard(board);
        setUsed(used);
        setClicked(clicked);
        setRowSums(rowSums);
        setColumnSums(columnSums);
    }

    const checkWin = (): boolean => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // Verify that all used cells have been clicked.
                if (!clicked[i][j] && used[i][j]) {
                    return false;
                }
            }
        }
        return true;
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
            <LivesDisplay max_lives={MAX_LIVES} lives={lives} />
            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center" marginTop={2}>
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
            <Box alignItems={"center"} display="flex" justifyContent="center" marginTop={2}>
                {/* <Button variant="contained" startIcon={<HelpIcon />}>
                    {messages.help}
                </Button> */}
                <HelpModal title={messages.helptitle} content={messages.helpcontent} close={messages.close} />
                <Button variant="contained" startIcon={<SyncIcon />} onClick={() => createBoard(rows, columns)} style={{ marginLeft: "8px" }}>
                    {messages.newgame}
                </Button>
            </Box>
        </Box>
    );
};

export default Game;
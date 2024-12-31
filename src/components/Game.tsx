'use client';

import React from 'react';
import { Box, Button, Grid2 as Grid } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import LivesDisplay from './LivesDisplay';
import HelpModal from './HelpModal';
import GameOverModal from './GameOverModal';

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
        rowmessage: string;
        columnmessage: string;
    }
}

const Game: React.FC<GameProps> = ({ rows, columns, messages }) => {
    const [lives, setLives] = React.useState(3);
    const [board, setBoard] = React.useState<number[][]>([]);
    const [used, setUsed] = React.useState<boolean[][]>([]);
    const [clicked, setClicked] = React.useState<boolean[][]>([]);
    const [rowSums, setRowSums] = React.useState<number[]>([]);
    const [columnSums, setColumnSums] = React.useState<number[]>([]);
    const [win, setWin] = React.useState(false);
    const [lose, setLose] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const MAX_LIVES = 3;

    const clickCell = (row: number, column: number) => {
        const newLives = !used[row][column] ? lives - 1 : lives;
        const newClicked = [...clicked];
        newClicked[row][column] = true;

        setLives(newLives);
        setClicked(newClicked);

        if (checkWin()) {
            setWin(true);
        } else if (newLives === 0) {
            setLose(true);
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
        setWin(false);
        setLose(false);
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

    const clickRowOrColumnValue = (row: number, column: number, isRow: boolean) => {
        if (isRow) {
            setSnackbarMessage(`${messages.rowmessage} ${rowSums[row]}`);
        }
        else {
            setSnackbarMessage(`${messages.columnmessage} ${columnSums[column]}`);
        }
        setOpenSnackbar(true);
    }

    const closeSnackbar = () => {
        setOpenSnackbar(false);
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
                                    <Button variant="contained" color={getCellColour(i, j)} onClick={() => clickCell(i, j)} disabled={win || lose}>
                                        {value}
                                    </Button>
                                </Grid>
                            ))}
                            <Grid>
                                <Button variant="outlined" color="primary"  disabled={win || lose} onClick={() => clickRowOrColumnValue(i, 0, true)}>
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
                        <Button variant="outlined" color="primary" disabled={win || lose} onClick={() => clickRowOrColumnValue(0, i, false)}>
                            {value}
                        </Button>
                    </Grid>
                ))}
                <Grid>
                    <Button variant="text" color="primary" disabled />
                </Grid>
            </Grid>
            <Box alignItems={"center"} display="flex" justifyContent="center" marginTop={2}>
                <HelpModal title={messages.helptitle} content={messages.helpcontent} close={messages.close} />
                <Button variant="contained" startIcon={<SyncIcon />} onClick={() => createBoard(rows, columns)} style={{ marginLeft: "8px" }}>
                    {messages.newgame}
                </Button>
            </Box>
            <GameOverModal display={win} message={messages.win} setFunc={setWin} resetGame={createBoard} rows={rows} columns={columns} />
            <GameOverModal display={lose} message={messages.lose} setFunc={setLose} resetGame={createBoard} rows={rows} columns={columns} />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' } as SnackbarOrigin}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Game;
#include <stdio.h>

#define N 9

int board[N][N];

// Check if number placement is safe
int isSafe(int row, int col, int num)
{
    for (int x = 0; x < N; x++)
    {
        if (board[row][x] == num)
            return 0;
    }

    for (int x = 0; x < N; x++)
    {
        if (board[x][col] == num)
            return 0;
    }

    int startRow = row - row % 3;
    int startCol = col - col % 3;

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            if (board[startRow + i][startCol + j] == num)
                return 0;
        }
    }

    return 1;
}

// Solve Sudoku
int solveSudoku()
{
    int row, col;
    int empty = 0;

    for (row = 0; row < N; row++)
    {
        for (col = 0; col < N; col++)
        {
            if (board[row][col] == 0)
            {
                empty = 1;
                break;
            }
        }

        if (empty)
            break;
    }

    if (!empty)
        return 1;

    for (int num = 1; num <= 9; num++)
    {
        if (isSafe(row, col, num))
        {
            board[row][col] = num;

            if (solveSudoku())
                return 1;

            board[row][col] = 0;
        }
    }

    return 0;
}

int main()
{
    // Read input from Flask
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            scanf("%d", &board[i][j]);
        }
    }

    // Solve puzzle
    if (solveSudoku())
    {
        // Print ONLY numbers
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < N; j++)
            {
                printf("%d ", board[i][j]);
            }
        }
    }

    return 0;
}
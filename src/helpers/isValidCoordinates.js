export function isValidCoordinates(row, col) {
    return row >= 0 && row <= 9 && col >= 0 && col <= 9;
}
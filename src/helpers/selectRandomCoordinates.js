export function selectRandomCoordinates(availableCoordinates) {
    checkIfObject(availableCoordinates);
    checkIfObjectEmpty(availableCoordinates);

    const keys = Object.keys(availableCoordinates);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    availableCoordinates[randomKey].key = randomKey;
    return availableCoordinates[randomKey];
}

function checkIfObject(availableCoordinates) {
    if (
        availableCoordinates === null ||
        typeof availableCoordinates !== "object" ||
        Array.isArray(availableCoordinates) || 
        typeof availableCoordinates === "function"
    ) {
        throw new Error("Invalid input. selectRandomCoordinates expects an object.");
    }
}

function checkIfObjectEmpty(availableCoordinates) {
    if (Object.keys(availableCoordinates).length === 0) {
        throw new Error("No available coordinates.");
    }
}
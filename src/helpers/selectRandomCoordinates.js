export function selectRandomCoordinates(availableCoordinates) {
    const keys = Object.keys(availableCoordinates);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    availableCoordinates[randomKey].key = randomKey;
    return availableCoordinates[randomKey];
}
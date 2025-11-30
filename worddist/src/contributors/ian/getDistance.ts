export function getDistance(A: string = "", B: string = ""): number {
    const [Al, Bl] = [A.length, B.length];
    const matrix = Array(Bl+1).fill(null).map(() => Array(Al+1).fill(null));
    for (let i=0; i<=Al; i++) matrix[0][i] = i;
    for (let j=0; j<=Bl; j++) matrix[j][0] = j;
    for (let j=1; j<=Bl; j++) {
        for (let i=1; i<=Al; i++) {
            const eq = A[i-1] === B[j-1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i-1] + 1, // delete
                matrix[j-1][i] + 1, // insert
                matrix[j-1][i-1] + eq // replace
            );
        }
    }
    return matrix[Bl][Al];
}

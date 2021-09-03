export type TurnType = 'X' | 'O' | '';

export interface BoardData {
    figurePlacement: Array<TurnType>;
    nextPlayer: string;
}

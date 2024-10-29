import { Character, Film } from "./swapi.types";

export interface FilmState {
	films: { [id: string]: Film } | null;
	characters: Character[] | null;
	loading: boolean;
	loadingChar: boolean;
	error: any;
  }
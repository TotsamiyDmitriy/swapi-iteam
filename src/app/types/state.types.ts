import { Character, Film } from "./swapi.types";

export interface FilmState {
	films: { [id: string]: Film } | null;
	characters: { [id: string]: Character[] } | null;
	loading: boolean;
	error: any;
  }

export interface GetData<T> {
	count : number,
	next? : string,
	previous? : string | null,
	results : T
}


export interface Film {
	title : string,
	episode_id : number,
	opening_crawl : string,
	director : string,
	producer : string,
	release_date : string,
	characters : string[],
}

export interface Character {
	id :string
	name: string,
	height: number,
	mass : number,
	hair_color: string,
	skin_color: string,
	eye_color:string,
	birth_year: string,
	gender: 'male' | 'female' | string,
	homeworld : string,
	films: string[],
	url : string,
}
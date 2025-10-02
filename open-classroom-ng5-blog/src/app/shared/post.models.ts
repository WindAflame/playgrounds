export class Post {

    constructor(
        public title: string, 
        public content: string, 
        public loveIts: number,
        // number for store date on firebase
        public created_at: number
    ){  }

}

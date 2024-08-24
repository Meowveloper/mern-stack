export class Post {
    private _id : number;
    private _title : string;
    constructor (id : number, title : string) {
      this._id = id;
      this._title = title;
    }
  
    get id () : number {
      return this._id;
    }
  
    get title() : string {
      return this._title;
    }
  }
  
export class Posts {
    private _posts : Post[];
    constructor (posts : Post[]) {
      this._posts = posts;
    }
  
    get posts () : Array<Post> {
      return this._posts;
    }
  
    deletePost(id : number, setState : React.Dispatch<React.SetStateAction<Posts>>) : void {
      setState((prevPosts: Posts) => new Posts(prevPosts.posts.filter((item : Post) => item.id !== id)));
    }
  }

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

	setTitle (title : string, setState : React.Dispatch<React.SetStateAction<Post>>) : void {
		setState(prev => new Post(prev.id, title));
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
	addPost(post : Post, setState : React.Dispatch<React.SetStateAction<Posts>>) : void {
		setState((prev : Posts) => new Posts([...prev.posts, post]));
	}
  }

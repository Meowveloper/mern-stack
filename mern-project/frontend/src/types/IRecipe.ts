interface IRecipe {
   _id? : string;
   title : string;
   image? : File | string;
   description : string; 
   ingredients : string[];
   createdAt? : Date | string;
   updatedAt? : Date | string;
}
export default IRecipe;
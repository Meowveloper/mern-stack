interface IRecipe {
   _id? : string;
   title : string;
   description : string; 
   ingredients : string[];
   createdAt? : Date | string;
   updatedAt? : Date | string;
}
export default IRecipe;
import ICommonError from "./ICommonError";
interface IRecipeError {
    title? : ICommonError<string>;
    description? : ICommonError<string>;
    ingredients? : ICommonError<string[]>;
}



export default IRecipeError;


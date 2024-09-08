import ICommonError from "./ICommonError";

interface IRegisterError {
    name? : ICommonError<string>;
    email? : ICommonError<string>;
    password? : ICommonError<string>;
}

export default IRegisterError;
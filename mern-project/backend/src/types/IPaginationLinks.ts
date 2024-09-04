interface IPaginationLinks {
    nextPage : boolean; 
    previousPage : boolean;
    currentPage : number;
    loopAbleLinks : Array<{number : number}>;
}

export default IPaginationLinks;
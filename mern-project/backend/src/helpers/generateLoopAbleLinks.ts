import IPaginationLinks from "../types/IPaginationLinks";

function generateLoopAbleLinks (totalPage : number) : IPaginationLinks["loopAbleLinks"] {
    const data = [];

    for(let i = 0; i < totalPage ; i++) {
        data.push({ number : i + 1 });
    };

    return data;
}

export default generateLoopAbleLinks;
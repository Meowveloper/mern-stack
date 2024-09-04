import React from "react";
import IPaginationLinks from "../../types/IPaginationLinks";
import { Link } from "react-router-dom";
import EnumRoutes from "../../types/EnumRoutes";

interface Props {
    paginationLinks: IPaginationLinks;
}
export default function Pagination({ paginationLinks }: Props) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                {paginationLinks.previousPage && (
                    <li>
                        <Link to={`${EnumRoutes.Home}?page=${paginationLinks.currentPage - 1}`} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </Link>
                    </li>
                )}

                {paginationLinks.loopAbleLinks.map((item: { number: number }) => {
                    if (item.number === paginationLinks.currentPage) {
                        return (
                            <li key={item.number}>
                                <Link to={`${EnumRoutes.Home}?page=${item.number}`} aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                    {item.number}
                                </Link>
                            </li>
                        );
                    } else {
                        return (
                            <li key={item.number}>
                                <Link to={`${EnumRoutes.Home}?page=${item.number}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    {item.number}
                                </Link>
                            </li>
                        );
                    }
                })}

                {paginationLinks.nextPage && (
                    <li>
                        <Link to={`${EnumRoutes.Home}?page=${paginationLinks.currentPage + 1}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

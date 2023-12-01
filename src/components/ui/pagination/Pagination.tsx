'use client';
import { generatePagination } from "@/utils/generatePaginationNumbers";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages:number;
}

export const Pagination = ({totalPages}:Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page') ?? 1;
  let currentPage = isNaN(Number(pageString)) ? redirect(pathName) : Number(pageString);

  if(currentPage < 1){
    redirect(pathName);
  }

  const allPages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber:number|string) => {
    const params = new URLSearchParams(searchParams);
    if(pageNumber === '...'){
      return `${pathName}?${params.toString()}`;
    }

    if(Number(pageNumber) <= 0){
      return `${pathName}`;
    }

    if(Number(pageNumber) > totalPages){
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  }

  return (
    // <!-- component -->
    <div className="flex justify-center mt-10 mb-32">

      <nav aria-label="Page navigation example ">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}><IoChevronBackOutline size={30}/>
            </Link>
          </li>

          {
            allPages.map((page, index) => (
              <li key={page+'-'+index} className="page-item">
                <Link
                  href={createPageUrl(page)}
                  className={clsx('page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none hover:bg-blue-200',{
                    'bg-gray-600 shadow-sm text-white hover:text-white hover:bg-blue-700': page === currentPage
                  })}>
                    {page}
                </Link>
              </li>
            ))
          }

          <li className="page-item">
            <Link
              href={createPageUrl(currentPage + 1)}
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"><IoChevronForwardOutline size={30}/>
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  )
}

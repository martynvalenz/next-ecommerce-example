
export const generatePagination = (currentPage:number, totalPages:number) => {
  // if there are less than 7 pages, show all pages
  if(totalPages < 7) {
    return Array.from({length: totalPages}, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
  }

  // if there are more than 7 pages, show only 7 pages
  if(currentPage <= 3){
    return [1,2,3,'...',totalPages - 1, totalPages]; // [1, 2, 3, '...',49,50]
  }

  // if actual page is in the last pages
  if(currentPage >= (totalPages - 2)){
    return [1,2,'...', totalPages - 2, totalPages - 1, totalPages]; // [1, 2, '...', 48, 49, 50]
  }

  // if actual page is in the middle
  return [1,'...',currentPage - 1, currentPage, currentPage + 1,'...',totalPages]; // [1, 2, '...', 24, 25, 26, '...', 49, 50]
}
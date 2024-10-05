import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { FC } from "react";

export const transformPages = (pages:number, currentPage:number, maxToShow: number, handleChangePage: (page:number)=>void) => {
  const elementPages = [];

  if(pages <= maxToShow) {
    for (let i = 1; i <= pages; i++) {
      elementPages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handleChangePage(i)}
            className={currentPage === i ? 'bg-primary text-white rounded-sm cursor-pointer' : 'cursor-pointer'}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    if (currentPage === 1) {
      for (let i = 1; i <= Math.min(pages, maxToShow); i++) {
        elementPages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handleChangePage(i)}
              className={currentPage === i ? 'bg-primary text-white rounded-sm cursor-pointer' : 'cursor-pointer'}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (pages > maxToShow) {
        elementPages.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    } else if (currentPage === pages) {
      for (let i = pages - maxToShow + 1; i <= pages; i++) {
        elementPages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handleChangePage(i)}
              className={currentPage === i ? 'bg-primary text-white rounded-sm cursor-pointer' : 'cursor-pointer'}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      elementPages.unshift(
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      );
    } else {
      for (let i = currentPage - 1; i <= Math.min((currentPage + maxToShow -2), pages); i++) {
        elementPages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handleChangePage(i)}
              className={currentPage === i ? 'bg-primary text-white rounded-sm cursor-pointer' : 'cursor-pointer'}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      // Afficher un span avant et après la page actuelle
      if (currentPage > 2) {
        elementPages.unshift(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      if (currentPage <= pages-1 && (currentPage+(maxToShow-2) < pages)) {
        elementPages.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
  }

  return elementPages;
}

type ListingPaginationProps = {
  page:number;
  nbPages:number;
  handleChangePage:(page:number)=>void;
  maxToShow?: number;
}

export const PaginationComponent:FC<ListingPaginationProps> = ({page, nbPages, handleChangePage, maxToShow = 3}) => {

  const handleNext = () => {
    if(page === nbPages) return;
    const nextPage = page+1;
    handleChangePage(nextPage);
  }

  const handlePrevious = () => {
    if(page === 1) return;
    const previousPage = page-1;
    handleChangePage(previousPage);
  }

  // @ts-ignore
  return (
    <Pagination>
      <PaginationContent>
        {(page > 1) && <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>}
        {transformPages(nbPages, page, maxToShow, handleChangePage)}
        {(page < nbPages) && <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNext} />
        </PaginationItem>}
      </PaginationContent>
    </Pagination>
  )
}
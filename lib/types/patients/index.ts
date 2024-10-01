export type PatientListingFilters = {
  search: string;
  sort: 'creation_date_desc' | 'creation_date_asc';
  gender: 'M' | 'F' | 'ALL';
  createdBy: string[];
}

export type PatientListingPagination = {
  page: number;
  nbItemPerPage: number;
}
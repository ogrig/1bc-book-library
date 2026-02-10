type AvailabilityStatus = "available" | "borrowed";
export type { AvailabilityStatus };

type Book =
{
  id: number,
  title: string,
  author: string,
  isbn: string,
  publishedDate: string,
  owner: string,
  borrower: string,
  version: number
};
export type { Book };

type Crumb =
{
    id: string,
    name: string
}
export type { Crumb };

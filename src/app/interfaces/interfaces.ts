export type Status = "CAPTURED" | "COMPLETED" | "CREATED" | "FAILED" | "SETTLED";

export interface PaymentTransactionDto {
    id: string,
    amount: number,
    currency: string,
    description: string,
    status: Status
    createdAt: Date,
}

export interface PaymentDto {
    totalNumberOfItems: number
    numberOfPages: number,
    currentPage: number,
    pageSize: number,
    hasNext: boolean
    items: PaymentTransactionDto[],
}

export interface Parameters {
    page: number,
    size: number,
    status?: Status,
    createdAtStart?: string,
    createdAtEnd?: string
}

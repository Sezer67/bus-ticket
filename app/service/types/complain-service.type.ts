export type CreateComplainFormDataType = {
    subject: string;
    message: string;
    companyName?: string;
    serviceId: string;
}

export type CreateAnswerDataType = {
    id: string;
    answer: string;
}
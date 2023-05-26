import { UserType } from './user.type';

export * as formTypes from './form.type';
export * as reduxSliceTypes from './redux-slice.type';
export * as userTypes from './user.type';
export * as serviceTypes from './service.type';
export * as companyType from './company.type';

export type ComplainType = {
    id: string;
    companyName?: string;
    subject: string;
    message: string;
    answer?: string;
    isReadCompany: boolean;
    isReadCustomer: boolean;
    createdDate: string;
    updatedDate: string;
    userId: string;
    user?: UserType;
    companyOwnerId: string;
    serviceId: string;
}
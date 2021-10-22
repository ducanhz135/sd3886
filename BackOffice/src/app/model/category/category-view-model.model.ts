import { Status } from '../common/app-enums.model';

export class CategoryViewModel {
    Id:number;
    SortOrder: number;
    IsShowOnHome: boolean;
    ParentId: number;
    Status: Status;

    Name: string;
    SeoDescription: string;
    SeoTitle: string;
    LanguageId : string;
    SeoAlias: string;

}
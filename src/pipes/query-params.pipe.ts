import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { UrlQueryInterface } from "src/common/interfaces/url-query.interface";

@Injectable()
export class QueryParamsPipe implements PipeTransform {
  transform(query: UrlQueryInterface, metadata: ArgumentMetadata) {
    const { page, limit, ...filters } = query;
    return {
      page,
      limit,
      filters,
    };
  }
}

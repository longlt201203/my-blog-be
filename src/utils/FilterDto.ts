import { IsNumber, IsOptional } from "class-validator";

export default class FilterDto {
    @IsNumber({}, { message: "Page must be a number" })
    @IsOptional()
    page?: number;

    @IsNumber()
    @IsOptional()
    perPage?: number;
}
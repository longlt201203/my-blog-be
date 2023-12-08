import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export default class FilterDto {
    @Transform((params) => {
        try {
            return parseInt(params.value);
        } catch (e) {
            return params.value;
        }
    })
    @IsNumber({}, { message: "Page must be a number" })
    @IsOptional()
    page?: number;

    @Transform((params) => {
        try {
            return parseInt(params.value);
        } catch (e) {
            return params.value;
        }
    })
    @IsNumber()
    @IsOptional()
    perPage?: number;
}
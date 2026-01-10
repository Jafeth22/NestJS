import { IsArray, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateDetailDto } from './create-detail.dto';
import { Type } from 'class-transformer';
import { CreateReviewDto } from './create-review.dto';
import { CreateVenueDto } from './create-venue.dto';

export class CreateFilmDto {
  @IsString()
  @MinLength(1)
  title: string;

  @Type(() => CreateDetailDto)
  @ValidateNested()
  detail: CreateDetailDto;

  @Type(() => CreateReviewDto)
  @ValidateNested({ each: true })
  @IsArray()
  reviews: CreateReviewDto[];

  @Type(() => CreateVenueDto)
  @ValidateNested({ each: true })
  @IsArray()
  venues: CreateVenueDto[];
}

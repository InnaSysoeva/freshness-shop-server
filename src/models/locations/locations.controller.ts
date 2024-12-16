import { Controller, Get, Post, Body } from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { locationApiDescription } from "./location-api.description";

@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get("/countries")
  @ApiOperation(locationApiDescription.getCountries.apiOperation)
  @ApiResponse(locationApiDescription.getCountries.apiResponse)
  async getCountries(): Promise<string[]> {
    return await this.locationsService.getCountries();
  }

  @Post("/cities")
  @ApiOperation(locationApiDescription.getCities.apiOperation)
  @ApiResponse(locationApiDescription.getCities.apiResponse)
  async getCities(@Body("country") country: string): Promise<string[]> {
    return await this.locationsService.getCitiesByCountry(country);
  }
}

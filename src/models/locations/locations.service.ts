import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import errorMessages from "src/common/constants/error.messages";

@Injectable()
export class LocationsService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://countriesnow.space/api/v0.1/",
      timeout: 5000,
    });
  }

  async getCountries(): Promise<string[]> {
    try {
      const response = await this.axiosInstance.get("countries");

      return response.data.data.map(
        (item: { country: string }) => item.country,
      );
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Countries"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCitiesByCountry(country: string): Promise<string[]> {
    try {
      const response = await this.axiosInstance.post("countries/cities", {
        country,
      });

      return response.data.data;
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Cities"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

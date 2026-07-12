import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class HealthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async checkDatabase() {
    const result = await this.databaseService.query(
      "SELECT NOW() AS current_time"
    );

    return result.rows[0];
  }
}
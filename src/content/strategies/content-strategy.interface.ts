// src/content/strategies/content-strategy.interface.ts
import { ProvisionDto } from '../dto/provision.dto'

export interface ContentStrategy {
  provision(content: any, url: string, bytes: number): ProvisionDto
}

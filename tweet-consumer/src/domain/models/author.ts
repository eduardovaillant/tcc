import { PublicMetricsModel } from './public-metrics'

export interface AuthorModel {
  id: string
  username: string
  name: string
  profile_image_url: string
  url: string
  description: string
  public_metrics: PublicMetricsModel
  created_at: string
}

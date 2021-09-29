import { AuthorModel } from './author'
import { MatchinRuleModel } from './matching-rule'

export interface TweetModel {
  id: string
  text: string
  lang: string
  author: AuthorModel
  matching_rules: MatchinRuleModel[]
  created_at: string
}

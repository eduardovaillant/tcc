import { MessageBrokerService } from '@/infra/services'
import { TweetModel } from '@/domain/models'
import env from '@/config/env'

import needle from 'needle'

export class TweetStreamClient {
  constructor (
    private readonly eadBrokerService: MessageBrokerService,
    private readonly presentialBrokerService: MessageBrokerService
  ) {}

  async start (): Promise<void> {
    const config = { headers: { Authorization: `Bearer ${env.bearerToken}` } }
    const expansions = '?tweet.fields=created_at,lang&expansions=author_id&user.fields=created_at,description,profile_image_url,public_metrics,url'
    const streamUrl = 'https://api.twitter.com/2/tweets/search/stream' + expansions

    const stream = needle.get(streamUrl, config)

    stream.on('data', async (data) => {
      try {
        const json = JSON.parse(data)

        const tweet = this.tweetDataTransformer(json)

        const isEad = tweet.matching_rules.filter(rule => rule.tag === 'ead')

        if (isEad.length > 0) {
          this.eadBrokerService.publish(JSON.stringify(tweet))
        } else {
          this.presentialBrokerService.publish(JSON.stringify(tweet))
        }

      } catch (error) {
        console.error(error)
      }
    })
  }

  private tweetDataTransformer (json: any): TweetModel {
    return {
      id: json.data.id,
      text: json.data.text,
      author: json.includes.users.filter(user => user.id === json.data.author_id)[0],
      matching_rules: json.matching_rules ,
      created_at: json.data.created_at,
      lang: json.data.lang
    }
  }
}

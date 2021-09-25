import pika, csv, json

def main():
  connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
  channel = connection.channel()
  channel.queue_declare(queue='raw-tweets', durable='true')

  with open('tweets-collection.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    count = 0
    for row in csv_reader:    
      channel.basic_publish(exchange='', routing_key='tweets', body=json.dumps(parse_dict(row)))
      print
      count = count + 1      
    
     
  
  connection.close()

def parse_dict(raw_dict):
  parsed_dict = {
    'mongo_id': raw_dict['_id'],
    'twitter_id': raw_dict['id'],
    'lang': raw_dict['lang'],
    'text': raw_dict['text'],
    'author': {
      'id': raw_dict['author.id'],
      'name': raw_dict['author.name'],
      'profile_image_url': raw_dict['author.profile_image_url'],
      'url': raw_dict['author.url'],
      'username': raw_dict['author.username'],
      'description': raw_dict['author.description'],
      'created_at': raw_dict['author.created_at'],
      'public_metrics': {
        'followers_count': raw_dict['author.public_metrics.followers_count'],
        'following_count': raw_dict['author.public_metrics.following_count'],
        'listed_count': raw_dict['author.public_metrics.listed_count'],
        'tweet_count': raw_dict['author.public_metrics.tweet_count'],
      },
      'matching_rules': raw_dict['matching_rules'],
      'created_at': raw_dict['created_at']
    }
  }
  return parsed_dict


if __name__ == '__main__':
    main()
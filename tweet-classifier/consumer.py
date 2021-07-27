import pika, sys, os, json, time
import preprocessor as p
from googletrans import Translator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def main():
    translator = Translator()
    analyzer = SentimentIntensityAnalyzer()
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='tweets', durable='true')

    def callback(ch, method, properties, body):
        time.sleep(2)
        tweet = json.loads(body)
        translated_tweet = translator.translate(tweet['text'], src='pt', dest='en')
        clean_tweet = p.clean(translated_tweet.text)
        vs = analyzer.polarity_scores(clean_tweet)
        print("{:-<65} {}".format(tweet['text'], str(vs)))

    channel.basic_consume(queue='tweets', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
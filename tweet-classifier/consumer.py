import pika, sys, os, json, time
import preprocessor as p
import re, string, csv
from googletrans import Translator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.tokenize import TweetTokenizer
from nltk.stem import WordNetLemmatizer

PUNCUATION_LIST = list(string.punctuation)

def remove_punctuation(word_list):
    """Remove punctuation tokens from a list of tokens"""
    return [w for w in word_list if w not in PUNCUATION_LIST]      


def tweet_cleaner(tweet):
    translator = Translator()
    tknzr = TweetTokenizer()
    wnl = WordNetLemmatizer()

    lower_tweet = tweet.lower()
    # Removing URL links
    lower_tweet = re.sub(r'https?:\/\/\S+', '', lower_tweet)
    # Removing HTML referencies
    lower_tweet = re.sub(r'&[a-z]+;', '', lower_tweet)
    # Removing non letter characters
    lower_tweet = re.sub(r"[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s\(\-:\)\\\/\];='#]", '', lower_tweet)
    # Removing Twitter handlers
    lower_tweet = re.sub(r'@mention', '', lower_tweet)

    translated_tweet = translator.translate(lower_tweet, src='pt', dest='en')
    tokenized_tweet = tknzr.tokenize(translated_tweet.text)
    no_punctuations_tweets = remove_punctuation(tokenized_tweet)
    clean_tweet = [wnl.lemmatize(word) for word in no_punctuations_tweets]

    return clean_tweet, lower_tweet, translated_tweet.text


def main():    
    analyzer = SentimentIntensityAnalyzer()
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='tweets', durable='true')

    def callback(ch, method, properties, body):
        csvFile = open('tweets.csv', 'a')
        csvWriter = csv.writer(csvFile)
        tweet = json.loads(body)
        clean_tweet, lower_tweet, translated_tweet = tweet_cleaner(tweet['text'])
        # translated_tweet = translator.translate(tweet['text'], src='pt', dest='en')
        # clean_tweet = p.clean(translated_tweet.text)
        vs = analyzer.polarity_scores(translated_tweet)
        sentiment = ''
        if(vs['compound'] >= 0.05):
            sentiment = 'positive'
        elif(vs['compound'] > -0.05 and vs['compound'] < 0.05):
            sentiment = 'neutral'
        elif((vs['compound'] <= -0.05)):
            sentiment = 'negative'
        print("{:-<65} {} --> {}".format(tweet['text'], str(vs), sentiment))
        csvWriter.writerow([tweet['created_at'], tweet['text'].encode('utf-8'), lower_tweet, translated_tweet, clean_tweet, vs, sentiment])
        csvFile.close()

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
#!flask/bin/python
import six

from Tweet import Tweet
from SentimentAnalyze import Sentiment
from Statistics import Statistics

from flask import Flask, jsonify, abort, request, make_response, url_for
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.errorhandler(400)
@cross_origin()
def bad_request(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
@cross_origin()
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/')
@cross_origin()
def send_warnning():
    return "You must to specify a full address"

@app.route('/sentiment/analyze', methods=['GET'])
@cross_origin()
def analyze_text():
    analyze = Sentiment(request.args.get("text"))
    return jsonify({'sentiment': analyze.analyze_text()})

@app.route('/statistics/hashtag/<hashtagSearched>')
@cross_origin()
def getStatistics(hashtagSearched):
    statistics = Statistics(hashtagSearched)
    df = statistics.retrieveStatistics()
    result = df.to_dict(orient='index')
    # fix key error string
    result = {str(k):v for k,v in result.items()}
    json = jsonify({'statistics':result})
    return json

@app.route('/statistics/region/<codeRegion>')
@cross_origin()
def regionRouting(codeRegion):
    statistics = StatisticsByRegion(codeRegion)
    df = statistics.retrieveStatistics()
    result = df.to_dict(orient='index')
    # fix key error string
    result = {str(k):v for k,v in result.items()}
    json = jsonify({'statistics':result})
    return json

@app.route('/tweets/getTweetWithTime/<hashtagSearched>')
@cross_origin()
def get_tweet_with_time(hashtagSearched):

    myTweet = Tweet(hashtagSearched)
    tweets = myTweet.getTweetWithTime()
    result = tweets.to_dict(orient='index')
    result = {str(k):v for k,v in result.items()}
    return jsonify({'tweets': result})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)


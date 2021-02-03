from flask import Flask, render_template, url_for, request, session, redirect, jsonify, Response
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
from bson import json_util
from os import environ
import datetime
import bcrypt
import json
import os
import db

# define app as flask
app = Flask(__name__)

# jwt
people = db.db.users.find()
username_table = {u['username']: u for u in people}
userid_table = {u['_id']: u for u in people}

def authenticate(username, password):
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None)

app.config['SECRET_KEY'] = 'qwertyasdf'
jwt = JWT(app, authenticate, identity)

# enables CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# locate the directory of the app file
basedir = os.path.abspath(os.path.dirname(__file__))

# routes
@app.route('/')
@cross_origin()
def index():
    if 'username' in session:
        return render_template('signout.html')
    return render_template('signin.html')

@app.route('/signin', methods=['POST', 'GET'])
@cross_origin()
def signin():
    if 'username' in session:
        return render_template('signout.html')
    if request.method == 'POST':
        users = db.db.users
        signin_user = users.find_one({'username' : request.form['username']})
        if signin_user is None:
            signin_user = users.find_one({'email' : request.form['username']})
        if signin_user:
            if bcrypt.hashpw(request.form['password'].encode('utf-8'), signin_user['password']) == signin_user['password']:
                session['email'] = signin_user['email']
                return {'data' : signin_user['email']}
        return 'Invalid username or password'
    return render_template('signin.html')


@app.route('/signup', methods=['POST', 'GET'])
@cross_origin()
def signup():
    if 'username' in session:
        return render_template('signout.html')
    if request.method == 'POST':
        users = db.db.users
        existing_user = users.find_one({'email' : request.form['email']})
        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'username' : request.form['username'], 'password' : hashpass, 'email' : request.form['email'], 'avatar': 'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg', 'cover': 'https://coverfiles.alphacoders.com/114/114371.jpg', 'phone': '', 'dob' : request.form['dob'], 'following': [], 'followers': [], 'bio': 'Thank you for visiting my profile', 'saves': [], 'retweets': [], 'likes': []})
            return {'data' : 'created'}
        return 'Username taken!'
    return render_template('signup.html')

@app.route('/signout', methods=['GET'])
@cross_origin()
def signout():
        session.clear()
        return redirect(url_for('signin'))

@app.route('/email', methods=['POST'])
@cross_origin()
def email():
        users = db.db.users
        existing_user = users.find_one({'email' : request.form['email']})
        if existing_user is None:
            return "no"
        existing_user['_id'] = str(existing_user['_id'])
        existing_user['password']="secret"
        for x in existing_user['saves']:
            x['_id'] = str(x['_id'])
        for x in existing_user['likes']:
            x['_id'] = str(x['_id'])
        for x in existing_user['retweets']:
            x['_id'] = str(x['_id'])
        for x in existing_user['following']:
            x['_id'] = str(x['_id'])
        for x in existing_user['followers']:
            x['_id'] = str(x['_id'])
        return {"data":existing_user }

@app.route('/user', methods=['POST'])
@cross_origin()
def user():
        users = db.db.users
        existing_user = users.find_one({'username' : request.form['username']})
        if existing_user is None:
            return "no"
        existing_user['_id'] = str(existing_user['_id'])
        existing_user['password']="secret"
        for x in existing_user['saves']:
            x['_id'] = str(x['_id'])
        for x in existing_user['likes']:
            x['_id'] = str(x['_id'])
        for x in existing_user['retweets']:
            x['_id'] = str(x['_id'])
        for x in existing_user['following']:
            x['_id'] = str(x['_id'])
        for x in existing_user['followers']:
            x['_id'] = str(x['_id'])
        return {"data":existing_user }

@app.route('/tweet', methods=['POST'])
@cross_origin()
def tweet():
        users = db.db.users
        existing_user = users.find_one({'email' : request.form['email']})
        posts = db.db.posts
        if existing_user is None:
            return "no"
        s=[]
        for tweet in posts.find({'email' : request.form['email']}):
            tweet['_id'] = str(tweet['_id'])
            for x in tweet['comments']:
                x['_id'] = str(x['_id'])
            s.append(tweet)
        return {"data":s}

@app.route('/users', methods=['GET'])
@cross_origin()
def users():
        s=[]
        for user in db.db.users.find():
            user['_id'] = str(user['_id'])
            user['password']="secret"
            for x in user['saves']:
                x['_id'] = str(x['_id'])
            for x in user['likes']:
                x['_id'] = str(x['_id'])
            for x in user['retweets']:
                x['_id'] = str(x['_id'])
            for x in user['following']:
                x['_id'] = str(x['_id'])
            for x in user['followers']:
                x['_id'] = str(x['_id'])
            s.append(user)
        return {"data":s}

@app.route('/tweets', methods=['GET','POST'])
@cross_origin()
def tweets():
        if request.method == 'POST':
            users = db.db.users
            posts = db.db.posts
            user = users.find_one({'email' : request.form['email']})
            posts.insert({'username': user['username'], 'email': user['email'], 'avatar': user['avatar'], 'tweet': request.form['tweet'], 'img': request.form['img'], 'time': datetime.datetime.now().strftime("%X"), 'date': datetime.datetime.now().strftime("%x"),'likes': 0, 'retweets': 0, 'comments': []})
            return "ok"
        s=[]
        for post in db.db.posts.find():
            post['_id'] = str(post['_id'])
            for x in post['comments']:
                x['_id'] = str(x['_id'])
            s.append(post)
        return {"data":s}

@app.route('/like', methods=['POST'])
@cross_origin()
def like():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        posts.update_one({'_id' : ObjectId(request.form['id'])},{"$set":{'likes': post['likes']+1}})
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$push": {'likes': post}})
        return "ok"
        
@app.route('/unlike', methods=['POST'])
@cross_origin()
def unlike():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        posts.update_one({'_id' : ObjectId(request.form['id'])},{"$set":{'likes': post['likes']-1}})
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$pull": {'likes': post}})
        return "ok"
        
@app.route('/retweet', methods=['POST'])
@cross_origin()
def retweet():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        posts.update_one({'_id' : ObjectId(request.form['id'])},{"$set":{'retweets': post['retweets']+1}})
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$push": {'retweets': post}})
        return "ok"
        
@app.route('/unretweet', methods=['POST'])
@cross_origin()
def unretweet():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        posts.update_one({'_id' : ObjectId(request.form['id'])},{"$set":{'retweets': post['retweets']-1}})
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$pull": {'retweets': post}})
        return "ok"

@app.route('/save', methods=['POST'])
@cross_origin()
def save():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$push": {'saves': post}})
        return "ok"
        
@app.route('/unsave', methods=['POST'])
@cross_origin()
def unsave():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$pull": {'saves': post}})
        return "ok"

@app.route('/follow', methods=['POST'])
@cross_origin()
def follow():
        users = db.db.users
        user = users.find_one({'email' : request.form['email']})
        user2 = users.find_one({'username' : request.form['username']})
        users.update_one({'email' : request.form['email']},{"$push":{"following": user2['_id']}})
        users.update_one({'username' : request.form['username']},{"$push":{"followers": user['_id']}})
        return "ok"
        
@app.route('/unfollow', methods=['POST'])
@cross_origin()
def unfollow():
        users = db.db.users
        user = users.find_one({'email' : request.form['email']})
        user2 = users.find_one({'username' : request.form['username']})
        users.update_one({'email' : request.form['email']},{"$pull":{"following": user2['_id']}})
        users.update_one({'username' : request.form['username']},{"$pull":{"followers": user['_id']}})
        return "ok"

@app.route('/comment', methods=['POST'])
@cross_origin()
def comment():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        users = db.db.users
        user = users.find_one({'email' : request.form['email']})
        posts.update_one({'_id' : ObjectId(request.form['id'])},{"$push": {'comments': {'comment':request.form['comment'],'avatar': user['avatar'], 'email' : request.form['email'],'username' : user['username'], 'time': datetime.datetime.now().strftime("%X"), 'date': datetime.datetime.now().strftime("%x")}}})
        return "ok"

@app.route('/uncomment', methods=['POST'])
@cross_origin()
def uncomment():
        posts = db.db.posts
        post = posts.find_one({'_id' : ObjectId(request.form['id'])})
        users = db.db.users
        user = users.find_one({'email' : request.form['email']})
        posts.update_one({'_id' : ObjectId(request.form['id'])},{"$pull": {'comments': {'username' : user['username'], 'time': request.form['time'], 'date': request.form['date']}}})
        return "ok"

@app.route('/avatar', methods=['POST'])
@cross_origin()
def avatar():
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$set":{"avatar": request.form['avatar']}})
        return "ok"

@app.route('/cover', methods=['POST'])
@cross_origin()
def cover():
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$set":{"cover": request.form['cover']}})
        return "ok"

@app.route('/bio', methods=['POST'])
@cross_origin()
def bio():
        users = db.db.users
        users.update_one({'email' : request.form['email']},{"$set":{"bio": request.form['bio']}})
        return "ok"

# for database clearing purposes
# @app.route('/xdelx', methods=['GET'])
# @cross_origin()
# def wipe():
#         x = db.db.users
#         x.remove({"username": "someone"})
#         return "ok"

# run the flask app
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=environ.get("PORT", 5000))

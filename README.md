# Twitter Replica
 This repo is a replica version of the famous web app twitter

![Capture](https://user-images.githubusercontent.com/37650536/106132566-cab2a680-616c-11eb-9378-51719bed4725.PNG)

## Technologies used
- Frontend: Javascript : React 
- Server : Python : Flask
- Database : AtlasDB : Pymongo
- Deployment : Firebase

## Links ##
- frontend : https://twittrer2.web.app/
- backend: https://twittrer.herokuapp.com/

## New code lines used 
- to deploy docker to heroku
- ```docker build . -t name```
- ```heroku login```
- ```heroku container:login```
- ```heroku container:push web --app=herokuname```
- ```heroku container:release web --app=herokuname```

## How to run it :
1. Backend
   - Go from root directory to Backend directory
    ```
    cd Backend/
    ```
   - Install dependencies
    ```
    pip install -r requirements.txt
    ```
   - Run the server:
    ```
    cd Backend/
    python app.py
    ```
    
2. frontend
   - Go from root directory to client directory
   ```
   cd twitter/
   npm i
   ```
   - Run the app
   ```
   npm start
   ```
   
## Teams
- [Hamdallah](https://github.com/Hamdalla2) 
- [Hiba](https://github.com/hibtmimi) 
- [Shaima](https://github.com/shaima96)[Scrum master] 

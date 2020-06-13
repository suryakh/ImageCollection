from flask import Flask
from flask_cors import CORS
from flask import send_file
import json
from flask_mysqldb import MySQL

app = Flask(__name__,static_url_path="/static")
mysql = MySQL(app)
CORS(app)
app.config['MYSQL_HOST'] = 'us-cdbr-east-05.cleardb.net'
app.config['MYSQL_USER'] = 'bca7c8f7c7a205'
app.config['MYSQL_PASSWORD'] = '3e359f4f'
app.config['MYSQL_DB'] = 'heroku_b9209152872b2b0'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route('/return-files/')
def return_files_tut():
	try:
		return send_file('static/web.png', as_attachment=True)
	except Exception as e:
		return str(e)

from Blueprint_auth import auth
from Blueprint_upload import uploadData
from Blueprint_data import imagesData


app.register_blueprint(auth,url_prefix="/auth")
app.register_blueprint(uploadData,url_prefix="/upload")
app.register_blueprint(imagesData,url_prefix="/data")
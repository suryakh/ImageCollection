from flask import Flask
from flask_cors import CORS
from flask import send_file
import json
from flask_mysqldb import MySQL

app = Flask(__name__,static_url_path="/static")
mysql = MySQL(app)
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '$uryA11472'
app.config['MYSQL_DB'] = 'teamPumpkin'
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
from flask import Blueprint
from flask import request,jsonify
import jwt
import json
from server import mysql



uploadData = Blueprint('uploadData',__name__,static_url_path="/static")


@uploadData.route('/data',methods = ["POST"])
def datauploading():
    image = request.files['image']
    imagename = request.form['imageName']
    imagecategory = request.form ['imageCategory']
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        decode_data = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        location = "static/"+image.filename
        image.save(location)
        cursor = mysql.connection.cursor()
        cursor.execute(
            "INSERT INTO imagesData (imagename,imagepath,imagecategory,userid) values(%s,%s,%s,%s)""",(imagename,image.filename,imagecategory,decode_data['id'])
        )
        mysql.connection.commit()
        cursor.close()
        return json.dumps({"path":image.filename})
    except:
        return "error",400
from flask import Blueprint
from flask import request,jsonify
import jwt
import json
from server import mysql

imagesData =  Blueprint("imagesData",__name__,static_url_path="/static")

@imagesData.route('/imageslist',methods=["GET"])
def imageslist():
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    print(token)
    try:
        decode_data = jwt.decode(encoded_Data,'users',algorithms=['HS256'])
        print("hello")
        cursor = mysql.connection.cursor()
        cursor.execute(
            """SELECT imagesData.*,users.username FROM imagesData LEFT JOIN users ON imagesData.userid = users.id"""
        )
        results = cursor.fetchall()
        cursor.close()
        imagesList = []
        for img in results:
            imagesList.append(img)
        return jsonify(imagesList)
    except:
        return json.dumps({"message":"some error occurs"}),400    
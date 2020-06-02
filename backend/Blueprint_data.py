from flask import Blueprint
from flask import request, jsonify
from flask import send_file
import jwt
import json
import math
from server import mysql

imagesData = Blueprint("imagesData", __name__, static_url_path="/static")


@imagesData.route('/imageslist', methods=["GET"])
def imageslist():
    token = request.headers.get('Authorization')
    count = request.args.get("count", type=int)
    offset = request.args.get("offset", type=int)
    category = request.args.get("category")
    encoded_Data = token.split(' ')[0]
    print(category)
    try:
        jwt.decode(encoded_Data, 'users', algorithms=['HS256'])
        if category == "All":
            cursor = mysql.connection.cursor()
            cursor.execute(
                """SELECT imagesData.*,users.username FROM imagesData LEFT JOIN users ON imagesData.userid = users.id LIMIT %s,%s""", (
                    offset, count)
            )
            results = cursor.fetchall()
            cursor.execute(
                """SELECT COUNT(*) AS totalcount FROM imagesData"""
            )
            result = cursor.fetchone()
            cursor.close()
            imagesList = []
            for img in results:
                imagesList.append(img)
            totalpages = math.ceil(float(result['totalcount'] / float(count)))
            return jsonify({"totalpages": totalpages, "imageList": imagesList})
        else:
            cursor = mysql.connection.cursor()
            cursor.execute(
                """SELECT imagesData.*,users.username FROM imagesData LEFT JOIN users ON imagesData.userid = users.id where imagecategory = %s LIMIT %s,%s""", (
                    category, offset, count)
            )
            results = cursor.fetchall()
            cursor.execute(
                """SELECT COUNT(*) AS totalcount FROM imagesData where imagecategory = %s""", (category,)
            )
            result = cursor.fetchone()
            cursor.close()
            imagesList = []
            for img in results:
                imagesList.append(img)
            totalpages = math.ceil(float(result['totalcount'] / float(count)))
            return jsonify({"totalpages": totalpages, "imageList": imagesList})
    except:
        return json.dumps({"message": "some error occurs"}), 400


@imagesData.route('/download/<id>', methods=["GET"])
def downloadImage(id):
    token = request.headers.get('Authorization')
    encoded_Data = token.split(' ')[0]
    try:
        jwt.decode(encoded_Data, 'users', algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """SELECT imagesData.*,users.username FROM imagesData LEFT JOIN users ON imagesData.userid = users.id where imagesData.id = %s""", (
                id,)
        )
        results = cursor.fetchone()
        imagepath = results["imagepath"]
        downloads = results["downloads"]
        cursor.execute(
            """UPDATE imagesData SET downloads= %s where id = %s""", (
                downloads+1, id)
        )
        mysql.connection.commit()
        cursor.close()
        return json.dumps({"message":imagepath})
    except:
        return json.dumps({"message": "error"}), 400


@imagesData.route('/contributor', methods=["GET"])
def contributerData():
    token = request.headers.get('Authorization')
    count = request.args.get("count", type=int)
    offset = request.args.get("offset", type=int)
    encoded_Data = token.split(' ')[0]
    try:
        decode_data = jwt.decode(encoded_Data, 'users', algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
            """SELECT imagesData.*,users.username FROM imagesData LEFT JOIN users ON imagesData.userid = users.id where users.id = %s LIMIT %s,%s""", (
                decode_data['id'], offset, count)
        )
        results = cursor.fetchall()
        cursor.execute(
            """SELECT COUNT(*) AS totalcount FROM imagesData WHERE userid = %s""", (
                decode_data['id'],)
        )
        result = cursor.fetchone()
        cursor.close()
        contributorData = []
        for ele in results:
            contributorData.append(ele)
        totalpages = math.ceil(float(result['totalcount'] / float(count)))

        return jsonify({"totalpages": totalpages, "contributorData": contributorData})
    except:
        return json.dumps({"message": "some error occurs"}), 400

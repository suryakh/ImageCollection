from flask import Blueprint
from flask import request,jsonify
import os
import json
import base64
import hashlib
import jwt
from server import mysql


auth = Blueprint("auth",__name__,static_url_path="/static")


@auth.route("/signup" ,methods=["POST"])
def register():
    username = request.json["username"]
    email= request.json["email"]
    usertype = request.json["userType"]
    password = request.json["password"]
    salt = generate_salt().decode('utf-8')
    password_hash = hasing(password + str(salt))
    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO users (username, email, salt, password_hash,usertype)
        VALUES (%s, %s, %s, %s,%s )""", (username, email, salt, password_hash,usertype)
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps({"message":"updated"})

@auth.route("/login" ,methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute(
    """select * from users where username= %s""",(username,)
    )
    results = cursor.fetchone()
    if results != None:
        user = results
        salt = user["salt"]
        password_hash = hasing(password+str(salt))
        if password_hash == user["password_hash"]:
            encode_Data = jwt.encode({"id":user["id"]},'users',algorithm= 'HS256').decode('utf-8')
            return json.dumps({"token":str(encode_Data),"username":user["username"],"userType":user['usertype']})
        else:
            return json.dumps({"message":"invalid input"}),400 
    else:
        return json.dumps({"message":"invalid input"}),400      

def generate_salt():
    salt = os.urandom(16)
    return base64.b64encode(salt)

def hasing(string):
    print(string)
    hash= hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

from flask import Flask, request, jsonify, json
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import pandas as pd
import ast
import military_symbol
import psycopg2

app = Flask(__name__)
CORS(app)
api = Api(app)

conn = psycopg2.connect(
    host="database-1.crloomeekb5b.us-east-2.rds.amazonaws.com",
    database="postgres",
    user="postgres",
    password="3QTc:r~_(+d6>:rGzB6Uy>b_5WyF",
)

cur = conn.cursor()


class St(Resource):
    def get(self):
        cur.execute("SELECT * FROM public.associations_2525d;")
        return (
            request.args.get("sidclist"),
            200,
        )

    def put(self):
        cur.execute(
            "INSERT INTO public.associations_2525d (searchtext, sidc) VALUES (%s, %s) ON CONFLICT (searchtext) DO UPDATE SET sidc = EXCLUDED.sidc;",
            (
                request.get_json().get("searchstring"),
                request.get_json().get("sidclist"),
            ),
        )
        conn.commit()
        return ("Record successfully inserted", 201)


class StSecond(Resource):
    pass


api.add_resource(St, "/st")
api.add_resource(StSecond, "/stsecond")

if __name__ == "__main__":
    app.run()

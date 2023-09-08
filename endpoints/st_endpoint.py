from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
import military_symbol

app = Flask(__name__)
api = Api(app)


class St(Resource):
    def get(self):
        return {"data": {"dat1": request.args.get("sidc")}}, 200


class StSecond(Resource):
    pass


api.add_resource(St, "/st")
api.add_resource(StSecond, "/stsecond")

if __name__ == "__main__":
    app.run()

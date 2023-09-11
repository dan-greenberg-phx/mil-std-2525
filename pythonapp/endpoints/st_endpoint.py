from flask import Flask, request, jsonify, json
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import pandas as pd
import ast
import military_symbol

app = Flask(__name__)
CORS(app)
api = Api(app)


class St(Resource):
    def get(self):
        symbol: military_symbol.MilitarySymbol = military_symbol.MilitarySymbol(
            symbol_schema=military_symbol.SymbolSchema.load_symbol_schema_from_file()
        )
        symbol.create_from_sidc(request.args.get("sidc"))
        print(type(symbol.get_svg()))
        jsontext = symbol.get_svg()
        print(jsontext)
        return symbol.get_svg(), 200


class StSecond(Resource):
    pass


api.add_resource(St, "/st")
api.add_resource(StSecond, "/stsecond")

if __name__ == "__main__":
    app.run()

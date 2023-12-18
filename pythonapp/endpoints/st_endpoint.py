from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import psycopg2
import openai
import sqlalchemy as db
from sqlalchemy import create_engine, MetaData, Table

app = Flask(__name__)
CORS(app)
api = Api(app)

engine = create_engine(
    "postgresql://postgres:waHZcI2s.P(ySdOi95-7_<$ZG$QG@database-1.crloomeekb5b.us-east-2.rds.amazonaws.com:5432/postgres"
)

metadata = MetaData()
connection = engine.connect()


def get_connection():
    return psycopg2.connect(
        host="database-1.crloomeekb5b.us-east-2.rds.amazonaws.com",
        database="postgres",
        user="postgres",
        password="waHZcI2s.P(ySdOi95-7_<$ZG$QG",
    )


# set up connection
conn = get_connection()
cur = conn.cursor()

# pull symbol
cur.execute("SELECT symbolset, symbolsetname FROM public.symbolset;")
symbols = cur.fetchall()

# pull icon
cur.execute(
    "SELECT symbolset, JSON_AGG(ARRAY[code, entity||' '||entity_type||' '||entity_subtype]) FROM public.icon GROUP BY symbolset;"
)
icons = {data[0]: data[1] for data in cur.fetchall()}

# pull firstid
cur.execute("SELECT code, description FROM public.firstid;")
firstids = cur.fetchall()

# pull affiliation
cur.execute("SELECT code, description FROM public.affiliation;")
affiliations = cur.fetchall()

# pull status
cur.execute("SELECT status, description FROM public.status;")
statuses = cur.fetchall()

# pull hqtfdummy
cur.execute(
    "SELECT symbolset, JSON_AGG(ARRAY[code, description]) FROM public.hqtfdummy GROUP BY symbolset;"
)
hqtfdummys = {data[0]: data[1] for data in cur.fetchall()}

# pull echelonmobility
cur.execute(
    "SELECT symbolset, JSON_AGG(ARRAY[code, description]) FROM public.echelonmobility GROUP BY symbolset;"
)
echelonmobilities = {data[0]: data[1] for data in cur.fetchall()}

# pull modifierone
cur.execute(
    "SELECT symbolset, JSON_AGG(ARRAY[code, description]) FROM public.modifierone GROUP BY symbolset;"
)
modifierones = {data[0]: data[1] for data in cur.fetchall()}

# pull modifiertwo
cur.execute(
    "SELECT symbolset, JSON_AGG(ARRAY[code, description]) FROM public.modifiertwo GROUP BY symbolset;"
)
modifiertwos = {data[0]: data[1] for data in cur.fetchall()}

# pull sidcs
sidcAlchemy = Table("sidc", metadata, autoload_with=engine)
query = db.select(sidcAlchemy.columns.sidc, sidcAlchemy.columns.svg)
result = connection.execute(query)
sidcs = result.fetchall()
# cur.execute("SELECT sidc, svg from public.sidc;")
# sidcs = cur.fetchall()

# close connection
conn.close()


def refresh_sidcs():
    global sidcs
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT sidc, svg from public.sidc;")
    sidcs = cur.fetchall()
    conn.close()


def post_data(query):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(query)
    conn.commit()


class Sym(Resource):
    def get(self):
        return (
            symbols,
            200,
        )


class Icon(Resource):
    def get(self):
        return (
            icons.get(request.args.get("sym")),
            200,
        )


class FirstId(Resource):
    def get(self):
        return (firstids, 200)


class Affiliation(Resource):
    def get(self):
        return (affiliations, 200)


class Status(Resource):
    def get(self):
        return (statuses, 200)


class HQTFDummy(Resource):
    def get(self):
        result = hqtfdummys.get(request.args.get("sym"))
        return (
            result if result is not None else [["0", "not applicable"]],
            200,
        )


class EchelonMobility(Resource):
    def get(self):
        result = echelonmobilities.get(request.args.get("sym"))
        return (
            result if result is not None else [["00", "unspecified"]],
            200,
        )


class ModifierOne(Resource):
    def get(self):
        result = modifierones.get(request.args.get("sym"))
        return (result if result is not None else [["00", "Unspecified"]], 200)


class ModifierTwo(Resource):
    def get(self):
        result = modifiertwos.get(request.args.get("sym"))
        return (result if result is not None else [["00", "Unspecified"]], 200)


class ValidSidc(Resource):
    def get(self):
        return ([a[0] for a in sidcs], 200)


class RefreshSidc(Resource):
    def get(self):
        refresh_sidcs()
        return ("Refreshed", 200)


class Sidc(Resource):
    def get(self):
        return (
            {k: v for (k, v) in sidcs},
            200,
        )

    def put(self):
        vals = ",".join(
            [
                f"('{a.get('sidc')}','{a.get('svg')}')"
                for a in request.get_json().get("sidcMapping")
            ]
        )
        post_data(
            f"INSERT INTO public.sidc (sidc, svg) VALUES {vals} ON CONFLICT (sidc) DO UPDATE SET svg = EXCLUDED.svg;",
        )
        # conn = get_connection()
        # cur = conn.cursor()
        # vals = [
        #     f"('{a.get('sidc')}','{a.get('svg')}')"
        #     for a in request.get_json().get("sidcMapping")
        # ]
        # psycopg2.execute_values(
        #     cur,
        #     "INSERT INTO public.sidc (sidc, svg) VALUES %s ON CONFLICT (sidc) DO UPDATE SET svg = EXCLUDED.svg;",
        #     vals,
        # )
        # conn.commit()
        # post_data(
        #     f"INSERT INTO public.sidc (sidc, svg) VALUES {vals} ON CONFLICT (sidc) DO UPDATE SET svg = EXCLUDED.svg;",
        # )
        # refresh_sidcs()
        return ("Inserted", 201)
        # return ("Inserted", 201)


class OpenAi(Resource):
    def get(self):
        return (
            openai.ChatCompletion.create(
                model="gpt-3.5-turbo-16k-0613",
                messages=[{"role": "user", "content": request.args.get("input")}],
            ),
            200,
        )


api.add_resource(Sym, "/sym")
api.add_resource(Icon, "/icon")
api.add_resource(FirstId, "/firstid")
api.add_resource(Affiliation, "/affiliation")
api.add_resource(Status, "/status")
api.add_resource(HQTFDummy, "/hqtfdummy")
api.add_resource(EchelonMobility, "/echelonmobility")
api.add_resource(ModifierOne, "/modifierone")
api.add_resource(ModifierTwo, "/modifiertwo")
api.add_resource(Sidc, "/sidc")
api.add_resource(ValidSidc, "/validsidc")
api.add_resource(RefreshSidc, "/refreshsidc")
api.add_resource(OpenAi, "/openai")

if __name__ == "__main__":
    app.run()

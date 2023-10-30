from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import psycopg2
import openai

app = Flask(__name__)
CORS(app)
api = Api(app)

conn = psycopg2.connect(
    host="database-1.crloomeekb5b.us-east-2.rds.amazonaws.com",
    database="postgres",
    user="postgres",
    password="XP|11jljz-HUGdF.VPoSxb<?6cLn",
)

cur = conn.cursor()


class Sym(Resource):
    def get(self):
        cur.execute("SELECT symbolset, symbolsetname FROM public.symbolset;")
        return (cur.fetchall(), 200)


class Icon(Resource):
    def get(self):
        cur.execute(
            f'SELECT code, entity||\' \'||entity_type||\' \'||entity_subtype FROM public.icon WHERE symbolset=\'{request.args.get("sym")}\';'
        )
        return (cur.fetchall(), 200)


class FirstId(Resource):
    def get(self):
        cur.execute("SELECT code, description FROM public.firstid;")
        return (cur.fetchall(), 200)


class Affiliation(Resource):
    def get(self):
        cur.execute("SELECT code, description FROM public.affiliation;")
        return (cur.fetchall(), 200)


class Status(Resource):
    def get(self):
        cur.execute("SELECT status, description FROM public.status;")
        return (cur.fetchall(), 200)


class HQTFDummy(Resource):
    def get(self):
        cur.execute(
            f'SELECT code, description FROM public.hqtfdummy WHERE symbolset=\'{request.args.get("sym")}\';'
        )
        result = cur.fetchall()
        return (
            result if len(result) > 0 else [["0", "not applicable"]],
            200,
        )


class EchelonMobility(Resource):
    def get(self):
        cur.execute(
            f'SELECT code, description FROM public.echelonmobility WHERE symbolset=\'{request.args.get("sym")}\';'
        )
        result = cur.fetchall()
        return (
            result if len(result) > 0 else [["00", "unspecified"]],
            200,
        )


class ModifierOne(Resource):
    def get(self):
        cur.execute(
            f'SELECT code, description FROM public.modifierone WHERE symbolset=\'{request.args.get("sym")}\';'
        )
        result = cur.fetchall()
        return (result if len(result) > 0 else [["00", "Unspecified"]], 200)


class ModifierTwo(Resource):
    def get(self):
        cur.execute(
            f'SELECT code, description FROM public.modifiertwo WHERE symbolset=\'{request.args.get("sym")}\';'
        )
        result = cur.fetchall()
        return (result if len(result) > 0 else [["00", "Unspecified"]], 200)


class ValidSidc(Resource):
    def get(self):
        cur.execute("SELECT sidc FROM public.sidc;")
        return (cur.fetchall(), 200)


class Sidc(Resource):
    def get(self):
        cur.execute("SELECT sidc, svg FROM public.sidc;")
        sidcSvgMapping = cur.fetchall()
        return (
            {
                k: v
                for (k, v) in zip(
                    [a[0] for a in sidcSvgMapping], [a[1] for a in sidcSvgMapping]
                )
            },
            200,
        )

    def put(self):
        vals = ",".join(
            [
                f"('{a.get('sidc')}','{a.get('svg')}')"
                for a in request.get_json().get("sidcMapping")
            ]
        )
        cur.execute(
            f"INSERT INTO public.sidc (sidc, svg) VALUES {vals} ON CONFLICT (sidc) DO UPDATE SET svg = EXCLUDED.svg;",
        )
        conn.commit()

        return ("Inserted", 201)


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
api.add_resource(OpenAi, "/openai")

if __name__ == "__main__":
    app.run()

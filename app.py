from flask import Flask
from flask import render_template
from flask import make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def show_page():
    retval = make_response(render_template("index.html"))
    return retval


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)

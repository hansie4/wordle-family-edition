from waitress import serve
import flaskr

serve(flaskr.app, host="0.0.0.0", port=5000)

from flask import Flask, render_template

app = Flask(__name__)

@app.get("/")
def hub():
    return render_template("hub.html")

@app.get("/snake")
def snake():
    return render_template("snake.html")

@app.get("/click")
def click():
    return render_template("click.html")

@app.get("/ttt")
def ttt():
    return render_template("ttt.html")

@app.get("/health")
def health():
    return "ok", 200

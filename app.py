from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import random

app = Flask(__name__)
app.secret_key = "super-secret-replace-this"  # replace in real repo

CHOICES = ["Stone", "Paper", "Scissors"]

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/players', methods=["GET", "POST"])
def players():
    if request.method == "POST":
        p1 = request.form.get("p1", "Player 1").strip() or "Player 1"
        p2 = request.form.get("p2", "Player 2").strip() or "Player 2"
        session['p1'] = p1
        session['p2'] = p2
        session['p1_choice'] = None
        session['p2_choice'] = None
        return redirect(url_for('game'))
    return render_template("players.html")

@app.route('/game')
def game():
    p1 = session.get('p1')
    p2 = session.get('p2')
    if not p1 or not p2:
        return redirect(url_for('players'))
    return render_template("game.html",
                           p1=p1, p2=p2,
                           p1_choice=session.get('p1_choice'),
                           p2_choice=session.get('p2_choice'))

@app.route('/api/play/<player>', methods=['POST'])
def api_play(player):
    if player not in ('p1', 'p2'):
        return jsonify({'error': 'invalid player'}), 400

    pick = random.choice(CHOICES)
    session[f'{player}_choice'] = pick

    response = {
        'player': player,
        'choice': pick,
        'p1_choice': session.get('p1_choice'),
        'p2_choice': session.get('p2_choice')
    }

    return jsonify(response)

def decide_winner(c1, c2):
    if c1 == c2:
        return "Draw"
    wins = {
        "Stone": "Scissors",
        "Scissors": "Paper",
        "Paper": "Stone"
    }
    return session.get('p1') if wins[c1] == c2 else session.get('p2')

@app.route('/result')
def result():
    c1 = session.get('p1_choice')
    c2 = session.get('p2_choice')
    if not c1 or not c2:
        return redirect(url_for('game'))

    winner = decide_winner(c1, c2)
    return render_template("result.html",
                           p1=session.get('p1'),
                           p2=session.get('p2'),
                           c1=c1, c2=c2, winner=winner)

@app.route('/reset')
def reset():
    session.clear()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)

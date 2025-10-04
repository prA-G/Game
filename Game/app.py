from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import random

app = Flask(__name__)
app.secret_key = "supersecret"

CHOICES = ["Stone", "Paper", "Scissor"]

def get_winner(p1_choice, p2_choice):
    if p1_choice == p2_choice:
        return "Draw"
    rules = {
        "Stone": "Scissor",   # Stone beats Scissor
        "Scissor": "Paper",   # Scissor beats Paper
        "Paper": "Stone"      # Paper beats Stone
    }
    if rules[p1_choice] == p2_choice:
        return "Player 1"
    else:
        return "Player 2"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/players', methods=['GET', 'POST'])
def players():
    if request.method == 'POST':
        session['p1'] = request.form['p1']
        session['p2'] = request.form['p2']
        session['p1_choice'] = None
        session['p2_choice'] = None
        return redirect(url_for('game'))
    return render_template('players.html')

@app.route('/game')
def game():
    return render_template('game.html',
                           p1=session.get('p1'),
                           p2=session.get('p2'),
                           p1_choice=session.get('p1_choice'),
                           p2_choice=session.get('p2_choice'))

@app.route('/api/play/<player>', methods=['POST'])
def play(player):
    choice = random.choice(CHOICES)
    if player == "p1":
        session['p1_choice'] = choice
    else:
        session['p2_choice'] = choice
    return jsonify({
        "choice": choice,
        "p1_choice": session.get('p1_choice'),
        "p2_choice": session.get('p2_choice')
    })

@app.route('/result')
def result():
    p1_choice = session.get('p1_choice')
    p2_choice = session.get('p2_choice')
    winner = get_winner(p1_choice, p2_choice)
    return render_template('result.html',
                           p1=session.get('p1'),
                           p2=session.get('p2'),
                           p1_choice=p1_choice,
                           p2_choice=p2_choice,
                           winner=winner)

@app.route('/reset')
def reset():
    session.clear()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)

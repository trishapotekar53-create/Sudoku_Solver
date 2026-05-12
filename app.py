from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import subprocess

app = Flask(__name__)

CORS(app)

# MySQL Connection

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root@123",
    database="sudoku_db"
)

cursor = db.cursor()

# SAVE PUZZLE

@app.route('/save', methods=['POST'])

def save_board():

    data = request.json

    board = str(data['board'])

    query = "INSERT INTO puzzles(board) VALUES(%s)"

    cursor.execute(query, (board,))

    db.commit()

    return jsonify({
        "message": "Puzzle Saved Successfully"
    })

# SOLVE PUZZLE USING C

@app.route('/solve', methods=['POST'])
def solve():

    data = request.json

    board = data['board']

    input_data = ""

    for value in board:

        if value == "":
            value = 0

        input_data += str(value) + " "

    try:

        result = subprocess.run(
            [r"D:\GUIDAA\sudoku.db\solver.exe"],
            input=input_data,
            text=True,
            capture_output=True,
            shell=True
        )

        output = result.stdout.strip().split()

        print(output)

        return jsonify({
            "solution": output
        })

    except Exception as e:

        print(e)

        return jsonify({
            "error": str(e)
        })

    # Run C solver

    result = subprocess.run(
        [r"D:\\GUIDAA\\sudoku.db\\solver.exe"],
        input=input_data,
        text=True,
        capture_output=True
    )

    solved = result.stdout.strip().split()

    return jsonify({
        "solution": solved
    })

if __name__ == '__main__':
    app.run(debug=True)
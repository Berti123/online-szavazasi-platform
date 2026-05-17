from flask import Blueprint, jsonify, request
from database.db import GetConnection
import json


polls_bp = Blueprint("polls", __name__)


# Osszes szavazas lekerese
@polls_bp.route("/polls", methods=["GET"])
def GetPolls():
    connection = GetConnection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM polls")
    polls = cursor.fetchall()

    connection.close()

    result = []

    for poll in polls:
        result.append({
            "id": poll["id"],
            "title": poll["title"],
            "description": poll["description"],
            "options": poll["options"],
            "created_at": poll["created_at"]
        })

    return jsonify(result)


# Szavazas eredmenyeinek lekerese
@polls_bp.route("/polls/<int:poll_id>/results", methods=["GET"])
def GetPollResults(poll_id):
    connection = GetConnection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT selected_option, COUNT(*) as vote_count
        FROM votes
        WHERE poll_id = ?
        GROUP BY selected_option
    """, (poll_id,))

    results = cursor.fetchall()
    connection.close()

    result = []

    for row in results:
        result.append({
            "selected_option": row["selected_option"],
            "vote_count": row["vote_count"]
        })

    return jsonify(result)


# Egy konkret szavazas lekerese
@polls_bp.route("/polls/<int:poll_id>", methods=["GET"])
def GetPollById(poll_id):
    connection = GetConnection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT * FROM polls
        WHERE id = ?
    """, (poll_id,))

    poll = cursor.fetchone()
    connection.close()

    if poll is None:
        return jsonify({
            "error": "Szavazas nem talalhato"
        }), 404

    return jsonify({
        "id": poll["id"],
        "title": poll["title"],
        "description": poll["description"],
        "options": json.loads(poll["options"]),
        "created_at": poll["created_at"]
    })
    

# Uj szavazas letrehozasa
@polls_bp.route("/polls", methods=["POST"])
def CreatePoll():
    data = request.json

    title = data.get("title")
    description = data.get("description")
    options = data.get("options")

    if not title or not options:
        return jsonify({
            "error": "Hiányzó adatok"
        }), 400
    
    if len(options) < 2:
        return jsonify({
            "error": "Legalább két opció szükséges"
        }), 400
    
    for option in options:
        if not option.strip():
            return jsonify({
                "error": "Az opciók nem lehetnek üresek"
            }), 400

    connection = GetConnection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO polls (title, description, options)
        VALUES (?, ?, ?)
    """, (
        title,
        description,
        json.dumps(options)
    ))

    connection.commit()

    new_poll_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Szavazas sikeresen letrehozva",
        "poll_id": new_poll_id
    }), 201
import json

from flask import Blueprint, jsonify, request
from database.db import GetConnection


votes_bp = Blueprint("votes", __name__)


# Szavazat rogzitese
@votes_bp.route("/votes", methods=["POST"])
def AddVote():
    data = request.json

    poll_id = data.get("poll_id")
    selected_option = data.get("selected_option")

    if not poll_id or not selected_option:
        return jsonify({
            "error": "Hianyzo adatok"
        }), 400

    connection = GetConnection()
    cursor = connection.cursor()

    # Szavazas ellenorzese
    cursor.execute("""
        SELECT * FROM polls
        WHERE id = ?
    """, (poll_id,))

    poll = cursor.fetchone()

    if poll is None:
        connection.close()

        return jsonify({
            "error": "Szavazás nem található"
        }), 404

    options = json.loads(poll["options"])

    # Opcio ellenorzese
    if selected_option not in options:
        connection.close()

        return jsonify({
            "error": "Érvénytelen szavazati opció"
        }), 400

    # Szavazat rogzitese
    cursor.execute("""
        INSERT INTO votes (poll_id, selected_option)
        VALUES (?, ?)
    """, (
        poll_id,
        selected_option
    ))

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Szavazat sikeresen rögzítve"
    })
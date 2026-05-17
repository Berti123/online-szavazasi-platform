import json
from database.db import GetConnection


# Tesztadatok feltoltese
def SeedDatabase():
    connection = GetConnection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM polls")
    poll_count = cursor.fetchone()[0]

    if poll_count == 0:
        options = json.dumps(["Igen", "Nem", "Talán"])

        cursor.execute("""
            INSERT INTO polls (title, description, options)
            VALUES (?, ?, ?)
        """, (
            "Szereted a Reactet?",
            "Egyszerű próba szavazás a rendszer teszteléséhez.",
            options
        ))

        connection.commit()

    connection.close()
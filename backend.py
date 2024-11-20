from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock database
items = []

# Get all items
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

# Add a new item
@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.json
    item = {
        "id": len(items) + 1,
        "name": data.get("name", ""),
        "description": data.get("description", "")
    }
    items.append(item)
    return jsonify(item), 201

# Update an item
@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    for item in items:
        if item["id"] == item_id:
            item["name"] = data.get("name", item["name"])
            item["description"] = data.get("description", item["description"])
            return jsonify(item)
    return jsonify({"error": "Item not found"}), 404

# Delete an item
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item["id"] != item_id]
    return jsonify({"message": "Item deleted"})

if __name__ == '__main__':
    app.run(debug=True)

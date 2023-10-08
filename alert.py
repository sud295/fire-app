from flask import Flask, jsonify, request
import requests
import csv
from io import StringIO
import yaml
from flask_cors import CORS
import time
from datetime import datetime, timedelta  # Add this import
import pickle
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

api_data = None
last_api_request_time = 0

@app.route('/alert', methods=['GET', 'POST']) 

def get_api_data():
    if request.method == 'POST':
        try:
            data = request.json

            with open(f"fire_list/{datetime.utcnow().timestamp()}.pkl", 'wb') as f:
                pickle.dump(data, f)
            
            return jsonify({'message': 'JSON data received successfully'}), 200
        except Exception as e:
            return jsonify({'error': 'Invalid JSON data'}), 400
    else:
        fire_data = []

        for filename in os.listdir("fire_list"):
            if filename.endswith(".pkl"):
                with open(os.path.join("fire_list", filename), 'rb') as f:
                    data = pickle.load(f)
                    fire_data.append(data)

        return jsonify(fire_data)


if __name__ == '__main__':
    app.run(debug=True)

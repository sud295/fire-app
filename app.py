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
def alerts():
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

def get_api_data():
    global api_data, last_api_request_time
    current_time = time.time()

    if current_time - last_api_request_time < 600:
        return api_data
    
    print("Fetching Data...")
    with open("keys.yml", 'r') as f:
        data = yaml.safe_load(f)
        api_key = data.get('apiKey')

    current_date = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    api_url = f'https://firms.modaps.eosdis.nasa.gov/api/country/csv/{api_key}/VIIRS_SNPP_NRT/USA/1/{current_date}'
    response = requests.get(api_url)
    
    if response.status_code == 200:
        csv_data = response.text

        data_list = []
        csv_reader = csv.DictReader(StringIO(csv_data))
        for row in csv_reader:
            filtered_data = {
                'latitude': row.get('latitude'),
                'longitude': row.get('longitude'),
                'bright_ti4': row.get('bright_ti4'),
                'bright_ti5': row.get('bright_ti5')
            }
            data_list.append(filtered_data)
        
        api_data = data_list
        last_api_request_time = current_time
        
        return data_list
    else:
        return None

@app.route('/')
def fetch_and_display_data():
    api_data = get_api_data()
    
    if api_data:
        return jsonify(api_data)
    else:
        return 'Failed to fetch data from the API'

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify
import requests
import csv
from io import StringIO
import yaml

app = Flask(__name__)

def get_api_data():
    with open("keys.yml", 'r') as f:
        data = yaml.safe_load(f)
        api_key = data.get('apiKey')
    api_url = f'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{api_key}/VIIRS_SNPP_NRT/world/1/2023-10-07'
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
        
        return data_list
    else:
        return None

@app.route('/')
def fetch_and_display_data():
    api_data = get_api_data()
    
    if api_data is not None:
        return jsonify(api_data)
    else:
        return 'Failed to fetch data from the API'

if __name__ == '__main__':
    app.run(debug=True)

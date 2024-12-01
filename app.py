from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('daily_market.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS market_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT,
        quantity INTEGER,
        date TEXT
    )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.json
    item_name = data.get('item_name')
    quantity = data.get('quantity')
    if item_name and quantity:
        date_of_day = datetime.now().strftime('%Y-%m-%d')
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO market_data (item_name, quantity, date)
        VALUES (?, ?, ?)
        ''', (item_name, quantity, date_of_day))
        conn.commit()
        conn.close()
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid data"}), 400
@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/api/top_products') 
def top_products(): 
    conn = get_db_connection() 
    cursor = conn.cursor() 
    cursor.execute(''' SELECT item_name, SUM(quantity) as total_quantity 
                   FROM market_data 
                   GROUP BY item_name 
                   ORDER BY total_quantity DESC 
                   LIMIT 6 ''') 
    top_products = cursor.fetchall() 
    conn.close() 
    return jsonify([dict(row) for row in top_products])

@app.route('/api/sales_over_time') 
def sales_over_time(): 
    conn = get_db_connection() 
    cursor = conn.cursor() 
    cursor.execute(''' SELECT date, SUM(quantity) as total_quantity 
                   FROM market_data 
                   WHERE date >= DATE('now', '-30 day') 
                   GROUP BY date ''') 
    sales_over_time = cursor.fetchall() 
    conn.close() 
    return jsonify([dict(row) for row in sales_over_time])


if __name__ == '__main__':
    init_db()
    app.run(debug=True)

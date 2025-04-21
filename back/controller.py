import sys
from flask import jsonify, abort
import requests
from bs4 import BeautifulSoup
import pymysql
from dbutils.pooled_db import PooledDB
from config import DB_HOST, DB_USER, DB_PASSWD, DB_NAME

# Database connection pool
pool = PooledDB(creator=pymysql,
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASSWD,
                database=DB_NAME,
                maxconnections=1,
                blocking=True)

def get_wet_tmd():
    """
    Get all wet_tmd data from the database.
    """
    sql = "SELECT * FROM wet_tmd"
    conn = pool.connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        if not result:
            abort(404, "No data found")
        return jsonify(result)
    except pymysql.MySQLError as e:
        abort(500, str(e))
    finally:
        cursor.close()
        conn.close()

def get_wet_tmd_by_date(date):
    """
    Get wet_tmd data for a specific date.
    """
    sql = "SELECT * FROM wet_tmd WHERE DATE(timestamp) = %s"
    conn = pool.connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute(sql, (date,))
        result = cursor.fetchall()
        if not result:
            abort(404, "No data found for the specified date")
        return jsonify(result)
    except pymysql.MySQLError as e:
        abort(500, str(e))
    finally:
        cursor.close()
        conn.close()

def get_wet_kb():
    """
    Get all wet_kb data from the database.
    """
    sql = "SELECT * FROM wet_kb"
    conn = pool.connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        if not result:
            abort(404, "No data found")
        return jsonify(result)
    except pymysql.MySQLError as e:
        abort(500, str(e))
    finally:
        cursor.close()
        conn.close()

def get_wet_kb_by_date(date):
    """
    Get wet_kb data for a specific date.
    """
    sql = "SELECT * FROM wet_kb WHERE DATE(timestamp) = %s"
    conn = pool.connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute(sql, (date,))
        result = cursor.fetchall()
        if not result:
            abort(404, "No data found for the specified date")
        return jsonify(result)
    except pymysql.MySQLError as e:
        abort(500, str(e))
    finally:
        cursor.close()
        conn.close()

def get_weather_from_openweathermap():
    api_key="8e687982a456bd66850cbf71d2d16f3a"
    lat=13.736
    lon=100.52
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        return {
            "location": "Bangkok, Thailand",
            "temperature": f"{data['main']['temp'] - 273.15:.2f}°C",
            "feels_like": f"{data['main']['feels_like'] - 273.15:.2f}°C",
            "humidity": f"{data['main']['humidity']}%",
            "wind_speed": f"{data['wind']['speed']} m/s",
            "condition": data["weather"][0]["description"]
        }
    else:
        return {"error": data.get("message", "Failed to fetch weather.")}
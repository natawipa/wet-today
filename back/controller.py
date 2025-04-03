import sys
from flask import jsonify, abort
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

def get_wet_today():
    """
    Get all wet_today data from the database.
    """
    sql = "SELECT * FROM wet_today"
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

def get_wet_today_by_date(date):
    """
    Get wet_today data for a specific date.
    """
    sql = "SELECT * FROM wet_today WHERE DATE(timestamp) = %s"
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
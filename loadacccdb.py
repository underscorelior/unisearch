import pyodbc

conn = pyodbc.connect(
    r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\Users\Lior\Documents\UniSearch\IPEDS202324.accdb"
)
cursor = conn.cursor()
cursor.execute("select * from ADM2023")

for row in cursor.fetchall():
    print(row)

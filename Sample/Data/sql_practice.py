import csv, sqlite3

# connect to sqlite database
con = sqlite3.connect("chicago.sqlite")
cur = con.cursor()

# create new table called Bus
cur.execute("DROP TABLE IF EXISTS bus;")
cur.execute("CREATE TABLE bus (stop_id Int, on_street String, cross_street String, routes Text, boardings Float, alightings Float, month_beginning Date, daytype String, lat Float, long Float);")

# Open csv data file
with open('chicago.csv','rb') as fin: 
    
    dr = csv.DictReader(fin)
    to_db = []
    for i in dr:
    	# extract latitude and longitude data
   		lat = eval(i['location'])[0]
   		lon = eval(i['location'])[1]
   		routeList = i['routes'].split(',')
   		for route in routeList:
   			# insert data from csv file into to_db list
	   		cur_data = (i['stop_id'], i['on_street'], i['cross_street'], route, i['boardings'], i['alightings'], i['month_beginning'], i['daytype'], lat, lon)
   			to_db.append(cur_data)

# put items in to_db into a sqlite database
cur.executemany("INSERT INTO bus (stop_id, on_street, cross_street, routes, boardings, alightings, month_beginning, daytype, lat, long) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", to_db)
con.commit()

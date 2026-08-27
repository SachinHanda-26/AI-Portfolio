import os
import sys
from pymongo import MongoClient

# Use the URI from server/.env
uri = "mongodb+srv://namastenode:kkILFLumVCrLXa6M@namastenode.cwwzssp.mongodb.net/?appName=NamasteNode"

client = MongoClient(uri)
dbs = client.list_database_names()
print("Databases:", dbs)

for db_name in dbs:
    if db_name in ['admin', 'local', 'config']: continue
    db = client.get_database(db_name)
    print(f"\nCollections in {db_name}:", db.list_collection_names())
    for coll_name in db.list_collection_names():
        coll = db.get_collection(coll_name)
        count = coll.count_documents({})
        print(f"  {coll_name}: {count} documents")
        
        # Check for search indexes (if possible) or just list normal indexes
        try:
            indexes = list(coll.list_search_indexes())
            print(f"  {coll_name} search indexes:", [i.get('name') for i in indexes])
        except Exception as e:
            # Atlas vector search might not support list_search_indexes from free tier pymongo or without privileges, but we can try
            pass

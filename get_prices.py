import time
from pymongo import MongoClient
from pycoingecko import CoinGeckoAPI
import json
import certifi
import pprint

ca = certifi.where()
#####    Coin Gecko API ####
cg = CoinGeckoAPI()


### Connection to Catalin Mongo ######

client_cata = MongoClient("mongodb+srv://m001-student:m001-student@sandbox.vmxtn.mongodb.net/Sandbox?retryWrites=true&w=majority", tlsCAFile=ca)
cata_db = client_cata["coingecko"]
#cata_dbs = client_cata.list_databases()
collection = cata_db["first_page_collection"]    #["coingeckoCollection"]

#mongodb+srv://m001-student:m001-student@sandbox.vmxtn.mongodb.net/Sandbox?retryWrites=true&w=majority






#collection.delete_many({})

#coins = ['bitcoin', 'litecoin', 'ethereum','polygon','xrp','solana','dodgecoin','chainlink','cardano','decentraland']


# coins = ['bitcoin', 'litecoin', 'ethereum', 'polygon', 'xrp', 'solana', 'dodgecoin', 'chainlink', 'cardano',
#              'decentraland']
currencies = ["usd", "eur"]
coins = cg.get_coins_list()
coins2 = json.dumps(coins)
coins3 = json.loads(coins2.replace('id','_id'))

for coin in coins:
    id = coin["id"]
    prices = cg.get_price(ids=id, vs_currencies=currencies ,include_market_cap=True, include_24hr_vol=True, include_24hr_change=True, include_last_updated_at=True)

#pprint.pprint(prices)
    collection.insert_one(prices)
    #pprint.pprint(prices)
    time.sleep(1.2)



#extract_prices_for_each(cg)
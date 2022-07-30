import time

import requests.exceptions
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
collection = cata_db["first_page_collection"]    #["coingeckoCollection"]






#To delete everything from the collection
#collection.delete_many({})

#coins = ['bitcoin', 'litecoin', 'ethereum','polygon','xrp','solana','dodgecoin','chainlink','cardano','decentraland']

#Top 10 coins from the internet
# coins = ['bitcoin', 'litecoin', 'ethereum', 'polygon', 'xrp', 'solana', 'dodgecoin', 'chainlink', 'cardano',
#              'decentraland']

currencies = ["usd", "eur"]
coins = cg.get_coins_list()
coins2 = json.dumps(coins)
coins3 = json.loads(coins2.replace('id','_id'))




for coin in coins3:
    id = coin["_id"]
    prices = cg.get_price(ids=id, vs_currencies=currencies ,include_market_cap=True, include_24hr_vol=True, include_24hr_change=True, include_last_updated_at=True)

    #Exception handling for shitty coins who doesn't have the vars below
    try:
        price_in_euro=prices[id]["eur"]
        eur_24h_change = prices[id]["eur_24h_change"]
        eur_24h_vol = prices[id]["eur_24h_vol"]
        eur_market_cap = prices[id]["eur_market_cap"]
        last_updated_at = prices[id]["last_updated_at"]
        price_in_usd = prices[id]["usd"]
        usd_24h_change = prices[id]["usd_24h_change"]
        usd_24h_vol = prices[id]["usd_24h_vol"]
        usd_market_cap = prices[id]["usd_market_cap"]
    except KeyError :
        pass
    except requests.exceptions.HTTPError:
        time.sleep(10)
    else:
        collection.insert_one({"_id":id,
                               "price_in_euro":price_in_euro,
                               "eur_24h_change": eur_24h_change,
                               "eur_24h_vol": eur_24h_vol,
                               "eur_market_cap": eur_market_cap,
                               "last_updated_at":last_updated_at,
                               "price_in_usd": price_in_usd,
                               "usd_24h_change":usd_24h_change,
                               "usd_24h_vol": usd_24h_vol,
                               "usd_market_cap":usd_market_cap})

        #pprint.pprint(prices)
    time.sleep(1.2)

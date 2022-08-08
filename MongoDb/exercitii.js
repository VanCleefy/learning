db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                    { "src_airport": "KZN" }
                                  ] },
                          { "$or" :[ { "airplane": "CR2" },
                                     { "airplane": "A81" } ] }
                         ]}).pretty()




db.inventory.find( {"$or":[{"founded_year":2004, $or: [{ "category_code": "social" },{ "category_code": "web"}] },

                          {"founded_month": 10 , $or: [{ "category_code": "social" },{ "category_code": "web"}] }]}).count()




#Run this to make sure the photos json is valid for use

import json
from os.path import exists

json_data = open("photos.json")
photo_data = json.load(json_data)

goodSoFar = True
listOfRats = [  "zippy",
                "ultrarat",
                "esche",
                "podolico",
                "celery",
                "simmsammo",
                "seansean",
                "shibby",
                "klaus",
                "eggs",
                "barronhotlands",
                "boyboymysterio",
                "moom",
                "martine",
                "sharpie",
                "sminny",
                "lepix",
                "empire",
                "moderna",
                "fizzywig",
                "pederson"]

 
for element in photo_data:
    photoFilename = element
    containedRats = photo_data[photoFilename]['rats'].split(",")
    pathToFile = "../public/img/Photos/" + photoFilename
    fileExists = exists(pathToFile)
    if fileExists == False:
        print("Filename Error")
        print("Expected Name:"  + element)
        print( exists(pathToFile))
        break
    for rat in containedRats:
        if rat not in listOfRats:
            print("file " + element + " has an issue with rat name :" + rat )
            print("Make sure the sheet you exported from has no spaces! ie: 'sminny,ultrarat' will work but 'sminny, ultrarat' will not")

print("Check Done") 



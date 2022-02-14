import json


json_data = open("responses-preformatted.json")
rat_data = json.load(json_data);


formatted_data = {}

for element in rat_data:
    # print(type(element))
    # print(element)
    # print(element['Name'])
    current_rat_name = element['Name']
    if(current_rat_name in formatted_data.keys()):
        b = 8
    else:
        formatted_data[current_rat_name] = {}

    responses = []
    
    for key_value_pair in element:
        # print(str(key_value_pair) + " " + str(element[key_value_pair]))
        if (key_value_pair!="Name" and key_value_pair!="index"):
            responses.append( {"response": key_value_pair, "reaction": element[key_value_pair] } )


    #add the data so we gotta parse it nice
    index = element['index']

    formatted_data[current_rat_name][index] = responses


    # print("-_-_-_-_--_-___--_--__---_____--__-----------_-__-_-_-_-_-_----------")
    # print(formatted_data)

with open('newnewnewnnnew.json', 'w') as f:
    json.dump(formatted_data, f)

    # obj = open('newnewnew.json', 'wb')
    # obj.write(str(formatted_data))
    # obj.close
    #the value of each index per rat is a list of dictionaries

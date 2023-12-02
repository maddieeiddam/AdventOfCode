data = open('input.txt', 'r').read()

class Santa:
    houses = set()
    x = 0
    y = 0

class RoboSanta:
    houses = set()
    x = 0
    y = 0

def navigate(obj, dir):
    if dir == '>':   obj.x += 1
    elif dir == '<': obj.x -= 1
    elif dir == '^': obj.y += 1
    elif dir == 'v': obj.y -= 1
    obj.houses.add(tuple([obj.x, obj.y]))
    return obj

for i, dir in enumerate(data):
    if i % 2 == 0:
        RoboSanta = navigate(RoboSanta, dir)
    else:
        Santa = navigate(Santa, dir)

print(len(Santa.houses.union(RoboSanta.houses)))


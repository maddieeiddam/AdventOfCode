data = open('input.txt', 'r').read().split('\n')

def part_1(data):
    nice = 0
    for str in data:
        naughty = False
        prohibited = ['ab', 'cd', 'pq', 'xy']
        for pair in prohibited:
            if pair in str: naughty = True
        if naughty == True: continue

        double = False
        for i in range(len(str) - 1):
            if not double and (str[i] == str[i + 1]):
                double = True
        count = len([char for char in str if char in "aeiou"])

        if count >= 3 and double: nice += 1

    print('part 1:', nice)

part_1(data)

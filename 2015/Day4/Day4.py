import hashlib

input = 'yzbqklnj'

for n in range (1, 1000000000):
    key = input + str(n)
    hash = hashlib.md5(key.encode('utf-8'))
    if hash.hexdigest()[0:5] == '00000':
        if hash.hexdigest()[0:6] == '000000':
            print('part 2 solution:', n)
            break

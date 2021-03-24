import collections
import re

if __name__ == "__main__":
    with open('/home/moloko/prod/notes/test2/log.log', 'r', encoding='utf-8') as file:
        data = ''.join(file.readlines())
    
    res = re.findall(r"\b(\w{5})\b", data)
    
    print({value: res.count(value) for value in set(res)})
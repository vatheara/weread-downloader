#!/usr/bin/env python
# -*- coding: utf-8 -*- 

import urllib2
import requests

def dowload(title, url):
    #url = "https://weread-oss.weread.asia/Audio/២-ដំណោះស្រាយ.mp3"
    #url = "https://weread-oss.weread.asia/Video/២-ដំណោះស្រាយ.m4v"
    #file_name = url.split('/')[-1]
    print(url)
    file_name = title
    u = urllib2.urlopen(url)
    f = open(file_name, 'wb')
    meta = u.info()
    file_size = int(meta.getheaders("Content-Length")[0])
    print "Downloading: %s Bytes: %s" % (file_name, file_size)

    file_size_dl = 0
    block_sz = 8192
    while True:
        buffer = u.read(block_sz)
        if not buffer:
            break

        file_size_dl += len(buffer)
        f.write(buffer)
        status = r"%.2f MB  [%3.2f%%]" % (file_size_dl* 9.537 * pow(10,-7), file_size_dl * 100. / file_size)
        status = status + chr(8)*(len(status)+1)
        print status,

    f.close()




req = requests.get("https://api.weread.asia/webapi/Course?id=2")
data = req.json()
print('['+data['model']['title']+']')
id = 1
urlapi = 'https://weread-oss.weread.asia/'
for i in data['list']:
    dowload(str(id) +'.' + i['title'],urlapi + urllib2.quote(i['audioUrl']))
    dowload(str(id) +'.' + i['title'],urlapi + urllib2.quote(i['videoUrl']))
    id+=1

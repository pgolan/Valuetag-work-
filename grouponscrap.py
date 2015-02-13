import xml.etree.cElementTree as xml
from bs4 import BeautifulSoup
import urllib2
import urllib
import re

def buildXML(ttl,prc,lats,lngs,durls):
	for i in range(0,(len(ttl)-1)):
		try:
			deal=xml.SubElement(db,"deal")
			title=xml.SubElement(deal,"title")
			price=xml.SubElement(deal,"price")
			lat=xml.SubElement(deal,"lat")
			lng=xml.SubElement(deal,"lng")
			durl=xml.SubElement(deal,"durl")
			title.text=ttl[i]
			price.text=prc[i]
			lat.text=lats[i]
			lng.text=lngs[i]
			durl.text=durls[i]
			tree = xml.ElementTree(db)
			tree.write("database.xml")
		except UnicodeDecodeError:
			continue
	


db=xml.Element("database")
url= "https://partner-api.groupon.com/deals.xml?tsToken=DE_AFF_0_200012_200175_0&lat=28.0&lng=77.0&offset=0&limit=1"
latLst=[]
lngLst=[]
priceLst=[]
durlLst=[]
titleLst=[]

for i in range(0,2500):
	print 'Link ',str(i),'being scanned.........'	

	request = urllib2.Request(url)
	request.add_header('UserAgent', 'Ruel.ME Sample Scraper')
	htmlFile = urllib2.urlopen(request)
	data = htmlFile.read()
	soup=BeautifulSoup(data)
	x=soup.division
	y=soup.buyurl       
	z=soup.price
	w=soup.title


	lat=re.findall('<lat>(.+?)</lat>',str(x))
	lat=lat[0]
	lng=re.findall('<lng>(.+?)</lng>',str(x))
	lng=lng[0]
	lng=lng[1:]
	price=re.findall('<amount>(.+?)</amount>',str(z))
	price=price[0]
	durl=re.findall('<buyurl>(.+?)</buyurl>',str(y))
	durl=durl[0]
	title=re.findall('<announcementTitle>(.+?)</announcementTitle>',data)
	title=title[0]
	latLst.append(lat)
	lngLst.append(lng)
	priceLst.append(price)
	durlLst.append(durl)
	titleLst.append(title)

	url="https://partner-api.groupon.com/deals.xml?tsToken=DE_AFF_0_200012_200175_0&lat=28.0&lng=77.0&offset="+str(i+1)+"&limit=1"


	print url
	print 'Link ',str(i),'Complete.................'

buildXML(titleLst,priceLst,latLst,lngLst,durlLst)

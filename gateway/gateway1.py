import serial.tools.list_ports
import random
import time
import sys
from Adafruit_IO import MQTTClient

AIO_FEED_IDS = [
    "group-9.light-switch",
    "group-9.fan-speed",
    "group-9.distance",
    "group-9.pir",
    "group-9.temp",
    "group-9.humid",
]


AIO_USERNAME = "dadnhk231nhom9"
AIO_KEY = "aio_lfox71xTDDwyGl1tHLQXwcoO4pyW"


def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)


def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload)
    # if isMicrobitConnected:
    #     ser.write((str(payload) + "#").encode())


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB-SERIAL" in strPort:
            splitPort = strPort.split(" ")
            commPort = splitPort[0]
    return commPort


isMicrobitConnected = False
if getPort() != "None":
    ser = serial.Serial(port=getPort(), baudrate=115200)
    isMicrobitConnected = True
    print("Microbit connected")

absentCount = 0


def processData(data):
    global absentCount
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[1] == "HUMI":
            print("Publishing Humidity")
            client.publish("group-9.humid", splitData[2])
        elif splitData[1] == "TEMP":
            print("Publishing Temperature")
            client.publish("group-9.temp", splitData[2])
        elif splitData[1] == "PIR":
            if splitData[2] != "0":
                print(float(splitData[2]))
                client.publish("group-9.distance", splitData[2])
                client.publish("group-9.pir", "CO NGUOI")
                print("Publishing Distance")
                absentCount = 0
                # if float(splitData[2]) <= 50:
                #     client.publish("group-9.light-switch", 1)
                # else:
                #     client.publish("group-9.light-switch", 0)
            else:
                if absentCount == 3:
                    client.publish("group-9.pir", "KHONG CO")
                elif absentCount < 3:
                    absentCount = absentCount + 1
    except:
        pass


mess = ""


def readSerial():
    bytesToRead = ser.inWaiting()
    if bytesToRead > 0:
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        print(mess)
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start : end + 1])
            if end == len(mess):
                mess = ""
            else:
                mess = mess[end + 1 :]


while True:
    if isMicrobitConnected:
        readSerial()

    time.sleep(1)

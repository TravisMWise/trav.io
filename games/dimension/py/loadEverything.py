from asyncore import write
import os

path = 'D:/tempMentalHealthGame/images/enemies'
os.chdir(path)

writeFile = open("loaderEverything.txt", "a")
content = ""


for i, enemy in enumerate(os.listdir()):
    if(os.path.isdir(path + "/" + enemy)):
        os.chdir(path + "/" + enemy)
    else:
        continue

    readFile = open("loader2.txt", "r")
    content += readFile.read() + '\n'
    readFile.close()
    os.chdir(path)

writeFile.write(content)
writeFile.close()
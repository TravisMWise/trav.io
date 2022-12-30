import os

path = 'enemies'
mainDir = 'D:/tempMentalHealthGame/images/' + path
os.chdir(mainDir)

for j, enemy in enumerate(os.listdir()):
    if(os.path.isdir(mainDir + "/" + enemy)):
        os.chdir(mainDir + "/" + enemy)
    else:
        continue

    writeFile = open("loader2.txt", "a")

    for j, variant in enumerate(os.listdir()):
        if(os.path.isdir(mainDir + "/" + enemy + "/" + variant)):
            os.chdir(mainDir + "/" + enemy + "/" + variant)
        else:
            continue

        variableName = 'this.' + enemy + variant.capitalize()
        readFile = open("width.txt", "r")
        width = readFile.read()
        readFile.close()

        name = '['


        for i, images in enumerate(os.listdir()):
            if (images.endswith(".png")):
                name += '"' + images.split(".")[0] + '", ' 
        name = name[:-2]
        name += ']'

        writeFile.write('{} = this.loader.loadAnimation(p, "{}", {}, {});\n'.format(variableName, path + "/" + enemy + "/" + variant, name, width))
        os.chdir(mainDir + "/" + enemy)
    writeFile.close()
    os.chdir(mainDir)

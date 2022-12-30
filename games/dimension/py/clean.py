import os
import shutil

path = 'C:/SD game/tempMentalHealthGame/images/enemies'
os.chdir(path)

for p, enemy in enumerate(os.listdir()):
    if(os.path.isdir(path + "/" + enemy)):
        os.chdir(path + "/" + enemy)
    else:
        continue
    for k, variant in enumerate(os.listdir()):
        if(os.path.isdir(path + "/" + enemy + "/" + variant)):
            os.chdir(path + "/" + enemy + "/" + variant)
        else:
            continue
        for i, frame in enumerate(os.listdir()):
                if(os.path.isdir(path + "/" + enemy + "/" + variant  + "/" + frame)):
                    # print(path + "/" + enemy + "/" + variant  + "/" + frame)
                    shutil.rmtree(path + "/" + enemy + "/" + variant  + "/" + frame)
                else:
                    continue
        os.chdir(path + "/" + enemy)
    os.chdir(path)
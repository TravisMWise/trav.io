import os
import cv2

path = 'D:/tempMentalHealthGame/images/enemies'
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

        hasWritten = False
        writeFile = open("width.txt", "a")

        for j, AnimationDir in enumerate(os.listdir()):
            if(os.path.isdir(path + "/" + enemy + "/" + variant + "/" + AnimationDir)):
                os.chdir(path + "/" + enemy + "/" + variant + "/" + AnimationDir)
            else:
                continue
            
            for i, frame in enumerate(os.listdir()):
                if i == 0:
                    imgs = cv2.imread(path + "/" + enemy + "/" + variant + "/" + AnimationDir + "/" + frame, cv2.IMREAD_UNCHANGED)
                    if(not hasWritten):
                        hasWritten = True
                        writeFile.write("{}".format(imgs.shape[1]))
                        writeFile.close()
                else:
                    image = cv2.imread(path + "/" + enemy + "/" + variant + "/" + AnimationDir + "/" + frame, cv2.IMREAD_UNCHANGED)
                    imgs = cv2.hconcat([imgs, image])
            os.chdir(path + "/" + enemy + "/" + variant)
            cv2.imwrite(AnimationDir + ".png", imgs)
        os.chdir(path + "/" + enemy)
    os.chdir(path)
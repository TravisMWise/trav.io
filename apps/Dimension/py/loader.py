import os
# D:\code\MHG\images\effects\virus_bomb

# D:\code\MHG\images\effects\virus_bomb\explode\virus_bomb_explode_01.png
# D:/code/MHG/images/effects/virus_bomb/explode/virus_bomb_explode_01.png
# 'D:/code/MHG/images/effects/smoke_effects/vapor_wave'
variableName = 'this.vaporWave'
path = 'effects/smoke_effects/vapor_wave'
mainDir = 'D:/code/MHG/images/' + path
os.chdir(mainDir)

writeFile = open("loader.txt", "a")

for i, f_id in enumerate(os.listdir()):
    if (f_id.endswith(".txt")):
      continue
    # print(f_id)
    varName = f_id.split("_")
    for i, e in enumerate(varName):
      varName[i] = e.capitalize()
    # writeFile.write('this.loader.loadSet(p, {}{}, "{}/{}", "__{}_{}_"'.format(variableName, ''.join(varName), path, f_id, f_id, path.split('/')[1]))
    writeFile.write('this.loader.loadSet(p, {}{}, "{}/{}", "__{}_"'.format(variableName, ''.join(varName), path, f_id, f_id))
    names = []
    count = []
    os.chdir('{}\{}'.format(mainDir, f_id))
    for j, f_subfolder in enumerate(os.listdir()):
        # print(f_subfolder)
        names.append(f_subfolder)
        os.chdir('{}\{}\{}'.format(mainDir, f_id, f_subfolder))
        count.append(len(os.listdir()))
    writeFile.write(', {}, {}, 0);\n'.format(names, count))
writeFile.close()
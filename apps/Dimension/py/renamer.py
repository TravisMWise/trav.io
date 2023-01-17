import os
# D:\code\MHG\images\effects\smoke_effects\vapor_wave
mainDir = 'D:/code/MHG/images/effects/smoke_effects/vapor_wave'
os.chdir(mainDir)

for i, f_id in enumerate(os.listdir()):
    if (f_id.endswith(".png")):
        continue
    print(f_id)
    # str = f_id.split("_")    
    # print(str)
    # print(str[:5] + str[6:])
    # new = str[:5] + str[6:]
    # str[1] = '_brown'
    # new_name = ('_').join(new)
    # print(new_name)
    # os.rename(f_id, new_name)
    os.chdir('{}\{}'.format(mainDir, f_id))
    for i, f_file in enumerate(os.listdir()):
        i = str(i).zfill(3)
        new_name = '__{}_{}_{}.png'.format("vapor_wave",f_id, i)
        print(new_name)
        # print('Rename {} to {} in folder {}'.format(f_file, new_name, f_id))
        os.rename(f_file, new_name)

        # str = f_file.split("_")
        # str[2] = 'purple'
        # new_name = ('_').join(str)
        # print(new_name)
        # os.rename(f_file, new_name)
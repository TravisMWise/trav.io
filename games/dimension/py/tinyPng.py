# import tinify
# import requests
# # from lxml import html
# page = requests.get("http://www.google.com:80", proxies={"http": "http://111.233.225.166:1234"})
# # API_KEY = 'pd9qSm3K79qWQqFQGMKJZY5MVpCQVxg3'
# # tinify.key = API_KEY
# # tinify.proxy = "http://user:pass@192.168.0.1:8080"
# source = tinify.from_file('D:/code/CV/bobby.jpg')
# source.to_file("out.jpg")

import os
import tinify

def compress_image(image_source, output_file_path):
    try:
        image_file_name = os.path.basename(image_source)
        
        if image_source.startswith('https'):
            source = tinify.from_url(image_source)
        else:
            source = tinify.from_file(image_source)
        print('{0} compressed successfully'.format(image_file_name))        
    except tinify.errors.AccountError:
        print('Invalid API Key')
        return False
    except tinify.errors.ConnectionError:
        print('Please check your internet connection')
        return False
    except tinify.errors.ClientError:
        print('File tpye is not supported')
        return False
    else:
        # export compressed image file
        source.to_file(output_file_path)
        print('File exported to {0}'.format(output_file_path))
        return True

API_KEY = 'TFBts4m5dpkmm6wGljyCS6FzHrGqt8Gq'
tinify.key = API_KEY

# One full enemy
def compress_images(path_funct):
    os.chdir(path_funct)
    for k, variant in enumerate(os.listdir()):
        if(os.path.isdir(path_funct + "/" + variant)):
            os.chdir(path_funct + "/" + variant)
        else:
            continue

        for j, AnimationDir in enumerate(os.listdir()):
            if(AnimationDir.endswith(".png")):
                compress_image(AnimationDir, os.path.join(path_funct + "/" + variant, AnimationDir))
            else:
                continue
            
            os.chdir(path_funct + "/" + variant)
        os.chdir(path_funct)
    os.chdir(path_funct)



compress_images("D:/tempMentalHealthGame/images/enemies/skeletonWarrior")
compress_images("D:/tempMentalHealthGame/images/enemies/snail")
compress_images("D:/tempMentalHealthGame/images/enemies/spider")
compress_images("D:/tempMentalHealthGame/images/enemies/virusMoster")
compress_images("D:/tempMentalHealthGame/images/enemies/wolf")


# for j, AnimationDir in enumerate(os.listdir()):
#     if(AnimationDir.endswith(".png")):
#         compress_image(AnimationDir, os.path.join(path, AnimationDir))
#         # print(os.path.join(path, AnimationDir.split(".")[0] + "_compressed.png"))
#         count += 1
#     else:
#         continue


# Enemies Folder
# for p, enemy in enumerate(os.listdir()):
#     if(os.path.isdir(path + "/" + enemy)):
#         os.chdir(path + "/" + enemy)
#     else:
#         continue
#     for k, variant in enumerate(os.listdir()):
#         if(os.path.isdir(path + "/" + enemy + "/" + variant)):
#             os.chdir(path + "/" + enemy + "/" + variant)
#         else:
#             continue

        
#         for j, AnimationDir in enumerate(os.listdir()):
#             if(AnimationDir.endswith(".png")):
#                 print(AnimationDir)
#                 count += 1
#             else:
#                 continue
            
#             os.chdir(path + "/" + enemy + "/" + variant)
#         os.chdir(path + "/" + enemy)
#     os.chdir(path)
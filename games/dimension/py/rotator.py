import cv2
import os

mainDir = 'D:/code/MHG/py_venv/py/projectile'
os.chdir(mainDir)

for i, f_id in enumerate(os.listdir()):
  if (f_id.endswith(".png")): 
    continue
  print(f_id)
  os.chdir('{}\{}'.format(mainDir, f_id))
  for i, f_file in enumerate(os.listdir()):
    print(f_file)
    img = cv2.imread(mainDir + '/' + f_id + '/' + f_file, cv2.IMREAD_UNCHANGED)
    # img = cv2.resize(img, (0,0), fx=0.15, fy=0.15)
    img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)

    new_name = '{}'.format(f_file)
    cv2.imwrite(new_name, img)

    cv2.imshow('Image', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()



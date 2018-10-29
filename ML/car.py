from keras.models import load_model
import urllib.request
import os
import numpy as np
import validators



cwd = os.getcwd()

model = load_model('final1.h5')
result = input("Upload image")
#result = 'https://upload.wikimedia.org/wikipedia/commons/4/46/Car_Accident.jpg'
if(validators.url(result)==True):
    name = os.path.basename(result)
    full_name = cwd + name
    path = full_name
#url = 'https://upload.wikimedia.org/wikipedia/commons/4/46/Car_Accident.jpg'
#urllib.request.urlretrieve(url,full_name)
#path = '/home/mandeep/Desktop/Auto Insurance/z.jpg'

from keras.preprocessing import image
image_path = path
test_image=image.load_img(image_path, target_size = (64,64))
test_image=image.img_to_array(test_image)
test_image= np.expand_dims(test_image, axis=0)
result = model.predict(test_image)

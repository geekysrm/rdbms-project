from keras.models import load_model
import urllib.request
import os
import numpy as np

cwd = os.getcwd()

model = load_model('final1.h5')

#############
#url = 'https://upload.wikimedia.org/wikipedia/commons/4/46/Car_Accident.jpg'
url = input("Upload image")

urllib.request.urlretrieve(url, cwd + "/" + os.path.basename(url))
path = cwd + "/" + os.path.basename(url)
#############


from keras.preprocessing import image
image_path = path
test_image=image.load_img(image_path, target_size = (64,64))
test_image=image.img_to_array(test_image)
test_image= np.expand_dims(test_image, axis=0)
result = model.predict(test_image)

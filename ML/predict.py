from keras.models import load_model
import os
import numpy as np
import validators


cwd = os.getcwd()

model = load_model('model.h5')

from keras.preprocessing import image

imageFileName = input()

imagePath = "../ER-diagram-and-schema/" + imageFileName + ".jpg"

print imagePath

test_image=image.load_img(imagePath, target_size = (64,64))
test_image=image.img_to_array(test_image)
test_image= np.expand_dims(test_image, axis=0)
result = model.predict(test_image)

print result

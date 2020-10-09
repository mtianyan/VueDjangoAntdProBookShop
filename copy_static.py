import os
import shutil
import glob

for one in glob.glob('./templates/TyAdmin/*'):
    if one != './templates/TyAdmin/index.html':
        if os.path.isdir(one):
            for file_one in glob.glob(f'{one}/*'):
                print(file_one)
                to_file_one = file_one.replace('/templates/TyAdmin', '/static/TyAdmin')
                print(to_file_one)
                to_one_dir = os.path.dirname(to_file_one)
                if not os.path.exists(to_one_dir):
                    os.mkdir(to_one_dir)
                shutil.move(file_one, to_file_one)
        else:
            print(one)
            to_one = one.replace('/templates/TyAdmin', '/static/TyAdmin')
            print(to_one)
            to_one_dir = os.path.dirname(to_one)
            if not os.path.exists(to_one_dir):
                os.mkdir(to_one_dir)
            shutil.move(one, to_one)
#

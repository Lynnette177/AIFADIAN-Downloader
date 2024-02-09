import os
import requests
from urllib.parse import urlparse
title = ""
pic_index = 1


def save_image_from_url(url):
    try:
        save_path = f'pic\\{title}\\'
        response = requests.get(url)
        response.raise_for_status()  # 检查请求是否成功

        # 从URL中提取文件名
        filename =f'{title}_{pic_index}' + '.' + urlparse(url).path.split(".")[-1]

        # 保存图片到本地文件
        with open(save_path + filename, 'wb') as file:
            file.write(response.content)

        print(f"图片保存成功: {save_path + filename}")
    except requests.exceptions.RequestException as e:
        print(f"发生错误: {e}")


def check_and_create_directory(directory_name):
    # 获取当前工作目录
    current_directory = os.getcwd()
    # 拼接目录路径
    target_directory = os.path.join(current_directory, directory_name)
    # 检查目录是否存在
    if not os.path.exists(target_directory):
        # 如果目录不存在，创建目录
        os.makedirs(target_directory)
        print(f"目录 '{directory_name}' 不存在，已创建。")
    else:
        print(f"目录 '{directory_name}' 已存在。")


with open('myfile.txt', 'r', encoding='utf-8') as file:
    for line in file:
        if line.lower().startswith("http"):
            print(f"正在下载：{title} 第{pic_index}张")
            save_image_from_url(line.strip())
            pic_index = pic_index + 1
        else:
            title = line.strip()
            title = title.replace('*', '')
            title = title.replace(' ','')
            pic_index = 1
            print(f"\n开始下载{title}：\n")
            check_and_create_directory(f"pic\\{title}")
# 爱发电自动下载脚本
用法：在油猴添加这个JS脚本，python脚本备用。
油猴这个脚本比较简单，转到你想要下载的 作品集 这个很重要。左上角会显示按钮，一个是下载所有图片，另一个是单个动态单个保存。只会把图片的url保存到txt中，格式是一行一个，不同的动态就有标题行。完成之后，txt找个文件夹放下，再把
python脚本，放到和txt同一个目录，运行python脚本，就会自动打开txt把图片保存到对应标题的文件夹了。

# 注意
问题：这个脚本最多只能下载 9张图片 如果超出9张 页面显示 数字+表示多出多少张图片 则不会被保存。因为原理是从image组件里面找网址。爱发电这个确实就是cdn里图片的地址了。

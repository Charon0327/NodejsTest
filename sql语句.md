# 常用SQL语句
## 1.插入语句
```
INSERT INTO 表名 (列1, ...) VALUES (值1, ...)
-- 例如：
INSERT INTO `Articles` (`title`, `content`) VALUES ('行路难·其一', '长风破浪会有时，直挂云帆济沧海。');

```
批量插入 
```
-- 多行插入
INSERT INTO 表名 (列1, ...) VALUES (值1, ...),(值1, ...)...;
INSERT INTO `Articles` (`title`, `content`) VALUES ('将进酒', '天生我材必有用，千金散尽还复来。'), ('宣州谢朓楼饯别校书叔云', '抽刀断水水更流，举杯消愁愁更愁。'), ('梦游天姥吟留别', '安能摧眉折腰事权贵，使我不得开心颜！'), ('春夜宴从弟桃花园序', '天地者，万物之逆旅也；光阴者，百代之过客也。'), ('宣州谢朓楼饯别校书叔云', '弃我去者，昨日之日不可留；乱我心者，今日之日多烦忧。'), ('庐山谣寄卢侍御虚舟', '我本楚狂人，凤歌笑孔丘。手持绿玉杖，朝别黄鹤楼。'), ('行路难', '长风破浪会有时，直挂云帆济沧海'), ('将进酒', '人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。'), ('望庐山瀑布', '飞流直下三千尺，疑是银河落九天。'), ('访戴天山道士不遇', '树深时见鹿，溪午不闻钟。'), ('清平调', '云想衣裳花想容，春风拂槛露华浓。'), ('春夜洛城闻笛', '谁家玉笛暗飞声，散入春风满洛城。');
```
## 2.修改语句
```
UPDATE 表名 SET 列1=值1, 列2=值2, ... WHERE 条件

-- 例如：
UPDATE `Articles` SET `title`='黄鹤楼送孟浩然之广陵', `content`='故人西辞黄鹤楼，烟花三月下扬州。' WHERE `id`=2
```
## 3.删除语句
```
DELETE FROM 表名 WHERE 条件

-- 例如：
DELETE FROM `ARTICLES` WHERE `id`=5;
```
## 4.查询语句
```
SELECT * FROM 表名;

-- 例如：
SELECT * FROM `Articles`;

```
这里的*表示所有的字段，如果你不需要那么多东西，我们也可以修改成

```SELECT `id`, `title` FROM `Articles`;```
这样就只查id和title，而没有content了。
## 5.添加条件
```
SELECT * FROM 表名 WHERE 条件;

-- 例如：
SELECT * FROM `Articles` WHERE `id`=2;

-- 或者，想查询id大于2的文章:
SELECT * FROM `Articles` WHERE `id`>2;
```
## 6.排序
我们还可以对数据进行排序，排序就两个关键词，大家务必要记住，ASC和DESC。ASC是正序，DESC是降序
```
-- 查询id大于2的文章，按 id 从大到小排序，即降序
SELECT * FROM `Articles` WHERE `id`>2 ORDER BY `id` DESC;

-- 查询id大于2的文章，按 id 从小到大排列，即升序
SELECT * FROM `Articles` WHERE `id`>2 ORDER BY `id` ASC;
```

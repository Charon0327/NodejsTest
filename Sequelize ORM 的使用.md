# Sequelize ORM
日常开发中很少使用SQL语句，因为有更简单的方式操作数据库。也就是使用ORM来操作数据库。
## Sequelize ORM的使用安装
安装sequelize的命令行工具，需要全局安装，这样更方便使用
```
npm i -g sequelize-cli
```
接着确保命令行是在当前项目的命令行里，还要安装当前项目所依赖的sequelize包和对数据库支持依赖的mysql2
```
npm i sequelize mysql2
```
最后初始化项目
```
sequelize init
```
初始化项目后会创建一个config配置文件和三个目录。

| 文件或目录 | 说明 |
| ----      | ---|
| config/config.json | 数据库连接配置 |
| migrations | 迁移文件 |
| models | 模型文件 |
| seeders | 种子文件 |
## 模型、迁移、种子
### 模型
我们可以使用sequelize来创建数据表，而不用手动建表。

新建模型
```
sequelize model:generate --name Article --attributes title:string,content:text
```
打开models/article.js。可以看到，在模型文件夹中，出现了一个叫做Article的模型，它里面有标题和内容。

标题是字符串类型，对应到 MySQL 数据库里，它就会自动变成varchar。内容部分，则是text类型。

现在就只需要知道，模型就是用来操作数据库的，就是因为有这个文件的存在，我们后面才能使用Article.findAll()这种代码来查询数据

### 迁移文件
运行迁移命令
```
sequelize db:migrate
```
打开数据库客户端，刷新一下，可以看到Articles表出现了。

另外一张表SequelizeMeta是我们运行迁移命令时，自动生成的。这张表里记录了当前已经跑过了哪些迁移，这样当你再次运行sequelize db:migrate时，已经运行过的迁移文件，就不会重复再次执行了。
### 种子文件
开发过程中需要测试数据，而一条条的插入需要很长时间。我们就可以使用种子文件。
```
sequelize seed:generate --name actile
```
完成后，在seeders目录可以看到命令新建的种子文件。分为两个部分，up部分用于填充数据，down部分用于删除数据。
up部分，默认生成的代码里，给了我们一个案例。很明显，它这里是往People表里，插入了一点儿数据。我们可以参考它的写法，改为往Articles表里插入数据。
```
async up (queryInterface, Sequelize) {
  const articles = [];
  const counts = 100;

  for (let i = 1; i <= counts; i++) {
    const article = {
      title: `文章的标题 ${i}`,
      content: `文章的内容 ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    articles.push(article);
  }

  await queryInterface.bulkInsert('Articles', articles, {});
},
```
至于down部分，也参考它的格式，修改一下
```
await queryInterface.bulkDelete('Articles', null, {})
``` 
#### 运行种子
运行修改好的种子文件，刷新数据库。
```
sequelize db:seed --seed xxx-article
```
### 总结
日常开发过程中，都是采用固定的步骤

| 步骤 | 命令  | 说明 |
| ----  | --- | ---|
| 第一步 | sequelize model:generate --name Acticle --attributes... | 建模型和迁移文件 |
| 第二步 | 人工处理 | 根据需求调整迁移文件 |
| 第三步 | sequelize db:migrate | 运行迁移文件，生成数据表 |
| 第四步 | sequelize seed:generate --name actile | 新建种子文件 |
| 第五步 | 人工处理 | 将种子文件修改为自己想填充的数据 |
| 第六步 | sequelize db:seed --seed xxx-acticle | 运行种子文件，将数据插入到数据表中 |



回滚迁移
```
sequelize db:migrate:undo
```
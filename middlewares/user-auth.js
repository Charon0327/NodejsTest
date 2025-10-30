const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UnauthorizedError } = require('../utils/errors');
const { success, failure } = require('../utils/responses');

module.exports = async (req, res, next) => {
    try {
        // 判断 Token 是否存在
        const { token } = req.headers;
        console.log(token, 11)
        if (!token) {
            throw new UnauthorizedError('当前接口需要认证才能访问。')
        }

        // 验证token是否正确
        const decoded = jwt.verify(token, process.env.SECRET)
        // 从jwt中解析出之前存入的userId
        const { userId } = decoded


        // 如果通过，将user对象挂载在req上，方便后续中间件或者路由使用
        req.userId = userId

        // 一定 要加next，才能继续进入到后续的中间件或者路由使用
        next()
    } catch (error) {
        failure(res, error);
    }
};

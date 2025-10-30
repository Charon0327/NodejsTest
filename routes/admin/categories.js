const express = require('express')
const router = express.Router();
const { Op } = require('sequelize')

const { Category, Course } = require('../../models')
const { NotFoundError } = require('../../utils/errors');
const { success, failure } = require('../../utils/responses');

/**
 * 查询分类列表
 * GET admin/categories
 */
router.get("/", async function (req, res, next) {
    try {
        const query = req.query
        // 当前是第几页
        const currentPage = Math.abs(Number(query.currentPage)) || 1
        // 每页显示多少条数据
        const pageSize = Math.abs(Number(query.pageSize)) || 10
        const offset = (currentPage - 1) * pageSize
        const condition = {
            include: [
                {
                    model: Course,
                    as: 'courses',
                },
            ],
            order: [["id", "DESC"]],
            limit: pageSize,
            offset
        }
        if (query.name) {
            // 模糊查询 
            condition.where = {
                name: {
                    [Op.like]: `%${query.name}%`
                }
            }
        }
        const { count, rows } = await Category.findAndCountAll(condition)
        success(res, "查询成功", {
            categories: rows,
            pagination: {
                total: count,
                currentPage,
                pageSize

            }
        })
    } catch (error) {
        failure(res, error)
    }
})

/**
 * 查询分类详情
 * GET admin/categories/:id
 */
router.get("/:id", async function (req, res, next) {
    try {
        const category = await getCategory(req)
        success(res, "查询成功", category)
    } catch (error) {
        failure(res, error)
    }
})
/**
 * 创建分类
 * POST admin/categories
 */
router.post("/", async function (req, res, next) {
    try {
        // 白名单过滤
        const body = filterBody(req)
        const category = await Category.create(body)
        success(res, "创建成功", category, 201)
    } catch (error) {
        failure(res, error)
    }
})

/**
 * 更新分类
 * PUT admin/categories/:id
 */
router.put("/:id", async function (req, res) {
    try {
        const category = await getCategory(req)
        // 白名单过滤
        const body = filterBody(req)
        await category.update(body)
        success(res, "更新分类成功", category)
    } catch (error) {
        failure(res, error)
    }
})

/**
 * 删除分类
 * DELETE admin/categories/:id
 */
router.delete("/:id", async function (req, res) {
    try {
        const category = await getCategory(req)
        const count = await Course.count({ where: { categoryId: req.params.id } });
        if (count > 0) {
            throw new Error('当前分类有课程，无法删除。');
        }

        await category.destroy()
        success(res, "删除成功")
    } catch (error) {
        failure(res, error)
    }
})

/**
 * 公共方法：查询当前分类
 */
async function getCategory(req) {
    const { id } = req.params;
    const condition = {
        include: [
            {
                model: Course,
                as: 'courses',
            },
        ]
    }

    const category = await Category.findByPk(id, condition);
    if (!category) {
        throw new NotFoundError(`ID: ${id}的分类未找到。`)
    }

    return category;
}


/**
 * 公共方法： 白名单过滤
 * @param req
 * @returns {name, rank}
 */

function filterBody(req) {
    return {
        name: req.body.name,
        rank: req.body.rank
    }
}
module.exports = router
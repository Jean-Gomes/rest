import { Router } from 'express';
import { createCategoryService } from '../../services/category.service';
import { Resource, ResourceCollection } from '../../http/resources';
import cors from "cors";
import { defaultCorsOptions } from "../../http/cors";

const router = Router();

const corsCollection = cors({
  ...defaultCorsOptions,
  methods: ["GET", "POST"],
});

const corsItem = cors({
  ...defaultCorsOptions,
  methods: ["GET", "PATCH", "DELETE"],
});

router.post('/', corsCollection, async (req, res, next) => {
    const categoryService = await createCategoryService();
    const { name, slug } = req.body;
    const category = await categoryService.createCategory({ name, slug });
    const resource = new Resource(category)
    next(resource)
});

router.get('/:categoryId',  corsCollection,async (req, res) => {
    const categoryService = await createCategoryService();
    const category = await categoryService.getCategoryById(+req.params.categoryId);
    const resource = new Resource(category)
    res.json(resource);
});

router.patch('/:categoryId',  corsCollection,async (req, res) => {
    const categoryService = await createCategoryService();
    const { id, name, slug } = req.body;
    const category = await categoryService.updateCategory({ id: +req.params.categoryId, name, slug });
    const resource = new Resource(category)
    res.json(resource);
});

router.delete('/:categoryId', corsCollection, async (req, res) => {
    const categoryService = await createCategoryService();
    const { categoryId } = req.params;
    await categoryService.deleteCategory(+categoryId);
    res.status(204).send();
});

router.get('/', corsCollection, async (req, res, next) => {
    const categoryService = await createCategoryService();
    const { page = 1, limit = 10, name } = req.query;
    const { categories, total } = await categoryService.listCategories({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        filter: { name: name as string }
    });
if (
    !req.headers["accept"] ||
    req.headers["accept"] === "*/*" ||
    req.headers["accept"] === "application/json"
  ){
    const collection = new ResourceCollection(categories, {
        paginationData: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
        },
    });
    next(collection);
    }
});

router.options("/", corsCollection);
router.options("/:productId", corsItem);

export default router;
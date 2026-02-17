import { Router } from "express";
import { createProductService } from "../../services/product.service";
import { Resource, ResourceCollection } from "../../http/resources";
import { title } from "process";

const router = Router();

router.post("/", async (req, res, next) => {
  const productService = await createProductService();
  const { name, slug, description, price, categoryIds } = req.body;
  const product = await productService.createProduct(
    name,
    slug,
    description,
    price,
    categoryIds
  );
  const resource = new Resource(product)
  next(resource)
});

router.get("/:productId", async (req, res) => {
  const productService = await createProductService();
  const product = await productService.getProductById(
    +req.params.productId
  );

  if(!product){
    return res.status(404).json({
      title: 'Not found',
      status: 404,
      detail: `Product with id ${req.params.productId} not found`
    })
  }

  const resource = new Resource(product)
  res.json(resource);
});

router.patch("/:productId", async (req, res) => {
  const productService = await createProductService();
  const { id, name, slug, description, price, categoryIds } = req.body;
  const product = await productService.updateProduct({
    id: +req.params.productId,
    name,
    slug,
    description,
    price,
    categoryIds,
  });
  const resource = new Resource(product)
  res.json(resource);
});

router.delete("/:productId", async (req, res) => {
  const productService = await createProductService();
  const { id } = req.body;
  await productService.deleteProduct(parseInt(id));
  res.status(204).send();
});

router.get("/", async (req, res, next) => {
  const productService = await createProductService();
  const {
    page = 1,
    limit = 10,
    name,
    categories_slug: categoriesSlugStr,
  } = req.query;
  const categories_slug = categoriesSlugStr
    ? categoriesSlugStr.toString().split(",")
    : [];
  const { products, total } = await productService.listProducts({
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    filter: {
      name: name as string,
      categories_slug,
    },
  });

  if(!req.headers['accept'] || req.headers['accept'] === 'application/json'){
    const collection = new ResourceCollection(products, {
      paginationData: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      },
    });
  return next(collection);
  }

  if(req.headers['accept'] === 'text/csv'){
    const csv = products
    .map((product) => {
      return `${product.name},${product.slug},${product.description},${product.price}`;
    })
    .join("\n");
    res.set("Contet-Type","text/csv")
    return res.send(csv);
  }

});

export default router;

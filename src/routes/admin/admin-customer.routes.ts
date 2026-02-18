import { Router } from 'express';
import { createCustomerService } from '../../services/customer.service';
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
    const customerService = await createCustomerService();
    const { name, email, password, phone, address } = req.body;
    const customer = await customerService.registerCustomer({name, email, password, phone, address});
    const resource = new Resource(customer)
    next(resource)
});

router.get('/:customerId', corsCollection, async (req, res) => {
    const customerService = await createCustomerService();
    const customer = await customerService.getCustomer(+req.params.customerId);
    res.send(customer ? new Resource(customer) : {message: 'Customer not found'});
});

router.patch('/:customerId', corsCollection, async (req, res) => {
    const customerService = await createCustomerService();
    const { customerId } = req.params;
    const { phone, address, password } = req.body;
    const customer = await customerService.updateCustomer({phone, address, customerId : parseInt(customerId), password});
    const resource = new Resource(customer)
    res.json(resource);
});

router.delete('/:customerId', corsCollection, async (req, res) => {
    const customerService = await createCustomerService();
    const { customerId } = req.params;
    await customerService.deleteCustomer(parseInt(customerId));
    res.status(204).send();
});

router.get('/', corsCollection, async (req, res, next) => {
    const customerService = await createCustomerService();
    const { page = 1, limit = 10 } = req.query;
    const { customers, total } = await customerService.listCustomers({
        page: parseInt(page as string),
        limit: parseInt(limit as string)
    });

  const collection = new ResourceCollection(customers, {
      paginationData: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      },
    });
  next(collection);

router.options("/", corsCollection);
router.options("/:customerId", corsItem);

});

export default router;
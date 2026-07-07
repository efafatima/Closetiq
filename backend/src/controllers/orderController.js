import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const query = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.params.id, userId: req.userId };
    const order = await Order.findOne(query);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const requiredFields = ['fullName', 'phone', 'street', 'city', 'state', 'zipCode', 'country'];
    const missingField = requiredFields.find((field) => !shippingAddress?.[field]);

    if (missingField) {
      return res.status(400).json({ message: `${missingField} is required` });
    }

    const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
    const cartItems = (cart?.items || []).filter((item) => item.productId);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cartItems.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      image: item.productId.images?.[0],
      quantity: item.quantity,
      size: item.size,
      price: item.productId.salePrice || item.productId.price,
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      userId: req.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'COD',
      orderStatus: 'Pending',
    });

    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Only admins can update orders' });
    }

    const allowedUpdates = ['orderStatus', 'paymentStatus', 'trackingNumber'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
    );

    const order = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Only admins can delete orders' });
    }

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

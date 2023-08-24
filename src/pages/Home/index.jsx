import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import AppNavbar from "../../components/Navbar";
import CategoryFilter from "../../components/CategoryFilter";
import ToastMessage from "../../components/Toast";
import { BASE_URL_API } from "../../utils/constant";

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const categories = ["kaos", "baju", "ukuran-s", "ukuran-m"];

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  };

  const handleIncrementItem = (itemToIncrement) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemToIncrement.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleDecrementItem = (itemToDecrement) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemToDecrement.id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleCheckout = () => {
    setShowToast(true);
    setCartItems([]);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL_API);
      const products = response.data.aaData;
      let filtered = products.filter((product) => {
        const title = product.name.toLowerCase();
        const hasKeyword =
          product.keywords.length > 0
            ? product.keywords.some((keyword) =>
                keyword.text.toLowerCase().includes(searchKeyword.toLowerCase())
              )
            : false;

        return title.includes(searchQuery.toLowerCase()) || hasKeyword;
      });
      if (selectedCategory) {
        filtered = filtered.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.text.toLowerCase() === selectedCategory.toLowerCase()
          )
        );
      }
      setFilteredProducts(filtered);
      console.log("cart", cartItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedCategory, searchKeyword]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSearchKeyword("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <AppNavbar onSearch={handleSearch} cartItems={cartItems} />
      <Container className="mt-3">
        <Row>
          <Col md={12}>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryFilter}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={3} className="order-lg-1">
            <Cart
              cartItems={cartItems}
              onCheckout={handleCheckout}
              onRemoveItem={handleRemoveItem}
              onIncrementItem={handleIncrementItem}
              onDecrementItem={handleDecrementItem}
            />
          </Col>
          <Col md={12} lg={9} className="mb-3 ">
            {loading ? (
              <Col className="text-center">
                <Spinner animation="border" role="status"></Spinner>
                <h5 className="sr-only">Loading...</h5>
              </Col>
            ) : filteredProducts.length === 0 ? (
              <Col className="text-center">
                <p>Product not found.</p>
              </Col>
            ) : (
              <Row>
                {filteredProducts.map((product) => (
                  <Col key={product.id} xs={12} md={6} lg={4}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message="Checkout completed!"
        delay={3000}
      />
    </>
  );
};

export default Home;

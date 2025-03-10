import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DetailProduk = () => {
  let { id } = useParams();
  const [detailProduk, setDetailProduk] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  const datauser = JSON.parse(storedUser);

  const [datapost, setDataPost] = useState({
    userId: 0,
    productId: 0,
    quantity: 0,
  });

  // PUT Cartd ID
  const updateQuantity = async (productId, newQuantity, cartId) => {
    console.log("Product ID added: " + productId);
    console.log("Quantity added: " + newQuantity);
    console.log("Cart ID: " + cartId);

    try {
      const response = await axios.put(`http://localhost:3003/cart/${cartId}`, {
        userId: datauser.id,
        productId: productId,
        quantity: newQuantity, // Tidak perlu menjumlahkan ulang di sini
      });

      console.log("Update successful: ", JSON.stringify(response.data));
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3003/products/` + id);
        setDetailProduk(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataProduct();
  }, [id]);

  useEffect(() => {
    if (datapost.userId !== 0 && datapost.productId !== 0 && datapost.quantity !== 0) {
      const fetchUpdateQuantity = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3003/cart?userId=${datauser.id}`);

          let found = false;

          if (Array.isArray(data)) {
            data.forEach((item) => {
              if (item.productId === datapost.productId) {
                console.log("GET by cartId:", JSON.stringify(item));
                updateQuantity(item.productId, item.quantity + datapost.quantity, item.id);
                found = true;
              }
            });
          } else {
            console.log("Data yang diterima bukan array:", data);
          }

          if (!found) {
            postDataCart();
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUpdateQuantity();
    }
  }, [datapost]);

  const postDataCart = async () => {
    try {
      const response = await axios.post("http://localhost:3003/cart", datapost);
      console.log("Data berhasil dikirim:", response.data);
    } catch (error) {
      console.log("Error mengirim data:", error);
    }
  };

  const addToCart = () => {
    if (detailProduk) {
      const newItem = {
        id: detailProduk.id,
        name: detailProduk.name,
        price: detailProduk.price,
        image: detailProduk.image,
        quantity: quantity,
      };

      const existingItem = cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        setCart(cart.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item)));
      } else {
        setCart([...cart, newItem]);
      }

      setDataPost({
        userId: datauser.id,
        productId: detailProduk.id,
        quantity: quantity,
      });

      setQuantity(1);
    }
  };

  const increaseQuantity = () => {
    if (detailProduk && quantity < detailProduk.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
        <div style={styles.container}>
          {detailProduk && (
            <>
              <div style={styles.imageBox}>
                <img
                  src={detailProduk.image}
                  alt={detailProduk.name}
                  style={styles.productImage}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x400";
                  }}
                />
              </div>
              <div style={styles.detailBox}>
                <h2 className="text-h2-bold">Detail Produk</h2>
                <p>
                  <strong>Nama Produk:</strong> {detailProduk.name}
                </p>
                <p>
                  <strong>Harga:</strong> Rp {detailProduk.price}
                </p>
                <p>
                  <strong>Kategori:</strong> {detailProduk.categoryId}
                </p>
                <p>
                  <strong>Deskripsi:</strong> {detailProduk.description}
                </p>
                <p>
                  <strong>Stok:</strong>
                  <span style={{ color: detailProduk.stock > 0 ? "#28a745" : "#dc3545" }}>{detailProduk.stock > 0 ? ` Tersedia (${detailProduk.stock})` : " Stok Habis"}</span>
                </p>

                <div>
                  {detailProduk.stock > 0 && isAuthenticated && (
                    <div style={styles.quantityControl}>
                      <button onClick={decreaseQuantity} class="btn btn-primary bg-dark" type="submit" style={{ marginRight: "20px" }}>
                        -
                      </button>

                      <span style={{ ...styles.quantityText, marginRight: "20px" }}>{quantity}</span>

                      <button onClick={increaseQuantity} class="btn btn-primary bg-dark" type="submit">
                        +
                      </button>
                    </div>
                  )}
                  {detailProduk.stock > 0 && isAuthenticated && (
                    <button class="btn btn-primary" type="submit" style={{ ...styles.button, marginTop: "20px" }} onClick={addToCart}>
                      🛒 Tambah ke Keranjang
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "20px",
    padding: "20px",
  },
  imageBox: {
    flex: "1",
    maxWidth: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  detailBox: {
    flex: "2",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default DetailProduk;

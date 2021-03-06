import React, { useState } from "react";
import { BarcodeScanner } from "components/BarcodeScanner";
import { fetchProduct } from "reducers/product";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import barcode from "assets/barcode.jpg";
import "components/scanBarcode.css";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ScanBarcode = () => {
  const [showScanner, setShowScanner] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {!showScanner && (
        <section className="scanner-container">
          <h1 className="scanner-title">
            Are you on a diet and counting calories?
          </h1>
          <Button type="button" onClick={() => setShowScanner(true)}>
            <img src={barcode} alt="barcode" className="barcode-icon" />
          </Button>
          <p className="scanner-text">
            Find out your product's calorie amount by clicking <br /> on the
            button and scanning your barcode!
          </p>
        </section>
      )}

      {showScanner && (
        <BarcodeScanner
          className="scanner"
          onDetected={code => {
            console.log("Got barcode", code);
            setShowScanner(false);
            dispatch(fetchProduct(code));
          }}
        />
      )}
    </>
  );
};

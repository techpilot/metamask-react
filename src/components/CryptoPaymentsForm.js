import React, { useState } from "react";
import { ethers } from "ethers";

const DEFAULT_ADDRESS = "0x913963c69AaEF47e482B64dB937e01B2d35f007f";

export const CHAIN_IDS = {
  BINANCE: {
    NAME: "Binance",
    CURRENCY_CODE: "BNB",
    MAIN_NET: {
      NAME: "mainnet",
      ID: 56,
    },
    TEST_NET: {
      NAME: "testnet",
      ID: 97,
    },
  },
  ETHEREUM: {
    NAME: "Ethereum",
    CURRENCY_CODE: "ETH",
    MAIN_NET: {
      NAME: "mainnet",
      ID: 1,
    },
    ROPSTEN: {
      NAME: "ropsten",
      ID: 3,
    },
  },
};

const CryptoPaymentsForm = ({ currency, isTestNet }) => {
  const [amount, setAmount] = useState(0);
  const [destinationAddress, setDestinationAddress] = useState(DEFAULT_ADDRESS);
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState(null);

  // networkName and blockNumber are used to display the transaction details
  let networkName;
  let blockExplorerHost = "etherscan.io";

  if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
    blockExplorerHost = "bscscan.com";
  }

  if (isTestNet) {
    networkName =
      currency === CHAIN_IDS.BINANCE.CURRENCY_CODE
        ? CHAIN_IDS.BINANCE.TEST_NET.NAME
        : CHAIN_IDS.ETHEREUM.ROPSTEN.NAME;
    // eslint-disable-next-line no-unused-vars
    blockExplorerHost = `${networkName}.${blockExplorerHost}`;
  } else {
    networkName = "mainnet";
  }

  let transactionUrl = "";

  if (transaction?.hash) {
    transactionUrl = `https://${blockExplorerHost}/tx/${transaction.hash}`;
  }

  const startPayment = async (event) => {
    setError("");
    setTransaction(null);

    event.preventDefault();

    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      await window.ethereum.send("eth_requestAccounts");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      const { isCorrectNetwork, message } = checkCorrectNetwork(network);

      if (!isCorrectNetwork) {
        throw new Error(message);
      }

      const signer = provider.getSigner();

      ethers.utils.getAddress(destinationAddress);

      const transactionResponse = await signer.sendTransaction({
        to: destinationAddress,

        value: ethers.utils.parseEther(amount.toString()),
      });

      transactionResponse.network = network;

      console.log({ transactionResponse });
      setTransaction(transactionResponse);
    } catch (error) {
      console.log({ error });
      setError(error.message);
    }
  };

  const checkCorrectNetwork = (network) => {
    let expectedChainId;

    if (currency === CHAIN_IDS.ETHEREUM.CURRENCY_CODE) {
      if (isTestNet) {
        expectedChainId = CHAIN_IDS.ETHEREUM.ROPSTEN.ID;
      } else {
        expectedChainId = CHAIN_IDS.ETHEREUM.MAIN_NET.ID;
      }
    } else if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
      if (isTestNet) {
        expectedChainId = CHAIN_IDS.BINANCE.TEST_NET.ID;
      } else {
        expectedChainId = CHAIN_IDS.BINANCE.MAIN_NET.ID;
      }
    }

    if (network.chainId !== expectedChainId) {
      const actualNetworkName = [
        CHAIN_IDS.BINANCE.TEST_NET.ID,
        CHAIN_IDS.ETHEREUM.ROPSTEN.ID,
      ].includes(network.chainId)
        ? "testnet"
        : "mainnet";
      const actualCurrency = [
        CHAIN_IDS.BINANCE.MAIN_NET.ID,
        CHAIN_IDS.BINANCE.TEST_NET.ID,
      ].includes(network.chainId)
        ? CHAIN_IDS.BINANCE.CURRENCY_CODE
        : CHAIN_IDS.ETHEREUM.CURRENCY_CODE;
      return {
        isCorrectNetwork: false,
        message: `Change your crypto wallet network. Expected "${
          isTestNet ? "testnet" : "mainnet"
        }" network (${networkName}) for currency: ${currency}.
        Instead received "${actualNetworkName}" network (${
          network.name
        }) for currency: ${actualCurrency}.`,
      };
    }
    return { isCorrectNetwork: true, message: "" };
  };

  return (
    <div className="m-5 p-5 card shadow text-center">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(Number.parseFloat(event.target.value))}
        className="col-12 form-control mb-3"
      />

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">{`${currency} ${networkName}`}</span>
        </div>
        <input
          placeholder="Destination address"
          value={destinationAddress}
          onChange={(event) => setDestinationAddress(event.target.value)}
          className="col-12 form-control"
        />
      </div>

      <button className="col-12 btn btn-primary" onClick={startPayment}>
        Send Payment
      </button>

      {transaction && (
        <div className="alert alert-success mt-3" role="alert">
          Payment Complete:{" "}
          <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
            View transaction
          </a>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default CryptoPaymentsForm;

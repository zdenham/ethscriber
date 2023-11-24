'use client';

import { useSendTransaction, useWaitForTransaction, useAccount } from 'wagmi';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { EthscriptionsAPI } from '../utils/ethscriptionsAPI';
import { identify, track } from '../utils/analytics';

export function Ethscribe() {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction();
  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const account = useAccount();

  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState('data:,');
  const [hex, setHex] = useState('646174613a2c');

  const onCheckAvailability = useCallback(async () => {
    const api = new EthscriptionsAPI();
    const { ownerAddress, isTaken } = await api.checkAvailability(encodedText);

    track('checked_availability', { text });

    console.log('check availability', ownerAddress, isTaken);
    const message = isTaken
      ? `"${text}" text ethscription is already owned by ${ownerAddress}`
      : `"${text}" ethscription is available! Ethscribe it below`;
    alert(message);
  }, [encodedText, text]);

  const onEthscribe = useCallback(async () => {
    if (!account || !account.isConnected || !account.address) {
      alert(
        'You must connect your wallet to ethscribe, or copy the hex and send the transaction manually'
      );
      return;
    }

    track('ethscribed', { text });

    sendTransaction({
      to: account.address,
      data: `0x${hex}`,
    });
  }, [hex, account, sendTransaction, text]);

  const onCopyHex = useCallback(() => {
    navigator.clipboard.writeText(hex);

    track('copied_hex', { text });

    // delay so dom stays focused
    setTimeout(() => {
      alert(`Copied hex to clipboard: ${hex}`);
    }, 250);
  }, [hex, text]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
    setEncodedText(`data:,${text}`);
    setHex(Buffer.from(`data:,${text}`).toString('hex'));
  }, []);

  useEffect(() => {
    if (!account?.address) return;

    identify(account.address);
  }, [account.address]);

  return (
    <div className="ethscribe-container">
      <input
        autoFocus
        className="ethscribe-input"
        name="text"
        placeholder="Text to ethscribe"
        onChange={handleChange}
        value={text}
      />
      <div className="ethscribe-encoded-text">{encodedText}</div>
      <div className="ethscribe-hex">{hex}</div>
      <button
        className="ethscribe-button"
        type="button"
        onClick={onCheckAvailability}
      >
        CHECK AVAILABILITY
      </button>
      <button className="ethscribe-button" type="button" onClick={onCopyHex}>
        COPY HEX
      </button>
      <button className="ethscribe-button" type="button" onClick={onEthscribe}>
        ETHSCRIBE
      </button>

      {isLoading && <div className="ethscribe-message">Check wallet...</div>}
      {isPending && (
        <div className="ethscribe-message">Transaction pending...</div>
      )}
      {isSuccess && (
        <>
          <div className="ethscribe-message">
            Success!{' '}
            <a href={`https://etherscan.io/tx/${data?.hash}`}>View Txn</a>{' '}
            <a href={`https://ethscriptions.com/${account?.address}`}>
              View your Ethscriptions
            </a>
          </div>
        </>
      )}
      {isError && (
        <div className="ethscribe-message">Error: {error?.message}</div>
      )}
      <style jsx>{`
        .ethscribe-container {
          display: flex;
          flex-direction: column;
          font-family: monospace;
          width: 475px;
          max-width: 85vw;
        }

        .ethscribe-input,
        .ethscribe-encoded-text,
        .ethscribe-hex {
          font-size: 16px;
          font-family: monospace;
          margin-bottom: 10px;
          background-color: #f7f7f7;
          padding: 10px;
          border-radius: 4px;
          border: none;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .ethscribe-button {
          background-color: #4285f4;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 10px;
          font-family: monospace;
        }

        .ethscribe-message {
          margin-top: 20px;
          width: 100%;
          text-align: center;
        }

        .ethscribe-message.success {
          color: green;
        }

        .ethscribe-message.error {
          color: red;
        }
      `}</style>
    </div>
  );
}

# Phase 0 results

## Carbonmark REST — succeeded

- Host used: `https://v19.api.carbonmark.com` (`v1.api.carbonmark.com` TLS cert expired May 2024)
- Marketplace listings had `liquidSupply: 0`; used `assetPriceType=klimaprotocol`
- GET `/orders?quote_uuid=` returns an **array**
- Status path: SUBMITTED → COMMITTED → COMPLETED (~2s)
- tx: `0x6693fd3aa6610c4ce86ce3e8b1f245e4c0f0d91885e06aa18a43d00bbd92ae8b`
- certificate: https://app.carbonmark.com/retirements/id/8453-0x6693fd3aa6610c4ce86ce3e8b1f245e4c0f0d91885e06aa18a43d00bbd92ae8b-0

## Avalanche Fuji C-Chain

Contract compiled. Deploy needs test AVAX.

Recorder: `0x629506bc91402Ed6675ab5456c7B24BD2bDdD588`

Faucet: https://core.app/tools/testnet-faucet/?subnet=c&network=fuji

Then: `npm run deploy:fuji` and set `CERTIFICATE_RECEIPT_ADDRESS`.

## Klima x402

Discover on `v1.x402.klimalabs.com` works (carbon classes + liquidity). Full gasless `actions/retire` needs `KLIMA_PRIVATE_KEY` and Base Sepolia USDC — not completed. Carbonmark rail already retired via Klima protocol inventory on Base (`8453`).
